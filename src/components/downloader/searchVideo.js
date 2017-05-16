import React, {Component} from 'react';
import {Input, Icon} from 'semantic-ui-react'

export default class SearchVideo extends Component {
    constructor(props) {
        super(props);
        this.handleUrlSearch = this.handleUrlSearch.bind(this);
    }

    handleUrlSearch(e) {
        // Get url from input
        let videoUrl = e.target.value;
        if(this.props.search.state === this.props.SearchStates.SEARCHING) return;

        this.props.handleInputUrl(videoUrl);
        this.props.requestVideoInfo(videoUrl);
    };

    render() {
        let handleSearch = this.handleUrlSearch;
        let searchUrl = this.props.search.url || '';
        let searchState = this.props.search.state;
        let StateList = this.props.SearchStates;

        let searchIcon = null;
        let searching = false;

        switch (searchState) {
            case StateList.SEARCHING:
                searchIcon = <Icon name="user"/>;
                searching = true;
                break;
            case StateList.FOUND:
                searchIcon = <Icon name="check" color="green"/>;
                break;
            case StateList.ERROR:
                searchIcon = <Icon name="warning circle" color="red"/>;
                break;
        }

        return (
            <Input icon={searchIcon}
                   loading={searching}
                   placeholder="Enter youtube url"
                   onChange={handleSearch}
                   value={searchUrl}
                   fluid type="text"/>
        );
    }
}
