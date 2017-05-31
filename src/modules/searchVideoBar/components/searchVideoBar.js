import React, {Component} from 'react';
import {Input, Icon, Button} from 'semantic-ui-react'
const {clipboard} = require('electron');

export default class SearchVideoBar extends Component {
    constructor(props) {
        super(props);
        this.handleUrlSearch = this.handleUrlSearch.bind(this);
        this.pasteFromKeyboard = this.pasteFromKeyboard.bind(this);
    }

    handleUrlSearch(url) {
        // Get url from input
        let videoUrl = url;
        if(this.props.search.state === this.props.SearchStates.SEARCHING) return;

        this.props.handleInputUrl(videoUrl);
        this.props.requestVideoInfo(videoUrl);
    };

    pasteFromKeyboard(){
        this.handleUrlSearch(clipboard.readText());
    }

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
                   iconPosition='left'
                   loading={searching}
                   placeholder="Enter youtube url"
                   onChange={(e)=>{handleSearch(e.target.value)}}
                   value={searchUrl}
                   action={<Button type='submit' color="blue" disabled={searching} onClick={this.pasteFromKeyboard}>Paste</Button>}
                   fluid type="text"/>
        );
    }
}
