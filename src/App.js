import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// (Make material-ui happy)
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {TextField, IconButton} from 'material-ui'
import SearchIcon from 'material-ui/svg-icons/action/search';

class Expander extends Component {
    constructor(props) {
        super(props);
        this.state = {expand: false};

    }

    onTransitionEnd = ({target, propertyName, elapsedTime}) => {
        if(target===this.refs.theBox) {
            console.log(`expand end:${propertyName}:${elapsedTime}`);
        }
    };

    handleIconClick = () => {
        this.setState({expand: !this.state.expand});
    };

    render() {
        const transition = 'width 0.75s cubic-bezier(0.000, 0.795, 0.000, 1.000)';
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
            },
            expanded: {
                width: 300,
                transition: transition
            },
            collapsed: {
                width: 0,
                transition: transition
            }
        };
        const textStyle = this.state.expand ? styles.expanded : styles.collapsed;
        const divStyle = Object.assign({}, textStyle, {border: 'solid 1px black', borderRadius: 5});
        divStyle.width += styles.small.width + 5;

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
        this.state = {expand: false};

    }

    onTransitionEnd = ({target, propertyName, elapsedTime}) => {
        if(target===this.refs.theBox) {
            console.log(`move end:${propertyName}:${elapsedTime}`);
        }
    };

    handleIconClick = () => {
        this.setState({expand: !this.state.expand});
    };

    render() {
        const transition = 'transform 0.5s ease';
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
            },
            expanded: {
                height: 50,
                transform: 'translateX(10em)',
                transition: transition
            },
            collapsed: {
                height: 50,
                transition: transition
            }
        };
        const baseStyle = this.state.expand ? styles.expanded : styles.collapsed;
        const divStyle = Object.assign({}, baseStyle, {border: 'solid 1px black', borderRadius: 5});
        divStyle.width = styles.small.width + 5;

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

        return (
            <MuiThemeProvider>
                <div>
                    <Expander/>
                    <Mover/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
