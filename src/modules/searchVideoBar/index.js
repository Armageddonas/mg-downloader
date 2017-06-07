import React from 'react';

import {connect} from 'react-redux'
import {fetchVideoInfo, setSearchUrl, SearchStates} from './actions'
import {searchVideoBar} from './reducers'
import searchVideoBarComp from './components/searchVideoBar'

const mapStateToProps = (state) => {
    const {searchVideoBar} = state;
    return {search: {url: searchVideoBar.url, state: searchVideoBar.state}, errorMsg: searchVideoBar.errorMsg, SearchStates};
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

const SearchVideoBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(searchVideoBarComp);

const actions = {fetchVideoInfo, setSearchUrl};
const actionTypes = {SearchStates};
const reducers = {searchVideoBar};

export {actions}
export {actionTypes}
export {reducers}
export {SearchVideoBar}
