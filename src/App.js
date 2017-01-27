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
import makeFloatUp from './float-up-animation';
import makeSpringUp from './spring-up-animation';
import makeValidationErrorAnimation from './validation-error-animation';

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
        const FloatingSearchBox = makeFloatUp(SearchBox);
        const SpringUpSearchBox = makeSpringUp(SearchBox);
        const ValidationSearchBox = makeValidationErrorAnimation(SearchBox);

        return (
            <MuiThemeProvider>
                <div style={style}>
                    <ValidationSearchBox/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
