import { combineReducers } from 'redux';
import { forexApp } from './fxrates';
import { editorApp } from './fxEditor';
import { commonApp } from "./common";
//import { routerReducer } from 'react-router-redux'

export default combineReducers(
    {
    commonApp,
    forexApp,
    editorApp
});