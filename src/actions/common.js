import { SET_PAGE_HEADER } from '../constants/Const'

export function setPageHeader(header) {
    return { type: SET_PAGE_HEADER, pageHeader: header };
}