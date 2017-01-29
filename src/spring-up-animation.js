import React, {Component} from 'react';
import {Motion, spring, presets} from 'react-motion'

const makeSpringUp = (Target) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {moveTop: false};
        }

        onClick = () => {
            this.setState({moveTop: !this.state.moveTop});
        };

        render() {
            const style = {
                translateY: this.state.moveTop ? spring(-300, presets.gentle) : spring(0)
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