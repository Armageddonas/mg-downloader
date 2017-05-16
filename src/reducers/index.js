import {combineReducers} from 'redux'
import {REQUEST_VIDEO_INFO, RECEIVE_VIDEO_INFO, INVALID_SEARCH, SET_SEARCH_URL} from '../actions'

function videoList(state = {search: {state: null, url: ''}, videos: []}, action) {

    switch (action.type) {
        case SET_SEARCH_URL:
            return Object.assign({}, state, {search: {url: action.url}});
        case REQUEST_VIDEO_INFO:
        case RECEIVE_VIDEO_INFO:
            return videoRequests(state, action.type, action.info);
        case INVALID_SEARCH:
            let nextState = {};
            nextState.search = Object.assign({}, state.search);
            nextState.search.state = 'error';

            return Object.assign({}, state, nextState);
        default:
            return state;
    }
}

function videoRequests(state, type, info) {
    let nextState;

    switch (type) {
        case REQUEST_VIDEO_INFO:
            let search = Object.assign({}, state.search);
            search.state = 'searching';

            return Object.assign({}, state, {search: search});
        case RECEIVE_VIDEO_INFO:
            let video = {};
            video = {
                title: info.title,
                thumbnail: info.thumbnail,
                description: info.description,
                id: info.id,
                url: info.url,
                // loading: false,
                isFetching: false,
                didInvalidate: false,
            };

            nextState = {};
            nextState.videos = state.videos.slice();
            nextState.videos.push(video);

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