import React, {Component} from 'react';
import {Motion, spring, presets} from 'react-motion'

const makeMoveWithTranslate = (Target) => {
    return class extends Component {
        render() {
            const animationStyle = {
                transform: 'translateY(-150px)',
                transition: 'transform 1s ease'
            };

            return (
                <Target isOpen={true}
                        onClick={this.props.onClick}
                        additionalStyles={{text: {}, frame: this.props.moveUp ? animationStyle : {}}}/>
            );
        }
    }
};

const makeMoveWithSpring = (Target) => {
    return class extends Component {
        render() {
            const style = {
                translateY: this.props.moveUp ? spring(-150, presets.wobbly) : spring(0)
            };

            return (
                <Motion style={style}>
                    {({translateY}) => (
                        <Target isOpen={true}
                                onClick={this.props.onClick}
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

const makeMoveUp = (Target) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {moveTop: false};
        }

        onClick = () => {
            this.setState({moveTop: !this.state.moveTop});
        };

        render() {
            return (
                <Target moveUp={this.state.moveTop} onClick={this.onClick}/>
            );
        }
    }
};

export const makeTranslateUp = (Target) => makeMoveUp(makeMoveWithTranslate(Target));
export const makeSpringUp = (Target) => makeMoveUp(makeMoveWithSpring(Target));

