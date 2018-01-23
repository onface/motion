import React , { Component } from "react"
import MotionLogic from "motion-logic"
class Demo extends Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {
            x:0,
            y: 0,
            deg: 0,
            rgb: [148,166,255],
            targetRgb: [255,226,19]
        }
    }
    render() {
        const self = this
        return (
            <div>
                <div style={{
                    width: 100,
                    height: 100,
                    background: `rgb(${self.state.rgb.map(function(value){ return parseInt(value)}).join(',')})`,
                    position: 'relative',
                    left: self.state.x,
                    top: self.state.y,
                    transform: 'rotate(' + self.state.deg % 360 + 'deg) translate3d(0,0,0)',
                }} ></div>
                <button
                    onClick={function () {
                        var animateX = new MotionLogic({
                            value: 100,
                            duration: 500,
                            effect: 'easeOutElastic',
                            onAction: function (mount) {
                                self.setState({
                                    x: self.state.x + mount
                                })
                            }
                        })
                        animateX.run()
                        var animateY = new MotionLogic({
                            value: -30,
                            duration: 500,
                            effect: 'easeOutElastic',
                            onAction: function (mount) {
                                self.setState({
                                    y: self.state.y + mount
                                })
                            }
                        })
                        animateY.run()
                        var animateDeg = new MotionLogic({
                            value: 360,
                            duration: 500,
                            effect: 'easeOutElastic',
                            onAction: function (mount) {
                                self.setState({
                                    deg: self.state.deg + mount
                                })
                            }
                        })
                        animateDeg.run()
                        new MotionLogic({
                            value: self.state.targetRgb[0] - self.state.rgb[0],
                            duration: 500,
                            onAction: function (mount) {
                                let state = self.state
                                state.rgb[0] = state.rgb[0] + mount
                                self.setState(state)
                            }
                        }).run()
                        new MotionLogic({
                            value: self.state.targetRgb[1] - self.state.rgb[1],
                            duration: 500,
                            onAction: function (mount) {
                                let state = self.state
                                state.rgb[1] = state.rgb[1] + mount
                                self.setState(state)
                            }
                        }).run()
                        new MotionLogic({
                            value: self.state.targetRgb[2] - self.state.rgb[2],
                            duration: 500,
                            onAction: function (mount) {
                                let state = self.state
                                state.rgb[2] = state.rgb[2] + mount
                                self.setState(state)
                            }
                        }).run()

                    }}
                >animate</button>
            </div>
        )
    }
}
/*ONFACE-DEL*/Demo = require('react-hot-loader').hot(module)(Demo)
export default Demo
