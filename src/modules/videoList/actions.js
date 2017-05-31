export const ADD_INFO_TO_LIST = 'ADD_INFO_TO_LIST';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';

export function addInfoToList(info) {
    return {
        type: ADD_INFO_TO_LIST,
        info
    }
}

export function removeVideo(id) {
    return {
        type: REMOVE_VIDEO,
        id
    }
}
