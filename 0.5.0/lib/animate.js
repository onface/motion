import MoitionLogic from "./index"
import extend from "extend"
import { getAnimateSettings } from "./getDefaultSettings"
export default function aniamte (settings) {
    settings = extend(true, getAnimateSettings(), settings)
    let valueArray = Object.keys(settings.value)
    let outout = {
        run: function () {
            const self = this
            valueArray.forEach(function (valueKey) {
                self[valueKey].run()
            })
            return self
        }
    }
    var emitAction = function (key, mount) {
        var mountData = {}
        valueArray.forEach(function (valueKey) {
            mountData[valueKey] = 0
        })
        mountData[key] = mount
        settings.onAction(mountData)
    }
    valueArray.forEach(function (valueKey) {
        if (valueKey === 'run') {
            throw new Error('node_module/motion: animate({value})  value not allow has `"run"`')
        }
        let cloneSettings = extend(true, {}, settings)
        let target = cloneSettings.value[valueKey]

        switch(typeof target) {
            case 'number':
                cloneSettings.value = target
            break
            case 'object':
                extend(true, cloneSettings, target)
            break
            default:
                throw new Error('node_module/motion: animate({value}) value must be a number or object')
        }
        cloneSettings.onAction = function (mount) {
            emitAction(valueKey, mount)
        }
        outout[valueKey] = new MoitionLogic(cloneSettings)
    })
    if (settings.run) {
        outout.run()
    }
    return outout
}
