import React, {Component} from 'react';

import InfoList from '../Info/infoList'
import SearchVideo from '../../containers/downloader/searchVideo'
import {findUniqueObjectPos} from '../../tools/utilities/arrayUtilities'

class DisplayContent extends Component {
    constructor(props) {
        super(props);
        this.state = {videos: []};

        this.handleRemoveVideo = this.handleRemoveVideo.bind(this);
    }

    handleRemoveVideo(id) {
        let index = findUniqueObjectPos(this.state.videos, 'id', id);
        this.state.videos.splice(index, 1);

        this.setState({videos: this.state.videos});
    }

    render() {
        return (
            <div>
                <SearchVideo url={this.state.url} videos={this.state.videos}/>
                <br/>
                <br/>
                <InfoList videos={this.props.videos} handleRemoveVideo={this.handleRemoveVideo}
                      downloadPath={this.props.downloadPath}/>
            </div>
        );
    }
}
export default DisplayContent;
