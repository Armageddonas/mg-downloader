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
                return <Input icon='user' loading readOnly
                              onChange={handleSearch}
                              value={searchUrl}
                              fluid type="text"/>;
            case 'found':
                return <Input icon="check" color="green"
                              onChange={handleSearch}
                              value={searchUrl}
                              fluid type="text"/>;
            case 'error':
                return <Input icon="warning circle" color="red"
                              onChange={handleSearch}
                              value={searchUrl}
                              fluid type="text"/>;
            default:
                return (
                    <Input placeholder="Enter youtube url"
                           onChange={handleSearch}
                           value={searchUrl}
                           fluid type="text"/>
                );
        }
    }
}
