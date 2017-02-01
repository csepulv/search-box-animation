import React, {Component} from 'react';

const animationStyle = {
    transform: 'translateY(-150px)',
    transition: 'transform 1s ease'
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
                <Target isOpen={true}
                        onClick={this.onClick}
                        additionalStyles={{text: {}, frame: this.state.moveTop ? animationStyle :{}}}/>
            );
        }
    }
};

export default makeMoveUp;