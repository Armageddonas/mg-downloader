import {connect} from 'react-redux'
import {requestVideoInfo, removeVideo} from '../../actions/index'
import DisplayContent from '../../components/downloader/displayContent'

const mapStateToProps = (state) => {
    const {videoList} = state;
    return {videos: videoList.videos};
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleUrlSearch: (url) => {
            dispatch(requestVideoInfo(url))
        },
        handleRemoveVideo: (id) => {
            dispatch(removeVideo(id))
        }
    }
};

const dc = connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayContent);

export default dc;