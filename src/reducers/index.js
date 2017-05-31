import {combineReducers} from 'redux'
import {SET_DOWNLOAD_PATH} from '../actions'
import {findUniqueObjectPos} from "../tools/utilities/arrayUtilities";
import {searchVideoBar} from '../modules/searchVideoBar/reducers'

import { ADD_INFO_TO_LIST, REMOVE_VIDEO} from '../modules/videoList'

function videoList(state = {search: {state: null, url: ''}, videos: []}, action) {
    let nextState;

    switch (action.type) {
        case REMOVE_VIDEO:
            nextState = {};
            nextState.videos = state.videos.slice();
            let index = findUniqueObjectPos(nextState.videos, 'id', action.id);
            nextState.videos.splice(index, 1);

            return Object.assign({}, state, nextState);
        case ADD_INFO_TO_LIST:
            // Add video to list
            nextState = {};
            nextState.videos = state.videos.slice();
            nextState.videos.push(action.info);

            return Object.assign({}, state, nextState);
        default:
            return state;
    }
}

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