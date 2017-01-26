import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// (Make material-ui happy)
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {TextField, IconButton} from 'material-ui'
import SearchIcon from 'material-ui/svg-icons/action/search';

import SearchBox from './SearchBox'
import makeExpanding from './expanding-animation';

const expandTransition = 'width 0.75s cubic-bezier(0.000, 0.795, 0.000, 1.000)';
const expandStyle = {
    expanded: {
        width: 300,
        transition: expandTransition
    },
    collapsed: {
        width: 0,
        transition: expandTransition
    }
};

const moveTransition = 'transform 0.5s ease';
const moveStyles = {
    expanded: {
        width: 0,
        transform: 'translateX(-150px)',
        transition: moveTransition
    },
    collapsed: {
        width: 0,
        transition: moveTransition
    }
};

class Expander extends Component {
    constructor(props) {
        super(props);
        this.state = {expand: false, boxStyles: [expandStyle.collapsed]};

    }

    onTransitionEnd = ({target, propertyName, elapsedTime}) => {
        if (target === this.refs.theBox) {
            let boxStyles = this.state.boxStyles;
            if (boxStyles.length > 1)
                boxStyles.splice(0, 1);

            this.setState({boxStyles: boxStyles});
        }
    };

    handleIconClick = () => {
        let newState = !this.state.expand;
        this.setState({
            expand: newState,
            boxStyles: newState
                ? [moveStyles.expanded, expandStyle.expanded]
                : [expandStyle.collapsed, moveStyles.collapsed]
        });
    };

    render() {
        const styles = {
            smallIcon: {
                width: 30,
                height: 30
            },
            small: {
                width: 40,
                height: 40,
                padding: 5,
                top: 10
            }
        };
        const textStyle = this.state.boxStyles[0];
        const divStyle = Object.assign({}, textStyle, {border: 'solid 1px black', borderRadius: 5});
        divStyle.width += styles.small.width + 5;
        divStyle.float='right';

        return (
            <div ref='theBox' style={divStyle} onTransitionEnd={this.onTransitionEnd}>
                <IconButton iconStyle={styles.smallIcon} style={styles.small} onClick={this.handleIconClick}>
                    <SearchIcon />
                </IconButton>
                <TextField name='search' style={textStyle}/>
            </div>
        );
    }
}

class Mover extends Component {
    constructor(props) {
        super(props);
        this.state = {expand: false, boxStyle: moveStyles.collapsed};
    }

    onTransitionEnd = ({target, propertyName, elapsedTime}) => {
        if (target === this.refs.theBox) {
            console.log(`move end:${propertyName}:${elapsedTime}`);
        }
    };

    handleIconClick = () => {
        this.setState({expand: !this.state.expand});
    };

    render() {

        const styles = {
            smallIcon: {
                width: 30,
                height: 30
            },
            small: {
                width: 40,
                height: 40,
                padding: 5,
                top: 10
            }
        };
        const baseStyle = this.state.expand ? moveStyles.expanded : moveStyles.collapsed;
        const divStyle = Object.assign({}, baseStyle, {border: 'solid 1px black', borderRadius: 5});
        divStyle.width = styles.small.width + 5;
        divStyle.height = 50;

        return (
            <div ref="theBox" style={divStyle} onTransitionEnd={this.onTransitionEnd}>
                <IconButton iconStyle={styles.smallIcon} style={styles.small} onClick={this.handleIconClick}>
                    <SearchIcon />
                </IconButton>
            </div>
        );
    }
}

class App extends Component {

    render() {
        //https://css-tricks.com/quick-css-trick-how-to-center-an-object-exactly-in-the-center/
        const style = {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };
        const ExpandingSearchBox = makeExpanding(SearchBox);

        return (
            <MuiThemeProvider>
                <div style={style}>
                    <ExpandingSearchBox/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
