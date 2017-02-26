import React, {Component} from 'react';
import {Input} from 'semantic-ui-react'

import InfoList from '../Info/Info'
import videoTools from '../../tools/videoTools/videoTools'
import {findUniqueObjectPos} from '../../tools/utilities/arrayUtilities'

function validateYouTubeUrl(ytUrl) {
    let url = ytUrl;
    if (url != undefined || url != '') {
        let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        let match = url.match(regExp);
        return (match && match[2].length == 11);
    }
}

class SearchVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {url: '', searchState: null};
        // setTimeout(() => {
        //     this.handleUrlSearch({target: {value: 'https://www.youtube.com/watch?v=90AiXO1pAiA'}});
        // }, 100);

        this.handleUrlSearch = this.handleUrlSearch.bind(this);
        this.onInfoFound = this.onInfoFound.bind(this);
        this.onInfoError = this.onInfoError.bind(this);
    }

    handleUrlSearch(e) {
        // Get url from input
        let videoUrl = e.target.value;
        this.setState({url: videoUrl});

        // Check if url is valid and if it already exists in the list
        if (!validateYouTubeUrl(videoUrl) || findUniqueObjectPos(this.props.videos, 'url', videoUrl) > -1) {
            this.setState({searchState: 'error'});
            return;
        }

        // Set info to loading
        this.props.onVideoLoading(videoUrl);
        this.setState({searchState: 'searching'});

        videoTools.getInfo(videoUrl, this.onInfoFound, this.onInfoError);
    }

    onInfoFound(videoInfo){
        this.setState({searchState: 'found', url: ''});
        this.props.onInfoFound(videoInfo);
    }

    onInfoError(url) {
        this.setState({searchState: 'error'});
        this.props.onInfoError(url);
    }

    render() {
        if (this.state.searchState === 'searching')
            return <Input fluid icon='user' loading={this.state.searchState === 'searching'} readOnly
                          onChange={this.handleUrlSearch}
                          value={this.state.url}
                          type="text"/>;
        else if (this.state.searchState === 'found')
            return <Input fluid icon="check" color="green" onChange={this.handleUrlSearch} value={this.state.url}
                          type="text"/>;
        else if (this.state.searchState === 'error')
            return <Input fluid icon="warning circle" color="red" onChange={this.handleUrlSearch}
                          value={this.state.url} type="text"/>;

        return (
            <Input fluid onChange={this.handleUrlSearch} value={this.state.url} type="text"
                   placeholder="Enter youtube url"/>
        );
    }
}

class DisplayContent extends Component {
    constructor(props) {
        super(props);
        this.state = {videos: []};

        this.handleRemoveVideo = this.handleRemoveVideo.bind(this);
        this.onInfoFound = this.onInfoFound.bind(this);
        this.onInfoError = this.onInfoError.bind(this);
        this.onVideoLoading = this.onVideoLoading.bind(this);
    }

    onVideoLoading(videoUrl) {
        let info = {};
        info.loading = true;
        info.url = videoUrl;
        this.setState({videos: this.state.videos.concat([info])});
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
    }

    handleRemoveVideo(id) {
        let index = findUniqueObjectPos(this.state.videos, 'id', id);
        this.state.videos.splice(index, 1);

        this.setState({videos: this.state.videos});
    }

    render() {
        return (
            <div>
                <SearchVideo onInfoFound={this.onInfoFound} onInfoError={this.onInfoError}
                             onVideoLoading={this.onVideoLoading} url={this.state.url} videos={this.state.videos}/>
                <br/>
                <br/>
                <InfoList videos={this.state.videos} handleRemoveVideo={this.handleRemoveVideo}
                      downloadPath={this.props.downloadPath}/>
            </div>
        );
    }
}
export default DisplayContent;
