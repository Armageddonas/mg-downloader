import videoTools from '../tools/videoTools/videoTools';
import {validateYouTubeUrl} from "../tools/utilities/validators";
import {findUniqueObjectPos} from "../tools/utilities/arrayUtilities";

export const REQUEST_VIDEO_INFO = 'REQUEST_VIDEO_INFO';
export const RECEIVE_VIDEO_INFO = 'RECEIVE_VIDEO_INFO';
export const CANCEL_SEARCH = 'CANCEL_SEARCH';
export const SET_SEARCH_URL = 'SET_SEARCH_URL';

export function requestVideoInfo(url) {
    return {
        type: REQUEST_VIDEO_INFO,
        url
    }
}

export function receiveVideoInfo(info) {
    return {
        type: RECEIVE_VIDEO_INFO,
        info
    }
}

export function cancelSearch() {
    return {
        type: CANCEL_SEARCH
    }
}

export function setSearchUrl(url) {
    return {
        type: SET_SEARCH_URL,
        url
    }
}



export function fetchVideoInfo(videoUrl) {
    return (dispatch, getState) => {

        // Check if url is valid and if it already exists in the list
        if (getState.url &&
            (!validateYouTubeUrl(getState.url) || findUniqueObjectPos(state.videos, 'url', getState.url) > -1)
        ) {
            dispatch(cancelSearch());

            let nextState = {};
            nextState['search'] = {
                state: 'error'
            };

            return Object.assign({}, state, nextState);
        }

        dispatch(requestVideoInfo(videoUrl));

        let onInfoFound = res => {
            console.log(res);
            dispatch(receiveVideoInfo(res))
        };
        let onError = (url) => console.log('Error on: ', url);

        return videoTools.getInfo(videoUrl, onInfoFound, onError);
    }
}

