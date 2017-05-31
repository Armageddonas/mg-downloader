import {findUniqueObjectPos} from "../../tools/utilities/arrayUtilities";
import {ADD_INFO_TO_LIST, REMOVE_VIDEO} from './actions'

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

export {videoList};