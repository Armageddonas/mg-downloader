import {combineReducers} from 'redux'
import {REQUEST_VIDEO_INFO, RECEIVE_VIDEO_INFO, CANCEL_SEARCH, SET_SEARCH_URL} from '../actions'
import {findUniqueObjectPos} from '../tools/utilities/arrayUtilities';
import {validateYouTubeUrl} from '../tools/utilities/validators';

function videoList(state = {search: {state: null, url: ''}, videos: []}, action) {
    // Check if url is valid and if it already exists in the list
    if (action.url &&
        (!validateYouTubeUrl(action.url) || findUniqueObjectPos(state.videos, 'url', action.url) > -1)
    ) {
        let nextState = {};
        nextState['search'] = {
            state: 'error'
        };

        return Object.assign({}, state, nextState);
    }

    switch (action.type) {
        case SET_SEARCH_URL:
            return Object.assign({}, state, {search: {url: action.url}});
        case REQUEST_VIDEO_INFO:
        case RECEIVE_VIDEO_INFO:
            return videoRequests(state, action.type, action.info);
        case CANCEL_SEARCH:
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