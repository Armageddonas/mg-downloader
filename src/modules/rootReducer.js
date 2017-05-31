import {combineReducers} from 'redux'
import {reducers as SVBReducers} from '../modules/searchVideoBar'
import {reducers as VLReducers} from '../modules/videoList'
import {reducers as SReducers} from '../modules/settings'

const rootReducer = combineReducers({
    videoList: VLReducers.videoList,
    settings: SReducers.settings,
    searchVideoBar: SVBReducers.searchVideoBar
});

export default rootReducer