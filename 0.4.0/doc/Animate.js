import React , { Component } from "react"
import Motion from "face-motion"
class Demo extends Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {
            x:0,
            y: 0,
            deg: 0,
            r: 148,
            g: 166,
            b: 255
        }
    }
    render() {
        const self = this
        return (
            <div>
                <div style={{
                    width: 100,
                    height: 100,
                    background: `rgb(${self.state.r},${self.state.g},${self.state.b})`,
                    position: 'relative',
                    zIndex: 2,
                    left: self.state.x,
                    top: self.state.y,
                    transform: 'rotate(' + self.state.deg % 360 + 'deg) translate3d(0,0,0)',
                }} ></div>
                <button
                    onClick={function () {
                        var motion = Motion.animate({
                            duration: 500,
                            effect: 'easeOutElastic',
                            onAction: function (mountData) {
                                self.setState(
                                    Motion.mount(
                                        self.state,
                                        mountData
                                    )
                                )
                            },
                            value: {
                                x: {
                                    effect: 'linear',
                                    value: 200,
                                },
                                y: 30,
                                deg: 360,
                                // rgb must be a integer
                                r: {
                                    effect: 'linear',
                                    integer: true,
                                    value: 215 - self.state.r
                                },
                                g: {
                                    effect: 'linear',
                                    integer: true,
                                    value: 58 - self.state.g
                                },
                                b: {
                                    effect: 'linear',
                                    integer: true,
                                    value: 73 - self.state.b
                                },
                            }
                        })
                        motion.run()
                        console.log('motion', motion)
                    }}
                >animate</button>
            </div>
        )
    }
}
/*ONFACE-DEL*/Demo = require('react-hot-loader').hot(module)(Demo)
export default Demo
