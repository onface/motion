import React , { Component } from "react"
import MotionLogic from "motion-logic"
class Demo extends Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {
            x:0,
            y: 0,
            deg: 0
        }
    }
    render() {
        const self = this
        return (
            <div>
                <div style={{
                    width: 100,
                    height: 100,
                    background: 'skyblue',
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
                    }}
                >animate</button>
            </div>
        )
    }
}
/*ONFACE-DEL*/Demo = require('react-hot-loader').hot(module)(Demo)
export default Demo
