import React, {Component} from 'react';
import {Image, List} from 'semantic-ui-react'

import videoTools from '../../../tools/videoTools/videoTools'
import DownloadIcon from "./downloadIcon";
import FolderIcon from "./folderIcon";
import RemoveIcon from "./removeIcon";
import ItemSettings from "./itemSettings";
import ProgressBar from "./progressBar";
import ErrorModal from "./errorModal";

const fs = require('fs');

const DownloadState = {
    INITIAL: 'INITIAL',
    DOWNLOADING: 'DOWNLOADING',
    FINISHED: 'FINISHED',
};

export default class InfoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {percent: 0, filename: this.props.video.title, path: null, downloadState: DownloadState.INITIAL};

        this.handleVideoDownload = this.handleVideoDownload.bind(this);
        this.onMp3Completion = this.onMp3Completion.bind(this);
        this.onGetPercentage = this.onGetPercentage.bind(this);
        this.handleFilename = this.handleFilename.bind(this);
        this.onPathChange = this.onPathChange.bind(this);
    }

    handleVideoDownload() {
        console.log('run download...');
        // Get path
        let path = this.state.path || this.props.downloadPath;
        // Disable download if folder doesn't exists
        if(!fs.existsSync(path)){
            this.refs['errorModal'].open();
            return;
        }

        this.setState({downloadState: DownloadState.DOWNLOADING});
        this.tempFilepath = path + '/' + this.state.filename.replace(/[!@#$%^&*\/\\]/g, '') + '.temp';
        this.audioFilepath = path + '/' + this.state.filename.replace(/[!@#$%^&*\/\\]/g, '') + '.mp3';

        let onDownloadComplete = videoTools.convertToMp3(this.tempFilepath, this.audioFilepath, this.onGetPercentage, this.onMp3Completion);

        videoTools.downloadFromServer(this.tempFilepath, this.props.video.url, onDownloadComplete, this.onGetPercentage);
    }

    onMp3Completion() {
        this.setState({percent: 100, downloadState: DownloadState.FINISHED});
        fs.unlink(this.tempFilepath, (error) => {
            if (error) console.log(error);
        });
    }

    onGetPercentage(percentage) {
        this.setState({percent: percentage.toFixed(0)});
    }

    handleFilename(value) {
        this.setState({filename: value});
    }

    onPathChange(path) {
        this.setState({path: path});
    }

    render() {
        const {video, handleRemoveVideo, downloadPath} = this.props;
        const {filename, percent, path, downloadState} = this.state;
        const {DOWNLOADING, INITIAL, FINISHED} = DownloadState;

        return (
            <List.Item style={{textAlign: 'left'}}>
                <List.Content floated='right'>
                    {
                        downloadState !== FINISHED?
                            <DownloadIcon handleVideoDownload={this.handleVideoDownload}
                                          disabled={downloadState !== INITIAL}/>
                            :
                            <FolderIcon filepath={this.audioFilepath}/>
                    }
                </List.Content>
                <List.Content floated='right'>
                    <RemoveIcon handleVideoRemove={() => handleRemoveVideo(video.id)}
                                disabled={downloadState === DOWNLOADING}/>
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
