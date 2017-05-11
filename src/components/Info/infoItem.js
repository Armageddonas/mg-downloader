import React, {Component} from 'react';
import {Image, List} from 'semantic-ui-react'

import videoTools from '../../tools/videoTools/videoTools'
import DownloadIcon from "./downloadIcon";
import FolderIcon from "./folderIcon";
import RemoveIcon from "./removeIcon";
import ItemSettings from "./itemSettings";
import ProgressBar from "./progressBar";

const fs = require('fs');

export default class InfoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {percent: 0, filename: this.props.video.title, path: null, downloadPressed: false};

        this.handleVideoDownload = this.handleVideoDownload.bind(this);
        this.onMp3Completion = this.onMp3Completion.bind(this);
        this.onGetPercentage = this.onGetPercentage.bind(this);
        this.handleVideoRemove = this.handleVideoRemove.bind(this);
        this.handleFilename = this.handleFilename.bind(this);
        this.onPathChange = this.onPathChange.bind(this);
    }

    handleVideoDownload() {
        // Disable download if folder doesn't exists
        if (!this.props.downloadPath.exists) return;
        console.log('run download');

        this.setState({downloadPressed: true});
        // Get paths
        let path = this.state.path || this.props.downloadPath.value;
        this.tempFilepath = path + '/' + this.state.filename.replace(/[!@#$%^&*\/\\]/g, '') + '.temp';
        this.audioFilepath = path + '/' + this.state.filename.replace(/[!@#$%^&*\/\\]/g, '') + '.mp3';

        let onDownloadComplete = videoTools.convertToMp3(this.tempFilepath, this.audioFilepath, this.onGetPercentage, this.onMp3Completion);

        videoTools.downloadFromServer(this.tempFilepath, this.props.video.url, onDownloadComplete, this.onGetPercentage);
    }

    onMp3Completion() {
        this.setState({percent: 100});
        fs.unlink(this.tempFilepath, (error) => {
            if (error) console.log(error);
        });
    }

    onGetPercentage(percentage) {
        this.setState({percent: percentage.toFixed(0)});
    }

    handleVideoRemove() {
        this.props.handleRemoveVideo(this.props.video.id);
    }

    handleFilename(value) {
        this.setState({filename: value});
    }

    onPathChange(path) {
        this.setState({path: path});
    }

    render() {
        if (this.props.video.loading)
            return null;

        return (
            <List.Item style={{textAlign: 'left'}}>
                <List.Content floated='right'>
                    {
                        this.state.percent < 100 ?
                            <DownloadIcon downloadPath={this.props.downloadPath}
                                          handleVideoDownload={this.handleVideoDownload}/>
                            :
                            <FolderIcon filepath={this.audioFilepath}/>
                    }
                </List.Content>
                <List.Content floated='right'>
                    <RemoveIcon handleVideoRemove={this.handleVideoRemove}/>
                </List.Content>
                <List.Content floated='right'>
                    <ItemSettings filename={this.state.filename} handleFilename={this.handleFilename}
                                  onPathChange={this.onPathChange}
                                  directory={this.state.path || this.props.downloadPath.value}
                                  disabled={this.state.downloadPressed}/>
                </List.Content>
                <Image avatar src={this.props.video.thumbnail}/>
                <List.Content>
                    {this.state.filename}
                </List.Content>
                <ProgressBar percent={this.state.percent}/>
            </List.Item>
        );
    }
}
