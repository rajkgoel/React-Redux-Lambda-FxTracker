import { SET_PAGE_HEADER } from '../constants/Const'

const initialState = {
    pageHeader: 'Home'
  }

export function commonApp(state=initialState, action) {
    return {
        setPageHeader: setPageHeader(state.pageHeader, action)
    }
}

function setPageHeader(state='Home', action){
    switch(action.type){
        case SET_PAGE_HEADER:
            return action.pageHeader;
        default:
            return state;
    }
}