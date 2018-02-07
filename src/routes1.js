import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import App from './components/App';
import ForexSelectContainer from './components/ForexSelect/ForexSelectContainer';
import ForexEditorContainer from './components/ForexEditor/ForexEditorContainer';

const history = syncHistoryWithStore(browserHistory, store)

const Routes = () => (
    <Router history={history}>
        <Route path="/" component={App}>
            <Route path="forexs" component={ForexSelectContainer}/>
            <Route path="editor" component={ForexEditorContainer}/>
        </Route>
  </Router>
);

export default Routes;