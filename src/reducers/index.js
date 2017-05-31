import {combineReducers} from 'redux'
import {SET_DOWNLOAD_PATH} from '../actions'
import {searchVideoBar} from '../modules/searchVideoBar/reducers'
import {videoList} from '../modules/videoList/reducers'

function settings(state = {}, action){
    switch (action.type) {
        case SET_DOWNLOAD_PATH:
            localStorage.setItem('downloadPath', JSON.stringify(action.path));
            return Object.assign({}, state, {downloadPath: action.path});
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    videoList,
    settings,
    searchVideoBar
});

export default rootReducer