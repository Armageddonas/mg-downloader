import React, {Component} from 'react';
import { Progress, Icon, Button, Image, List } from 'semantic-ui-react'

var fs = require('fs');
var youtubedl = require('youtube-dl');

const os = require('os');
var FfmpegCommand = require('fluent-ffmpeg');

class InfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {stateVideo: '', size: '', percent: '0'};

        var saveDir = os.homedir() + '/Downloads/';

        let downloadPathLS = JSON.parse(localStorage.getItem('downloadPath'));
        this.downloadPath = downloadPathLS != null ? downloadPathLS : saveDir;

        this.handleVideoDownload = this.handleVideoDownload.bind(this);
        this.downloadMp4 = this.downloadMp4.bind(this);
        this.convertToMp3 = this.convertToMp3.bind(this);
        this.handleVideoRemove = this.handleVideoRemove.bind(this);
    }

    handleVideoDownload() {
        console.log('run download');

        this.downloadMp4(this.convertToMp3);
    }

    handleVideoRemove() {
        this.props.handleRemoveVideo(this.props.video.id);
    }

    downloadMp4(onCompletion) {
        let self = this;
        this.setState({stateVideo: 'downloading video...'});
        this.setState({percent: 0});

        // Video config
        let video = youtubedl(
            this.props.video.url,
            ['--format=18'],
            {cwd: ''}
        );

        // Get video size
        video.on('info', function (info) {
            self.state.size = info.size;
        });

        // Save video
        video.pipe(fs.createWriteStream(this.downloadPath + '/' + this.props.video.id + '.mp4'));

        // Sense end of downloading
        video.on('end', function () {
            console.log('finished downloading!');
            self.setState({stateVideo: 'finished downloading'});
            onCompletion();
        });

        // Calculate percentage downloaded
        var pos = 0;
        video.on('data', function data(chunk) {
            pos += chunk.length;
            let size = self.state.size;
            if (size) {
                var percent = (pos / size * 100).toFixed(0);
                // Scale down to 80%
                percent = (percent * 0.90).toFixed(0);
                self.setState({percent: percent});
            }
        });
    }

    convertToMp3() {
        this.setState({stateVideo: 'converting to mp3...'});

        // Load video file
        let proc = FfmpegCommand(this.downloadPath + '/' + this.props.video.id + '.mp4');

        // Load ffmpeg binary
        if (os.platform() === 'win32') proc.setFfmpegPath(__dirname + '\\ffmpeg');

        // Convert to mp3
        let self = this;
        proc.saveToFile(this.downloadPath + this.props.video.title + '.mp3')
            .on('end', function () {
                    self.setState({stateVideo: 'converted mp3'});
                    self.setState({percent: 100});
                    console.log("converted mp3");
                }
            );
    }

    render() {
        if (this.props.video.loading)
            return (
                <p>loading...</p>
            );

        return (
            <List.Item style={{textAlign:'left'}}>
                <List.Content floated='right'>
                    <Icon onClick={this.handleVideoDownload} name='download' size='large'/>
                </List.Content>
                <List.Content floated='right'>
                    <Icon onClick={this.handleVideoRemove} name='remove' size='large'/>
                </List.Content>
                <Image avatar src={this.props.video.thumbnail} />
                <List.Content>
                    {this.props.video.title}
                </List.Content>
                <Progress percent={this.state.percent} progress indicating={(this.state.percent!=0) && (this.state.percent!=100)} color='green'/>
            </List.Item>
        );
    }
}

function InfoList(props) {

    const listItems = props.videos.map((video) =>
        // Correct! Key should be specified inside the array.
        <InfoItem key={video.id} video={video} handleRemoveVideo={props.handleRemoveVideo}/>);

    return (
        <List divided verticalAlign='middle' size="large">
            {listItems}
        </List>
    );
}

class Info extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        if (this.props.videos.size == 0)
            return <h2>Info</h2>;

        return (
            <div>
                <InfoList videos={this.props.videos} handleRemoveVideo={this.props.handleRemoveVideo}/>
            </div>
        );
    }
}

export default Info;