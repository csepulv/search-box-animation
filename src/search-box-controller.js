import React, {Component} from 'react';

import makeExpanding from './expanding-animation';
import makeShakingAnimation from './shake-animation';

const makeAnimatedValidationSearchBox = (Target) => {
    const WrappedComponent = makeShakingAnimation(makeExpanding(Target));

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {query: '', hasError: false};
        }

        onQueryUpdate = (value) => {
            this.setState({query: value, hasError:false});
        };

        onSubmit = () => {
            this.setState({hasError: true});
        };

        render() {
            return (
                <WrappedComponent
                    onQueryUpdate={this.onQueryUpdate}
                    query={this.state.query}
                    onSubmit={this.onSubmit}
                    shouldShake={this.state.hasError}
                />
            );
        }
    }
};

export default makeAnimatedValidationSearchBox;