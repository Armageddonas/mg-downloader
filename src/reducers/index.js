import {combineReducers} from 'redux'
import {REQUEST_VIDEO_INFO, RECEIVE_VIDEO_INFO, INVALID_SEARCH, SET_SEARCH_URL, REMOVE_VIDEO} from '../actions'
import {findUniqueObjectPos} from "../tools/utilities/arrayUtilities";

function videoList(state = {search: {state: null, url: ''}, videos: []}, action) {
    let nextState;

    switch (action.type) {
        case SET_SEARCH_URL:
            return Object.assign({}, state, {search: {url: action.url}});
        case INVALID_SEARCH:
            // Change search state
            nextState = {};
            nextState.search = Object.assign({}, state.search);
            nextState.search.state = 'error';

            return Object.assign({}, state, nextState);
        case REMOVE_VIDEO:
            nextState = {};
            nextState.videos = state.videos.slice();
            let index = findUniqueObjectPos(nextState.videos, 'id', action.id);
            nextState.videos.splice(index, 1);

            return Object.assign({}, state, nextState);
        case REQUEST_VIDEO_INFO:
        case RECEIVE_VIDEO_INFO:
            return videoRequests(state, action.type, action.info);
        default:
            return state;
    }
}

function videoRequests(state, type, info) {
    let nextState;

    switch (type) {
        case REQUEST_VIDEO_INFO:
            // Change search state
            nextState = {};
            nextState.search = Object.assign({}, state.search);
            nextState.search.state = 'searching';

            return Object.assign({}, state, nextState);
        case RECEIVE_VIDEO_INFO:
            // Initialize video with received info
            let video = {
                title: info.title,
                thumbnail: info.thumbnail,
                description: info.description,
                id: info.id,
                url: info.url,
                isFetching: false,
                didInvalidate: false,
            };

            // Add video to list
            nextState = {};
            nextState.videos = state.videos.slice();
            nextState.videos.push(video);

            // Change search state and clean url
            nextState.search = Object.assign({}, state.search);
            nextState.search.state = 'found';
            nextState.search.url = '';

            return Object.assign({}, state, nextState);
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    videoList
});

export default rootReducer