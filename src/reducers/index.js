import { combineReducers } from 'redux';
import { forexApp } from './fxrates';
import { editorApp } from './fxEditor';
//import { routerReducer } from 'react-router-redux'

export default combineReducers(
    {
    forexApp,
    editorApp
});