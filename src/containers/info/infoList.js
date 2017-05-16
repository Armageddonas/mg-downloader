import React from 'react';

import {connect} from 'react-redux'
import infoList from '../../components/Info/infoList'

const mapStateToProps = (state) => {
    const {videoList} = state;
    return {videos: videoList.videos};
};

const InfoList = connect(
    mapStateToProps
)(infoList);

export default InfoList;