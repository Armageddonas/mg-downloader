import React, {Component} from 'react';

var fs = require('fs');
var youtubedl = require('youtube-dl');

const os = require('os');
var saveDir = os.homedir() + '/Downloads/';

var FfmpegCommand = require('fluent-ffmpeg');

// var util = require('util');
// var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
// var log_stdout = process.stdout;
//
// console.log = function(d) { //
//     log_file.write(util.format(d) + '\n');
//     log_stdout.write(util.format(d) + '\n');
// };

function SearchVideo(props) {
    return (
        <div>
            <p>info state: {props.loading == true ? 'loading...' : ''}</p>
            <input size="40" onChange={props.onChange} value={props.url} type="text"/>
        </div>
    );
}

function DownloadFolder(props) {
    return (
        <div>
            <h3>Settings</h3>
            <h4>Download path</h4>
            <input size="40" onChange={props.onChange} value={props.downloadPath} type="text"/>
        </div>
    );
}

function DownloadVideo(props) {
    return (
        <div>
            <input type="submit" onClick={props.onChange} value="download"/>
        </div>
    );
}

function InfoVideo(props) {
    if (props.info.title === undefined || props.info.title === '')
        return <h2>Info</h2>;

    return (
        <div>
            <h2>Info</h2>
            <h3>{props.info.title}</h3>
            <img src={props.info.thumbnail} alt="no image" width="120" height="120"/>
            <p>downloading state: {props.stateVideo}</p>
        </div>
    );
}


class DisplayContent extends Component {
    constructor(props) {
        super(props);
        // localStorage.clear();
        //todo: Check if path exists
        let downloadPathLS = JSON.parse(localStorage.getItem('downloadPath'));
        console.log(downloadPathLS);
        let downloadPath = downloadPathLS != null ? downloadPathLS : saveDir;

        this.state = {url: '', info: {}, stateVideo: '', loading: false, downloadPath: downloadPath};
        // this.state = {url: 'https://www.youtube.com/watch?v=90AiXO1pAiA', info: {}, stateVideo: ''};
        // setTimeout(() => {
        //     this.handleUrlSearch({target: {value: this.state.url}});
        // }, 100);


        this.handleUrlSearch = this.handleUrlSearch.bind(this);
        this.handleVideoDownload = this.handleVideoDownload.bind(this);
        this.downloadMp4 = this.downloadMp4.bind(this);
        this.downloadMp3 = this.downloadMp3.bind(this);
        this.convertToMp3 = this.convertToMp3.bind(this);
        this.handleDownloadFolder = this.handleDownloadFolder.bind(this);
    }

    handleUrlSearch(e) {
        let videoUrl = e.target.value;
        // Set info to loading
        let info = this.state.info;
        info.loading = true;
        this.setState({info: info});

        // Get video info
        console.log('Fetching video info');
        let self = this;
        this.setState({url: videoUrl});
        youtubedl.getInfo(videoUrl, [], function (err, info) {
            if (err) throw err;

            let videoInfo = {
                title: info.title,
                thumbnail: info.thumbnail,
                description: info.description,
                loading: false
            };

            self.setState({info: videoInfo})
        });
    }

    handleVideoDownload() {
        console.log('run download');
        this.setState({stateVideo: 'downloading video...'});

        this.downloadMp4(this.convertToMp3);
        // this.downloadMp3();
    }

    handleDownloadFolder(e) {
        localStorage.setItem('downloadPath', JSON.stringify(e.target.value));
        this.setState({downloadPath: e.target.value});
    }

    downloadMp4(onCompletion) {
        let self = this;
        let video = youtubedl(
            this.state.url,
            ['--format=18'],
            {cwd: ''}
        );

        video.on('info', function (info) {
            self.state.info.size = info.size;
        });

        video.pipe(fs.createWriteStream(this.state.downloadPath + 'temp.mp4'));

        video.on('end', function () {
            console.log('finished downloading!');
            self.setState({stateVideo: 'finished downloading'});
            onCompletion();
        });


        var pos = 0;
        video.on('data', function data(chunk) {
            pos += chunk.length;
            let size = self.state.info.size;
            if (size) {
                var percent = (pos / size * 100).toFixed(0);
                self.setState({stateVideo: 'percentage ' + percent + '%'});
            }
        });
    }

    // Deprecated
    downloadMp3(url) {
        let self = this;
        //Download to mp3
        youtubedl.exec(this.state.url, ['-x', '--audio-format', 'mp3'], {}, function (err, output) {
            if (err) throw err;
            console.log(output.join('\n'));
            self.setState({stateVideo: 'finished downloading'});
        });

    }

    convertToMp3() {
        this.setState({stateVideo: 'converting to mp3...'});

        // Load video file
        let proc = FfmpegCommand(this.state.downloadPath + '/temp.mp4');

        // Load ffmpeg binary
        if (os.platform() === 'win32') proc.setFfmpegPath(__dirname + '\\ffmpeg');
        // Convert to mp3
        let self = this;
        proc.saveToFile(this.state.downloadPath + this.state.info.title + '.mp3')
            .on('end', function () {
                    self.setState({stateVideo: 'converted mp3'});
                    console.log("converted mp3");
                }
            );
    }

    render() {
        return (
            <div>
                <SearchVideo onChange={this.handleUrlSearch} loading={this.state.info.loading} url={this.state.url}/>
                <DownloadVideo onChange={this.handleVideoDownload}/>
                <InfoVideo info={this.state.info} stateVideo={this.state.stateVideo} title="test" imagesrc=""/>
                <DownloadFolder onChange={this.handleDownloadFolder} downloadPath={this.state.downloadPath}/>
            </div>
        );
    }
}
export default DisplayContent;
