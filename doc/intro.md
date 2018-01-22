# 指引

> 使用一个组件或模块之前，应当知道它能解决的问题是什么，不能解决的问题是什么。使用的最佳实践是什么？

> 接口设计和实现思路

常规动画主要需要以下参数

```
1. duration 时间
2. value 距离
```

> 精确控制时间和距离的动画

```js
var motion = new Motion({
    duration: 1000,
    value: 360,
    onAction: function onAction (mount) { console.log(mount) }
})
motion.run()
// 匀速运行时则速度是 0.36
// 先快再慢的速度是先大于 0.36  然后小于 0.36
```

加/减速度动画需要以下参数

```markdown
1. value 距离
2. startSpeed 起始速度
3. endSpeed 结束速度
```


> 精确控制速度和距离的动画

```js
// 加速
var motion = new Motion({
    value: 180,
    startSpeed: 0,
    endSpeed: 0.1,
    onAction: function onAction (mount) { console.log(mount) }
})
motion.run()
// 减速
var motion = new Motion({
    value: 180,
    startSpeed: 0.1,
    endSpeed: 0,
    onAction: function onAction (mount) { console.log(mount) }
})
motion.run()
```


这两种动画的区别在于：常规动画可配置 `duration`。加/减速度动画不可配置 `duration` ，只能通过 `startSpeed` `endSpeed` 计算出 `duration`

一般我们用的是常规动画。某些情况下会用到加/减速度动画，比如转盘抽奖。

转盘抽奖分为三部分

```markdown
1. 加速旋转
2. 匀速运动旋转 （AJAX 获取抽奖结果）
3. 减速旋转
```

持续匀速旋转需要用到

```js

var motion = new MotionLogic({
    value: Number.MAX_SAFE_INTEGER,
    // 每毫秒运动 0.36
    startSpeed: 0.1,
    endSpeed: 0.1,
    onAction: function onAction (mount) { console.log(mount) }
})
motion.run()
```


---

```js
{
    duration: 1000,
    value: 360
}
```

`motion` 会根据 `duration` `value` 自动计算出速度，`1000/360 = 2.7` 每毫秒运动 `2.7`
