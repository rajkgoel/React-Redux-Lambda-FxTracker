import React from 'react';
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch } from 'react-router'
import createHistory from 'history/createBrowserHistory'

import ForexSelectContainer from './components/ForexSelect/ForexSelectContainer';
import ForexEditorContainer from './components/ForexEditor/ForexEditorContainer';
import HeaderContainer from './components/Header/HeaderContainer';

const history = createHistory();

const Routes = () => (
    <ConnectedRouter history={history}>
        <div>
            <HeaderContainer/>
            <div className="w3-card-4 w3-container" >
                <Switch>
                    <Route path="/forexs" component={ForexSelectContainer} />
                    <Route path="/editor" component={ForexEditorContainer} />
                </Switch>
            </div>
        </div>
    </ConnectedRouter>
);

export default Routes;