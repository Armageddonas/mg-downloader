import React from 'react';

import {connect} from 'react-redux'
import {removeVideo} from '../../actions'
import infoItem from '../../components/Info/infoItem'

const mapDispatchToProps = (dispatch) => {
    return {
        handleRemoveVideo: (id) => {
            dispatch(removeVideo(id))
        }
    }
};

const InfoItem = connect(
    null,
    mapDispatchToProps
)(infoItem);

export default InfoItem;