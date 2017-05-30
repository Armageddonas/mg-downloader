import environment from '../environment'
import {fetchVideoInfo} from '../actions'

let initVideoList = (dispatch) => {
    let {active, sampleUrls} = environment.initVideoList;

    if (active === true) {
        sampleUrls.forEach((el) => {
            dispatch(fetchVideoInfo(el));
        })
    }
};

export {initVideoList};