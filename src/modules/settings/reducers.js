import {SET_DOWNLOAD_PATH} from './actions'

function settings(state = {}, action){
    switch (action.type) {
        case SET_DOWNLOAD_PATH:
            localStorage.setItem('downloadPath', JSON.stringify(action.path));
            return Object.assign({}, state, {downloadPath: action.path});
        default:
            return state;
    }
}

export {settings}