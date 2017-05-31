import environment from '../../environment'
import {actions} from '../modules/searchVideoBar'

let initVideoList = (dispatch) => {
    let {active, sampleUrls} = environment.initVideoList;

    if (active === true) {
        sampleUrls.forEach((el) => {
            dispatch(actions.fetchVideoInfo(el));
        })
    }
};

export {initVideoList};