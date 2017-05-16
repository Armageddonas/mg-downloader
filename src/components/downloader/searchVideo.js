import React, {Component} from 'react';
import {Input} from 'semantic-ui-react'

export default class SearchVideo extends Component {
    constructor(props) {
        super(props);

        this.handleUrlSearch = this.handleUrlSearch.bind(this);
    }

    handleUrlSearch(e) {
        // Get url from input
        let videoUrl = e.target.value;
        this.props.handleInputUrl(videoUrl);

        this.props.requestVideoInfo(videoUrl);
    };

    render() {
        let handleSearch = this.handleUrlSearch;
        let searchUrl = this.props.search.url;
        let searchState = this.props.search.state;

        switch (searchState) {
            case 'searching':
                return <Input fluid icon='user' loading={searchState === 'searching'} readOnly
                              onChange={handleSearch}
                              value={searchUrl}
                              type="text"/>;
            case 'found':
                return <Input fluid icon="check" color="green" onChange={handleSearch} value={searchUrl}
                              type="text"/>;
            case 'error':
                return <Input fluid icon="warning circle" color="red" onChange={handleSearch}
                              value={searchUrl} type="text"/>;
            default:
                return (
                    <Input fluid onChange={handleSearch} value={searchUrl} type="text"
                           placeholder="Enter youtube url"/>
                );
        }
    }
}
