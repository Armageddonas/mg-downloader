import React from 'react';

import {connect} from 'react-redux'
import {fetchVideoInfo, setSearchUrl, SearchStates} from './actions'
import searchVideoBar from './components/searchVideoBar'

const mapStateToProps = (state) => {
    const {searchVideoBar} = state;
    return {search: {url: searchVideoBar.url, state: searchVideoBar.state}, SearchStates};
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
)(searchVideoBar);

export default SearchVideoBar;