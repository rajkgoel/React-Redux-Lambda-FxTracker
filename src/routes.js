import React from 'react';
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch } from 'react-router'
import createHistory from 'history/createBrowserHistory'

import App from './components/App';
import ForexSelectContainer from './components/ForexSelect/ForexSelectContainer';
import ForexEditorContainer from './components/ForexEditor/ForexEditorContainer';

const history = createHistory();

const Routes = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/forexs" component={ForexSelectContainer} />
            <Route path="/editor" component={ForexEditorContainer} />
        </Switch>
    </ConnectedRouter>
);

export default Routes;