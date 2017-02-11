import React, {Component} from 'react';
import {Input} from 'semantic-ui-react'

import Info from '../Info/Info'
import videoTools from '../../tools/videoTools/videoTools'
import {findUniqueObjectPos} from '../../tools/utilities/arrayUtilities'

function validateYouTubeUrl(ytUrl) {
    let url = ytUrl;
    if (url != undefined || url != '') {
        let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        let match = url.match(regExp);
        if (match && match[2].length == 11) {
            return true;
        }
        else {
            return false;
        }
    }
}

function SearchVideo(props) {
    return (
        <Input fluid onChange={props.onChange} value={props.url} type="text"/>
    );
}

class DisplayContent extends Component {
    constructor(props) {
        super(props);
        this.state = {url: '', videos: [], stateVideo: ''};
        // this.state = {url: 'https://www.youtube.com/watch?v=90AiXO1pAiA', videos: [], stateVideo: ''};
        // setTimeout(() => {
        //     this.handleUrlSearch({target: {value: this.state.url}});
        // }, 100);


        this.handleUrlSearch = this.handleUrlSearch.bind(this);
        this.handleRemoveVideo = this.handleRemoveVideo.bind(this);
        this.onInfoFound = this.onInfoFound.bind(this);
        this.onInfoError = this.onInfoError.bind(this);
    }

    handleUrlSearch(e) {
        // Get url from input
        let videoUrl = e.target.value;
        this.setState({url: videoUrl});

        // Check if url is valid and if it already exists in the list
        if (!validateYouTubeUrl(videoUrl) || findUniqueObjectPos(this.state.videos, 'url', videoUrl) > -1) return;

        // Set info to loading
        let info = {};
        info.loading = true;
        info.url = videoUrl;
        this.setState({videos: this.state.videos.concat([info])});

        videoTools.getInfo(videoUrl, this.onInfoFound, this.onInfoError);
    }

    onInfoFound(videoInfo) {
        let index = findUniqueObjectPos(this.state.videos, 'url', videoInfo.url);
        this.state.videos.splice(index, 1, videoInfo);
        this.setState({videos: this.state.videos});
    }

    onInfoError(url) {
        let index = findUniqueObjectPos(this.state.videos, 'url', url);
        this.state.videos.splice(index, 1);
        this.setState({videos: this.state.videos});
        // todo: add toast
    }

    handleRemoveVideo(id) {
        let index = findUniqueObjectPos(this.state.videos, 'id', id);
        this.state.videos.splice(index, 1);

        this.setState({videos: this.state.videos});
    }

    render() {
        return (
            <div>
                <SearchVideo onChange={this.handleUrlSearch} url={this.state.url}/>
                <br/>
                <br/>
                <Info videos={this.state.videos} handleRemoveVideo={this.handleRemoveVideo} downloadPath={this.props.downloadPath}/>
            </div>
        );
    }
}
export default DisplayContent;
