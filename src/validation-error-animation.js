import React, {Component} from 'react';
import {headShake} from 'react-animations';
import {StyleSheet, css} from 'aphrodite';

const styles = StyleSheet.create({
    headShake: {
        animationName: headShake,
        animationDuration: '1s'
    }
});

const makeValidationErrorAnimation = (Target) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {shouldShake: false};
        }

        onClick = () => {
            this.setState({shouldShake: !this.state.shouldShake});
        };

        render() {
            return (
                <Target isOpen={true}
                        clickHandler={this.onClick}
                        additionalStyles={{text: {}, frame: {}}}
                        frameClass={this.state.shouldShake ? css(styles.headShake) : ''}/>
            );
        }
    }
};

export default makeValidationErrorAnimation;