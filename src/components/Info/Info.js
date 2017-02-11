import React, {Component} from 'react';
import {Progress, Form, Icon, Image, List, Popup, Modal} from 'semantic-ui-react'

import videoTools from '../../tools/videoTools/videoTools'
const fs = require('fs');

class FormatPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {checked: 'audio'}
    }

    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Format</label>
                </Form.Field>
                <Form.Group inline>
                    <Form.Radio
                        radio
                        label='audio'
                        name='checkboxRadioGroup'
                        value='audio'
                        checked={this.props.format === 'audio'}
                        onChange={this.props.handleFormatCheckbox}
                    />
                    <Form.Radio
                        radio
                        label='video'
                        name='checkboxRadioGroup'
                        value='video'
                        checked={this.props.format === 'video'}
                        onChange={this.props.handleFormatCheckbox}
                    />
                    <Form.Radio
                        radio
                        label='both'
                        name='checkboxRadioGroup'
                        value='both'
                        checked={this.props.format === 'both'}
                        onChange={this.props.handleFormatCheckbox}
                    />
                </Form.Group>

            </Form>
        );
    }
}

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
                        <FormatPicker handleFormatCheckbox={this.props.handleFormatCheckbox}
                                      format={this.props.format}/>
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
                      onClick={props.handleVideoRemove}/>                }
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
        this.state = {percent: '0', format: 'audio'};

        this.videoFilename = this.props.downloadPath.value + '/' + this.props.video.title + '.mp4';
        this.audioFilename = this.props.downloadPath.value + '/' + this.props.video.title + '.mp3';

        this.handleVideoDownload = this.handleVideoDownload.bind(this);
        this.onMp3Completion = this.onMp3Completion.bind(this);
        this.onMp4GetPercentage = this.onMp4GetPercentage.bind(this);
        this.handleVideoRemove = this.handleVideoRemove.bind(this);
        this.handleFormatCheckbox = this.handleFormatCheckbox.bind(this);
    }

    handleVideoDownload() {
        // Disable download if folder doesn't exists
        if (!this.props.downloadPath.exists) return;
        console.log('run download');

        let onMp4Complete = null;
        if (this.state.format === 'audio' || this.state.format === 'both') {
            onMp4Complete = videoTools.convertToMp3(this.videoFilename, this.audioFilename, this.onMp4GetPercentage, this.onMp3Completion);
        }

        videoTools.downloadMp4(this.videoFilename, this.props.video.url, onMp4Complete, this.onMp4GetPercentage);
    }

    onMp3Completion() {
        this.setState({percent: 100});
        if (this.state.format !== 'both') fs.unlink(this.videoFilename);
    }

    onMp4GetPercentage(percentage) {
        this.setState({percent: percentage.toFixed(0)});
    }

    handleVideoRemove() {
        this.props.handleRemoveVideo(this.props.video.id);
    }

    handleFormatCheckbox(e, {value}) {
        this.setState({format: value});
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
                    <ItemSettings format={this.state.format} handleFormatCheckbox={this.handleFormatCheckbox}/>
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