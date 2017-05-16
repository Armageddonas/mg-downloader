import React from 'react';

import {connect} from 'react-redux'
import {fetchVideoInfo, setSearchUrl} from '../../actions/index'
import searchVideo from '../../components/downloader/searchVideo'

const mapStateToProps = (state) => {
    const {videoList} = state;
    return {search: videoList.search};
};

const mapDispatchToProps = (dispatch) => {
    return {
        requestVideoInfo: (url) => {
            dispatch(fetchVideoInfo(url))
        },
        handleInputUrl: (url) => {
            dispatch(setSearchUrl(url))
        }
    }
};

const SearchVideo = connect(
    mapStateToProps,
    mapDispatchToProps
)(searchVideo);

export default SearchVideo;