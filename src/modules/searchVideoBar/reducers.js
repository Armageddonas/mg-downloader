import {INVALID_SEARCH, SET_SEARCH_URL, REQUEST_VIDEO_INFO, RECEIVE_VIDEO_INFO, SearchStates} from './actions'

export function searchVideoBar(state = {state: null, url: '', info: {}}, action) {
    switch (action.type) {
        case SET_SEARCH_URL:
            return Object.assign({}, state, {url: action.url});
        case INVALID_SEARCH:
            return Object.assign({}, state, {state: SearchStates.ERROR});
        case REQUEST_VIDEO_INFO:
        case RECEIVE_VIDEO_INFO:
            return videoRequests(state, action.type, action.info);
        default:
            return state;
    }
}

function videoRequests(state, type, info) {
    switch (type) {
        case REQUEST_VIDEO_INFO:
            return Object.assign({}, state, {state: SearchStates.SEARCHING});
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

            return Object.assign({}, state, {info: video}, {state: SearchStates.FOUND});
        default:
            return state;
    }
}