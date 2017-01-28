import React, {Component} from 'react';
import {headShake} from 'react-animations';
import {StyleSheet, css} from 'aphrodite';

const styles = StyleSheet.create({
    headShake: {
        animationName: headShake,
        animationDuration: '1s'
    }
});

const makeShakeAnimation = (Target) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {shouldShake: props.shouldShake};
        }

        componentWillReceiveProps(nextProps){
            this.setState({shouldShake: nextProps.shouldShake}, () => {
                const self = this;
                setTimeout(() => self.setState({shouldShake: false}), 1000);
            });
            //https://css-tricks.com/restart-css-animation/ for discussion on restart
        }

        render() {
            return (
                <Target {...this.props}
                        frameClass={this.state.shouldShake ? css(styles.headShake) : ''}/>
            );
        }
    }
};

export default makeShakeAnimation;