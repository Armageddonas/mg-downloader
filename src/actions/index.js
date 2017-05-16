import videoTools from '../tools/videoTools/videoTools';
import {validateYouTubeUrl} from "../tools/utilities/validators";
import {findUniqueObjectPos} from "../tools/utilities/arrayUtilities";

export const REQUEST_VIDEO_INFO = 'REQUEST_VIDEO_INFO';
export const RECEIVE_VIDEO_INFO = 'RECEIVE_VIDEO_INFO';
export const INVALID_SEARCH = 'INVALID_SEARCH';
export const SET_SEARCH_URL = 'SET_SEARCH_URL';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';

export const SearchStates = {
    SEARCHING: 'SEARCHING',
    FOUND: 'FOUND',
    ERROR: 'ERROR'
};

// Search functions
export function invalidSearch() {
    return {
        type: INVALID_SEARCH
    }
}

export function setSearchUrl(url) {
    return {
        type: SET_SEARCH_URL,
        url
    }
}

// Video functions
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

export function removeVideo(id) {
    return {
        type: REMOVE_VIDEO,
        id
    }
}

export function fetchVideoInfo(videoUrl) {
    return (dispatch, getState) => {

        // Check if url is valid and if it already exists in the list
        let searchUrl = getState().videoList.search.url;
        let videos = getState().videoList.videos;
        if ((!validateYouTubeUrl(searchUrl) || findUniqueObjectPos(videos, 'url', searchUrl) > -1)) {
            dispatch(invalidSearch());
            return;
        }

        // Request is about to start
        dispatch(requestVideoInfo());

        // Send request
        let onInfoFound = res => dispatch(receiveVideoInfo(res));
        let onError = (url) => console.log('Error on: ', url);

        return videoTools.getInfo(videoUrl, onInfoFound, onError);
    }
}

