import React, {Component} from 'react';
import {Image, List} from 'semantic-ui-react'

import videoTools from '../../../tools/videoTools/videoTools'
import DownloadIcon from "./downloadIcon";
import FolderIcon from "./folderIcon";
import RemoveIcon from "./removeIcon";
import ItemSettings from "./itemSettings";
import ProgressBar from "./progressBar";
import ErrorModal from "./errorModal";
import ItemStop from "./ItemStop";

const fs = require('fs');

const DownloadState = {
    INITIAL: 'INITIAL',
    DOWNLOADING: 'DOWNLOADING',
    CONVERTING: 'CONVERTING',
    FINISHED: 'FINISHED',
    ABORTED: 'ABORTED',
    REMOVED: 'REMOVED',
};

export default class InfoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {percent: 0, filename: this.props.video.title, path: null, downloadState: DownloadState.INITIAL};
        this.video = null;

        this.handleVideoDownload = this.handleVideoDownload.bind(this);
        this.onConvertCompletion = this.onConvertCompletion.bind(this);
        this.onGetPercentage = this.onGetPercentage.bind(this);
        this.handleFilename = this.handleFilename.bind(this);
        this.onPathChange = this.onPathChange.bind(this);
        this.onDownloadComplete = this.onDownloadComplete.bind(this);
        this.stopDownloading = this.stopDownloading.bind(this);
        this.handleRemoveVideo = this.handleRemoveVideo.bind(this);
    }

    handleVideoDownload() {
        console.log('run download...');
        // Get path
        let path = this.state.path || this.props.downloadPath;
        // Disable download if folder doesn't exists
        if (!fs.existsSync(path)) {
            this.refs['errorModal'].open();
            return;
        }

        this.setState({downloadState: DownloadState.DOWNLOADING});
        this.tempFilepath = path + '/' + this.state.filename.replace(/[!@#$%^&*\/\\]/g, '') + '.temp';

        this.video = videoTools.downloadFromServer(this.tempFilepath, this.props.video.url, this.onDownloadComplete, this.onGetPercentage);
    }

    onDownloadComplete() {
        const {DOWNLOADING, ABORTED, CONVERTING} = DownloadState;
        this.audioFilepath = path + '/' + this.state.filename.replace(/[!@#$%^&*\/\\]/g, '') + '.mp3';

        if (this.state.downloadState === DOWNLOADING) {
            this.setState({downloadState: CONVERTING});
            videoTools.convertToMp3(this.tempFilepath, this.audioFilepath, this.onGetPercentage, this.onConvertCompletion);
        }
        else if (this.state.downloadState === ABORTED) {
            this.setState({percent: 0, downloadState: DownloadState.INITIAL})
        }
    }

    onConvertCompletion() {
        this.setState({percent: 100, downloadState: DownloadState.FINISHED});
        fs.unlink(this.tempFilepath, (error) => {
            if (error) console.log(error);
        });
    }

    onGetPercentage(percentage) {
        if (this.state.downloadState !== DownloadState.DOWNLOADING) return;

        this.setState({percent: percentage.toFixed(0)});
    }

    handleFilename(value) {
        this.setState({filename: value});
    }

    onPathChange(path) {
        this.setState({path: path});
    }

    stopDownloading() {
        this.video._source.stream.abort();
        this.setState({downloadState: DownloadState.ABORTED});

        fs.unlink(this.tempFilepath, (error) => {
            if (error) console.log(error);
        });
    }

    handleRemoveVideo() {
        const {video, handleRemoveVideo} = this.props;

        this.video._source.stream.abort();
        fs.unlink(this.tempFilepath, (error) => {
            if (error) console.log(error);
        });
        this.setState({downloadState: DownloadState.REMOVED}, () => {
            handleRemoveVideo(video.id);
        });
    }

    render() {
        const {video, downloadPath} = this.props;
        const {filename, percent, path, downloadState} = this.state;
        const {DOWNLOADING, INITIAL, FINISHED} = DownloadState;

        let icon = null;
        switch (downloadState) {
            case INITIAL:
                icon = <DownloadIcon handleVideoDownload={this.handleVideoDownload}
                                     disabled={downloadState !== INITIAL}/>;
                break;
            case FINISHED:
                icon = <FolderIcon filepath={this.audioFilepath}/>;
                break;
            default:
                icon = <ItemStop stopDownloading={this.stopDownloading}
                                 disabled={downloadState !== DOWNLOADING || percent == 0}/>;
        }

        return (
            <List.Item style={{textAlign: 'left'}}>
                <List.Content floated='right'>
                    {icon}
                </List.Content>
                <List.Content floated='right'>
                    <RemoveIcon handleVideoRemove={this.handleRemoveVideo} disabled={downloadState === DOWNLOADING && percent == 0}/>
                </List.Content>
                <List.Content floated='right'>
                    <ItemSettings filename={filename} handleFilename={this.handleFilename}
                                  onPathChange={this.onPathChange}
                                  directory={path || downloadPath}
                                  disabled={downloadState !== INITIAL}/>
                </List.Content>
                <Image avatar src={video.thumbnail}/>
                <List.Content>
                    {filename}
                </List.Content>
                <List.Content>
                    <ErrorModal ref="errorModal"/>
                </List.Content>
                <ProgressBar percent={percent}/>
            </List.Item>
        );
    }
}
