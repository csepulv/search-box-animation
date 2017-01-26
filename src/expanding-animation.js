import React, {Component} from 'react';

const expandAnimationStyles = {
    open: {
        text: {
            transition: 'width 0.75s cubic-bezier(0.000, 0.795, 0.000, 1.000)',
            width: 300,
        },
        frame: {
            transition: 'width 0.75s cubic-bezier(0.000, 0.795, 0.000, 1.000)',
            width: 300,
            position: 'absolute',
            left: 0,
            top:-25,
            marginLeft: -150
        }
    },
    closed: {
        text: {
            transition: 'width 0.75s cubic-bezier(0.000, 0.795, 0.000, 1.000)',
            width: 0,
        },
        frame: {
            transition: 'width 0.75s cubic-bezier(0.000, 0.795, 0.000, 1.000)',
            width: 0,
        }
    },

};
const translationAnimationStyles = {
    open: {
        text: {
            width: 0,
        },
        frame: {
            transform: 'translateX(-150px)',
            transition: 'transform 0.5s ease'
        }
    },
    closed: {
        text: {
            width: 0,
        },
        frame: {
            transition: 'transform 0.5s ease'
        }
    }
};

const makeExpanding = (Target) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isOpen: false,
                animationStyles: [expandAnimationStyles.closed]
            };
        }

        onClick = () => {
            let newState = !this.state.isOpen;
            let newAnimationStyles;

            if (newState) newAnimationStyles = [translationAnimationStyles.open, expandAnimationStyles.open];
            else newAnimationStyles = [expandAnimationStyles.closed, translationAnimationStyles.closed];

            this.setState({
                isOpen: newState,
                animationStyles: newAnimationStyles
            });
        };
        handleTransitionEnd = ({target, propertyName, elapsedTime}) => {
            console.log(`${target.innerHTML}:${this.animationWrapper.innerHTML}`);
            if (propertyName === 'transform' || propertyName === 'width') {
                let animationStyles = this.state.animationStyles;
                if (animationStyles.length > 1)
                    animationStyles.splice(0, 1);

                this.setState({animationStyles: animationStyles});
            }
        };

        render() {
            const refCallback = (animationWrapper) => {
                this.animationWrapper = animationWrapper;
            };
            return (
                <div ref={refCallback} onTransitionEnd={this.handleTransitionEnd} >
                    <Target isOpen={this.state.isOpen}
                            clickHandler={this.onClick}
                            additionalStyles={this.state.animationStyles[0]}
                    />

                </div>
            );
        }
    }
};

export default makeExpanding;