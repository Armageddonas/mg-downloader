import React, {Component} from 'react';
import {Progress, Input, Icon, Image, List, Popup, Modal, Grid} from 'semantic-ui-react'

import {DirectoryPicker} from '../settings/settings'

import videoTools from '../../tools/videoTools/videoTools'
const fs = require('fs');
const {shell} = require('electron');

function Rename(props) {
    return (
        <Input fluid label="filename" value={props.filename} onChange={props.handleFilename}/>
    );
}

class ItemSettings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.disabled === true) return <Icon name='setting' size='large' color="black"
                                                       className="animated fadeOut"/>;

        return (
            <Modal size='small' trigger={<Icon link name='setting' size='large' color="black"/>}>
                <Modal.Header style={{textAlign: 'center'}}>Item settings</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Grid columns='equal'>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column computer={8} tablet={10} mobile={16}>
                                <Rename filename={this.props.filename} handleFilename={this.props.handleFilename}/>
                                <DirectoryPicker onPathChange={this.props.onPathChange}
                                                 directory={this.props.directory}/>
                            </Grid.Column>
                            <Grid.Column>
                            </Grid.Column>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

class DownloadIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {clicked: false};

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        if (this.state.clicked == true) return;
        this.setState({clicked: true});

        this.props.handleVideoDownload();
    }

    render() {
        let enabled = this.props.downloadPath.exists && !this.state.clicked;

        return (
            <Popup
                trigger={
                    <Icon name='download' size='large' color="blue"
                          link={enabled}
                          disabled={!enabled}
                          onClick={this.handleOnClick}/>
                }
                content='Download'
            />
        );
    }
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

class FolderIcon extends Component {
    constructor(props) {
        super(props);

        this.launchFolder = this.launchFolder.bind(this);
    }

    launchFolder() {
        console.log(this.props.filepath);
        shell.showItemInFolder(this.props.filepath);
    }

    render() {
        return (
            <Popup
                trigger={
                    <Icon link name='folder open' size='large' color="blue" className="animated bounceIn"
                          onClick={this.launchFolder}/>
                }
                content='Open containing folder'
            />
        );
    }
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
        this.state = {percent: 0, filename: this.props.video.title, path: null};

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
        // Get paths
        let path = this.state.path || this.props.downloadPath.value;
        this.tempFilepath = path + '/' + this.state.filename + '.temp';
        this.audioFilepath = path + '/' + this.state.filename + '.mp3';

        let onDownloadComplete = videoTools.convertToMp3(this.tempFilepath, this.audioFilepath, this.onGetPercentage, this.onMp3Completion);

        videoTools.downloadFromServer(this.tempFilepath, this.props.video.url, onDownloadComplete, this.onGetPercentage);
    }

    onMp3Completion() {
        this.setState({percent: 100});
        fs.unlink(this.tempFilepath);
    }

    onGetPercentage(percentage) {
        this.setState({percent: percentage.toFixed(0)});
    }

    handleVideoRemove() {
        this.props.handleRemoveVideo(this.props.video.id);
    }

    handleFilename(e) {
        this.setState({filename: e.target.value});
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
                                  directory={this.props.path || this.props.downloadPath.value}
                                  disabled={this.state.percent > 0}/>
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