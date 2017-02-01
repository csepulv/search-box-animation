import React, {Component} from 'react';
import {Motion, spring, presets} from 'react-motion'

const makeSpringUp = (Target) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {isOpen: false};
        }

        onClick = () => {
            this.setState({isOpen: !this.state.isOpen});
        };

        render() {
            const style = {
                translateY: this.state.isOpen ? spring(-300, presets.wobbly) : spring(0)
            };

            return (
                <Motion style={style}>
                    {({translateY}) => (
                        <Target isOpen={true}
                                onClick={this.onClick}
                                additionalStyles={{
                                    text: {},
                                    frame: {
                                        transform: `translateY(${translateY}px)`
                                    }
                                }}/>
                    )}
                </Motion>
            );
        }
    }
};

export default makeSpringUp;