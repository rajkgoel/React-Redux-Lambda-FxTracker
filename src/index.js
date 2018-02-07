import React from 'react';
import { render } from 'react-dom';
import './w3.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Routes from './routes';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const store = configureStore();
//muiTheme={getMuiTheme(darkBaseTheme)}
render(
    <MuiThemeProvider> 
        <Provider store={store}>
            <Routes></Routes>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'));
registerServiceWorker();

