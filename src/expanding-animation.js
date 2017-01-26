import React, {Component} from 'react';

const animationStyle = {
    transition: 'width 0.75s cubic-bezier(0.000, 0.795, 0.000, 1.000)'
};

const makeExpanding = (Target) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {isOpen: false};
        }

        onClick = () => {
            let newState = !this.state.isOpen;
            this.setState({
                isOpen: newState
            });
        };

        render() {
            return (
                <Target isOpen={this.state.isOpen}
                        clickHandler={this.onClick}
                        additionalStyles={{text:animationStyle, frame:animationStyle}} />
            );
        }
    }
};

export default makeExpanding;