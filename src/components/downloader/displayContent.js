import React, {Component} from 'react';

import InfoList from '../Info/infoList'
import SearchVideo from './searchVideo'
import {findUniqueObjectPos} from '../../tools/utilities/arrayUtilities'

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
