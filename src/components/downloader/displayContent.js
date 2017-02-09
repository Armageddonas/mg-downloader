import React, {Component} from 'react';
import Info from '../Info/Info'
var youtubedl = require('youtube-dl');
import { Input } from 'semantic-ui-react'


function validateYouTubeUrl(yturl)
{
    var url = yturl;
    if (url != undefined || url != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
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
        // this.state = {url: '', videos: [], stateVideo: ''};
        this.state = {url: 'https://www.youtube.com/watch?v=90AiXO1pAiA', videos: [], stateVideo: ''};
        setTimeout(() => {
            this.handleUrlSearch({target: {value: this.state.url}});
        }, 100);


        this.handleUrlSearch = this.handleUrlSearch.bind(this);
        this.handleRemoveVideo = this.handleRemoveVideo.bind(this);
    }

    handleUrlSearch(e) {
        // Get url from input
        let videoUrl = e.target.value;
        this.setState({url: videoUrl});

        // Check if url is valid and if it already exists in the list
        if (!validateYouTubeUrl(videoUrl) || this.findIndexByUrl(videoUrl) > -1) return;

        // Set info to loading
        let index = this.state.videos.length;
        let info = {};
        info.loading = true;
        this.setState({videos: this.state.videos.concat([info])});

        // Get video info
        console.log('Fetching video info');
        let self = this;
        youtubedl.getInfo(videoUrl, [], function (err, info) {
            if (err) {
                self.state.videos.splice(index, 1);
                throw err;
            }

            let videoInfo = {
                title: info.title,
                thumbnail: info.thumbnail,
                description: info.description,
                id: info.id,
                url: videoUrl,
                loading: false
            };

            self.state.videos.splice(index, 1, videoInfo);
            self.setState({videos: self.state.videos});
        });
    }

    findIndexByUrl(url) {
        let pos = -1;
        for (var i = 0; i < this.state.videos.length; i++) {
            if (this.state.videos[i].url === url) {
                pos = i;
                break;
            }
        }
        return pos
    }

    handleRemoveVideo(id) {
        let pos = -1;
        for (var i = 0; i < this.state.videos.length; i++) {
            if (this.state.videos[i].id === id) {
                pos = i;
                break;
            }
        }
        this.state.videos.splice(pos, 1);

        this.setState({videos: this.state.videos});
    }


    render() {
        return (
            <div>
                <SearchVideo onChange={this.handleUrlSearch} url={this.state.url}/>
                <br/>
                <br/>
                <Info videos={this.state.videos} handleRemoveVideo={this.handleRemoveVideo}/>
            </div>
        );
    }
}
export default DisplayContent;
