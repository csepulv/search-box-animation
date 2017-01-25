import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// (Make material-ui happy)
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {TextField, IconButton} from 'material-ui'
import SearchIcon from 'material-ui/svg-icons/action/search';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {expand: false};

    }

    handleIconClick = () => {
        this.setState({expand: !this.state.expand});
    };

    render() {
        //const transition = 'width 4s cubic-bezier(0.000, 0, 1.000, 1.000)';
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
        const divStyle = Object.assign({}, textStyle, {border:'solid 1px black'});
        divStyle.width += styles.small.width + 5;

        return (
            <MuiThemeProvider>
                <div style={divStyle}>
                    <IconButton iconStyle={styles.smallIcon} style={styles.small} onClick={this.handleIconClick}>
                        <SearchIcon />
                    </IconButton>
                    <TextField id='search' style={textStyle}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
