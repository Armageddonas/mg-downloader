import React from 'react';
import {connect} from 'react-redux'

import infoList from './components/infoList'
import {addInfoToList, removeVideo, ADD_INFO_TO_LIST, REMOVE_VIDEO} from './actions';

const mapStateToProps = (state) => {
    const {videoList} = state;
    return {videos: videoList.videos};
};

const InfoList = connect(
    mapStateToProps
)(infoList);

export {InfoList};
export {addInfoToList, removeVideo, ADD_INFO_TO_LIST, REMOVE_VIDEO};