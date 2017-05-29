import environment from '../environment'
import {fetchVideoInfo} from '../actions'

let initVideoList = (dispatch) => {
    if (environment.debug === true && environment.sampleUrls) {
        environment.sampleUrls.forEach((el) => {
            dispatch(fetchVideoInfo(el));
        })
    }
};

export {initVideoList};