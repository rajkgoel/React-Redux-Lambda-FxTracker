import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

const history = createHistory();
const logger = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
  });

export default function configureStore(initialState) {
    //console.log('Inside store->configureStore', initialState);
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, routerMiddleware(history), logger)
    );
}
