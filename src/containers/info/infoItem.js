import React from 'react';

import {connect} from 'react-redux'
import {removeVideo} from '../../modules/videoList'
import infoItem from '../../components/Info/infoItem'

const mapStateToProps = (state) => {
    const {settings} = state;
    return {downloadPath: settings.downloadPath};
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleRemoveVideo: (id) => {
            dispatch(removeVideo(id))
        }
    }
};

const InfoItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(infoItem);

export default InfoItem;