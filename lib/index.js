import extend from "extend"
import getDefaultSettings from "./getDefaultSettings"
import easingMap from "./easing"
import animate from "./animate"
import mount from "./mount"
class Motion {
    static animate = animate
    static easing = easingMap
    static mount = mount
    constructor(settings) {
        const self = this
        self.settings = extend(true, getDefaultSettings(), settings)
        self.isRuning = false
        // mountValue 记录运动过得距离，用于计算速度和矫正变化值
        self.mountValue = 0
        self.isAccAnimate = typeof self.settings.startSpeed !== 'undefined'
        if (self.isAccAnimate) {
            let averageSpeed = (self.settings.startSpeed + self.settings.endSpeed) / 2
            // 算出运动量
            if (typeof self.settings.duration !== 'undefined') {
                self.settings.$value = averageSpeed * self.settings.duration
            }
            else {
                // 算出运动总时间
                // 应该是 / 2 这里 改成 / 2.4 是因为发现只能运动 90% 的 value。
                // 每找出原因暂时改成 2.4，也可能永远都是 2.4
                self.settings.$duration = Math.abs(self.settings.value) / averageSpeed
            }
        }
        // self.effect
        // t: current time, b: begInnIng value, c: change In value, d: duration
        switch(typeof self.settings.effect) {
            case 'string':
                self.effect = easingMap[self.settings.effect]
                if (typeof self.effect === 'undefined') {
                    throw new Error('face-motion: settings.effect(' + self.settings.effect + ') not found!')
                }
            break
            case 'function':
                self.effect = self.settings.effect
            break
            default:
                throw new Error('face-motion: settings.effect must be a string or a function!')
        }
    }
}
Motion.prototype.emitChange = function (mount) {
    const self = this
    if (self.settings.value < 0) {
        mount = -mount
    }
    self.settings.onAction(mount)
}
Motion.prototype.run = function () {
    const self = this
    const settings = self.settings
    let value = settings.value
    if (value < 0) {
        value = -value
    }
    if (typeof self.lastRunTime === 'undefined') {
        self.lastRunTime = new Date().getTime()
    }
    if (typeof self.lastActionTime === 'undefined') {
        self.lastActionTime = new Date().getTime()
    }
    self.isRuning = true
    requestAnimationFrame(function action () {
        if (!self.isRuning) {
            return
        }
        let nowTime = new Date().getTime()
        let actionTime = nowTime - self.lastRunTime
        let elapsedTime = nowTime - self.lastActionTime
        let animateDuration = typeof settings.$duration === 'number' ? settings.$duration: settings.duration
        // 修复 elapsedTime actionTime 因为 requestAnimationFrame 不是精准控制时间
        if (actionTime > animateDuration) {
            elapsedTime = elapsedTime - (actionTime - animateDuration)
            actionTime = animateDuration
        }
        let mount

        if (self.isAccAnimate) {
            // 算出速度差，速度递增或递减的差值
            let speedDiff = settings.endSpeed - settings.startSpeed
            let progress = ( actionTime / animateDuration)
            let lastProgress = ( (actionTime - elapsedTime) / animateDuration)

            let nowSpeed = speedDiff * progress
            let lastActionSpeed = speedDiff * lastProgress

            let averageAcc = ( nowSpeed + lastActionSpeed) / 2
            let speed =  settings.startSpeed + averageAcc

            mount = elapsedTime * speed
        }
        else {
            let currentMount = self.effect.apply(
                easingMap,
                [
                    actionTime,
                    0,
                    value,
                    animateDuration
                ]
            )
            mount = currentMount - self.mountValue
        }
        if (settings.integer) {
            mount = Math.round(mount)
        }
        self.mountValue = self.mountValue + mount
        self.emitChange(mount)
        // 千万不要直接附值 lastActionTime = new Date().getTime()
        // 因为上面代码运行需要时间
        self.lastActionTime = nowTime
        if (actionTime === animateDuration) {
            settings.onDone()
        }
        else {
            if (self.isRuning) {
                requestAnimationFrame(action)
            }
        }
    })
}
Motion.prototype.stop = function () {
    const self = this
    self.isRuning = false
    self.settings.onStop()
}
module.exports = Motion
export default Motion
