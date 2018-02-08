import React from 'react';
import { render } from 'react-dom';
import './styles/w3.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Routes from './routes';

const store = configureStore();
render(
    <Provider store={store}>
        <Routes></Routes>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();

