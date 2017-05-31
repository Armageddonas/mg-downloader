import {combineReducers} from 'redux'
import {reducers} from '../modules/searchVideoBar'
import {videoList} from '../modules/videoList'
import {settings} from '../modules/settings'

const rootReducer = combineReducers({
    videoList,
    settings,
    searchVideoBar: reducers.searchVideoBar
});

export default rootReducer