import {validateYouTubeUrl} from "../../tools/utilities/validators";
import {findUniqueObjectPos} from "../../tools/utilities/arrayUtilities";
import videoTools from '../../tools/videoTools/videoTools';

import {actions} from '../videoList'

export const INVALID_SEARCH = 'INVALID_SEARCH';
export const SET_SEARCH_URL = 'SET_SEARCH_URL';
export const REQUEST_VIDEO_INFO = 'REQUEST_VIDEO_INFO';
export const RECEIVE_VIDEO_INFO = 'RECEIVE_VIDEO_INFO';

export const SearchStates = {
    SEARCHING: 'SEARCHING',
    FOUND: 'FOUND',
    ERROR: 'ERROR'
};

export function invalidSearch(url) {
    return {
        type: INVALID_SEARCH,
        url
    }
}

export function setSearchUrl(url) {
    return {
        type: SET_SEARCH_URL,
        url
    }
}

export function requestVideoInfo() {
    return {
        type: REQUEST_VIDEO_INFO
    }
}

export function receiveVideoInfo(info) {
    return {
        type: RECEIVE_VIDEO_INFO,
        info
    }
}

export function fetchVideoInfo(videoUrl) {
    return (dispatch, getState) => {

        // todo: check by id not url
        // Check if url is valid and if it already exists in the list
        let searchUrl = videoUrl;
        let videos = getState().videoList.videos;
        if ((!validateYouTubeUrl(searchUrl) || findUniqueObjectPos(videos, 'url', searchUrl) > -1)) {
            dispatch(invalidSearch());
            return;
        }

        // Request is about to start
        dispatch(requestVideoInfo());

        // Send request
        let onInfoFound = res => {
            dispatch(receiveVideoInfo(res));
            // todo: add modular logic here
            dispatch(actions.addInfoToList(res));
        };
        let onError = url => dispatch(invalidSearch(url));

        return videoTools.getInfo(videoUrl, onInfoFound, onError);
    }
}