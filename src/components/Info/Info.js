import React, {Component} from 'react';
import {Progress, Form, Icon, Image, List, Popup, Modal} from 'semantic-ui-react'

import videoTools from '../../tools/videoTools/videoTools'
const fs = require('fs');

class ItemSettings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal trigger={<Icon link name='setting' size='large' color="black"/>}>
                <Modal.Header>Item settings</Modal.Header>
                <Modal.Content>
                    <Modal.Description>

                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

function DownloadIcon(props) {
    return (
        <Popup
            trigger={
                <Icon name='download' size='large' color="blue"
                      link={props.downloadPath.exists}
                      disabled={!props.downloadPath.exists}
                      onClick={props.handleVideoDownload}/>
            }
            content='Download'
        />
    );
}

function RemoveIcon(props) {
    return (
        <Popup
            trigger={
                <Icon link name='remove' size='large' color="red"
                      onClick={props.handleVideoRemove}/>
            }
            content='Remove from list'
        />
    );
}

function ProgressBar(props) {
    return (
        <Progress progress color='green'
                  percent={props.percent}
                  indicating={(props.percent != 0) && (props.percent != 100)}/>
    );
}

class InfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {percent: '0'};

        this.handleVideoDownload = this.handleVideoDownload.bind(this);
        this.onMp3Completion = this.onMp3Completion.bind(this);
        this.onGetPercentage = this.onGetPercentage.bind(this);
        this.handleVideoRemove = this.handleVideoRemove.bind(this);
    }

    handleVideoDownload() {
        // Disable download if folder doesn't exists
        if (!this.props.downloadPath.exists) return;
        console.log('run download');
        // Get paths
        this.tempFilename = this.props.downloadPath.value + '/' + this.props.video.title + '.temp';
        this.audioFilename = this.props.downloadPath.value + '/' + this.props.video.title + '.mp3';

        let onDownloadComplete = videoTools.convertToMp3(this.tempFilename, this.audioFilename, this.onGetPercentage, this.onMp3Completion);

        videoTools.downloadFromServer(this.tempFilename, this.props.video.url, onDownloadComplete, this.onGetPercentage);
    }

    onMp3Completion() {
        this.setState({percent: 100});
        fs.unlink(this.tempFilename);
    }

    onGetPercentage(percentage) {
        this.setState({percent: percentage.toFixed(0)});
    }

    handleVideoRemove() {
        this.props.handleRemoveVideo(this.props.video.id);
    }

    render() {
        if (this.props.video.loading)
            return (
                <p>loading...</p>
            );

        return (
            <List.Item style={{textAlign: 'left'}}>
                <List.Content floated='right'>
                    <DownloadIcon downloadPath={this.props.downloadPath}
                                  handleVideoDownload={this.handleVideoDownload}/>
                </List.Content>
                <List.Content floated='right'>
                    <ItemSettings/>
                </List.Content>
                <List.Content floated='right'>
                    <RemoveIcon handleVideoRemove={this.handleVideoRemove}/>
                </List.Content>
                <Image avatar src={this.props.video.thumbnail}/>
                <List.Content>
                    {this.props.video.title}
                </List.Content>
                <ProgressBar percent={this.state.percent}/>
            </List.Item>
        );
    }
}

function InfoList(props) {

    const listItems = props.videos.map((video) =>
        <InfoItem key={video.id || video.url}
                  video={video}
                  downloadPath={props.downloadPath}
                  handleRemoveVideo={props.handleRemoveVideo}/>);

    return (
        <List divided ordered size="large">
            {listItems}
        </List>
    );
}

function Info(props) {
    if (props.videos.size == 0)
        return <h2>Info</h2>;

    return (
        <div>
            <InfoList videos={props.videos}
                      downloadPath={props.downloadPath}
                      handleRemoveVideo={props.handleRemoveVideo}/>
        </div>
    );
}

export default Info;