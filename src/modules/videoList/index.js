import React from 'react';
import {connect} from 'react-redux'

import infoList from './components/infoList'
import {addInfoToList, removeVideo, ADD_INFO_TO_LIST, REMOVE_VIDEO} from './actions';
import {videoList} from './reducers';

const mapStateToProps = (state) => {
    const {videoList} = state;
    return {videos: videoList.videos};
};

const InfoList = connect(
    mapStateToProps
)(infoList);
const actions = {addInfoToList, removeVideo};
const actionTypes = {ADD_INFO_TO_LIST, REMOVE_VIDEO};
const reducers = {videoList};

export {InfoList};
export {actions};
export {actionTypes};
export {reducers};