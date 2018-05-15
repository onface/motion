import React , { Component } from "react"
import Motion from "face-motion"



class Basic extends Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {
            offset: 0
        }
    }
    render() {
        const self = this
        return (
            <div>
                (speed: {self.state.speed    })
                <div style={{
                    width: 100,
                    height: 100,
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: 100,
                        marginTop: 50,
                        height:0,
                        overflow: 'hidden',
                        borderTop: '1px solid blue',
                        borderLeft:' 10px solid red',
                        transform: 'rotate(' + self.state.offset % 360 + 'deg) translate3d(0,0,0)'
                    }} >
                    </div>
                </div>
                <hr/>
                <div
                    style={{
                        width:100,
                        height:100,
                        background: 'skyblue',
                        marginLeft: self.state.offset
                    }}
                ></div>
                <button
                    onClick={function () {
                        var motion = new Motion({
                            value: 180,
                            duration: 1000,
                            onAction: function (mount) {
                                var offset = self.state.offset
                                self.setState({
                                    offset: offset + mount
                                })
                            }
                        })
                    }}
                >
                    linear
                </button>
                <button
                    onClick={function () {
                        var motion = new Motion({
                            value: -180,
                            duration: 1000,
                            onAction: function (mount) {
                                var offset = self.state.offset
                                self.setState({
                                    offset: offset + mount
                                })
                            }
                        })
                    }}
                >
                    minus
                </button>
                <button
                    onClick={function () {
                        var motion = new Motion({
                            effect: 'easeOutElastic',
                            value: 180,
                            duration: 1000,
                            onAction: function (mount) {
                                var offset = self.state.offset
                                self.setState({
                                    offset: offset + mount
                                })
                            }
                        })
                    }}
                >
                    easeOutElastic
                </button>

                <button
                    onClick={function () {
                        var motion = new Motion({
                            effect: function easeInOutBounce (t, b, c, d) {
                        		if (t < d/2) return this.easeInBounce (t*2, 0, c, d) * .5 + b;
                        		return this.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
                        	},
                            value: 180,
                            duration: 1000,
                            onAction: function (mount) {
                                var offset = self.state.offset
                                self.setState({
                                    offset: offset + mount
                                })
                            }
                        })
                    }}
                >
                    function
                </button>
                <button
                    onClick={function () {
                        var motion = new Motion({
                            value: 180,
                            startSpeed: 0.1,
                            endSpeed: 0,
                            onAction: function (mount, speed) {
                                var offset = self.state.offset
                                self.setState({
                                    offset: offset + mount,
                                    speed: speed
                                })
                            }
                        })
                    }}
                >
                    speed&value
                </button>
                <button
                    onClick={function () {
                        var motion = new Motion({
                            duration: 3600,
                            startSpeed: 0.1,
                            endSpeed: 0,
                            onAction: function (mount, speed) {
                                var offset = self.state.offset
                                self.setState({
                                    offset: offset + mount,
                                    speed: speed
                                })
                            }
                        })
                    }}
                >
                    speed&duration
                </button>
                <button
                    onClick={function () {
                        var motion = new Motion({
                            value: Number.MAX_SAFE_INTEGER,
                            startSpeed: 0.1,
                            endSpeed: 0.1,
                            onAction: function (mount) {
                                var offset = self.state.offset
                                self.setState({
                                    offset: offset + mount
                                })
                            },
                            onStop: function () {
                                console.log('stop')
                            }
                        })
                        setTimeout(function () {
                            motion.stop()
                        }, 1000)
                    }}
                >
                    keep runing 1000ms
                </button>
                <button
                    onClick={function () {
                        var speedUp, uniform, slowDown
                        speedUp = new Motion({
                            value: 360,
                            startSpeed: 0,
                            endSpeed: 0.5,
                            onAction: function (mount) {
                                var offset = self.state.offset
                                self.setState({
                                    offset: offset + mount
                                })
                            },
                            onDone: function () {
                                uniform.run()
                                setTimeout(function () {
                                    uniform.stop()
                                    var target = 90
                                    // target = 360 - target // 如果箭头指向右边，则去掉此行注释
                                    var currentDeg = self.state.offset % 360
                                    // 加上 360 * 2 是因为 currentDeg 如果跟 target 很小，会变成快速指向目标
                                    var mountDeg = 360 * 2 + target - currentDeg
                                    var slowDown = new Motion({
                                        value: mountDeg,
                                        startSpeed: 0.5,
                                        endSpeed: 0,
                                        onAction: function (mount) {
                                            var offset = self.state.offset
                                            self.setState({
                                                offset: offset + mount
                                            })
                                        },
                                        onDone: function () {
                                            console.log('over')
                                        }
                                    })
                                    slowDown.run()
                                }, 2000)
                            }
                        })

                        uniform = new Motion({
                            run: false,
                            value: Number.MAX_SAFE_INTEGER,
                            startSpeed: 0.5,
                            endSpeed: 0.5,
                            onAction: function (mount) {
                                var offset = self.state.offset
                                self.setState({
                                    offset: offset + mount
                                })
                            }
                        })

                    }}

                >
                    turntable
                </button>

            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require('react-hot-loader').hot(module)(Basic)
export default Basic
