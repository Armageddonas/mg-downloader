import React, {Component} from 'react';
import {Progress, Icon, Image, List, Popup} from 'semantic-ui-react'
import videoTools from '../../tools/videoTools/videoTools'


class InfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {percent: '0'};

        this.handleVideoDownload = this.handleVideoDownload.bind(this);
        this.onMp3Completion = this.onMp3Completion.bind(this);
        this.onMp4GetPercentage = this.onMp4GetPercentage.bind(this);
        this.handleVideoRemove = this.handleVideoRemove.bind(this);
    }

    handleVideoDownload() {
        console.log('run download');

        let onMp4Complete = videoTools.convertToMp3(this.props.video, this.props.downloadPath.value, this.onMp3Completion);
        videoTools.downloadMp4(this.props.video, this.props.downloadPath.value, onMp4Complete, this.onMp4GetPercentage);
    }

    onMp3Completion() {
        this.setState({percent: 100});
    }

    onMp4GetPercentage(percentage) {
        this.setState({percent: percentage});
    }

    handleVideoRemove() {
        this.props.handleRemoveVideo(this.props.video.id);
    }

    render() {
        if (this.props.video.loading)
            return (
                <p>loading...</p>
            );

        let elDownloadIcon = (
            <Popup
                trigger={
                    <Icon name='download' size='large' color="blue"
                          link={this.props.downloadPath.exists}
                          disabled={!this.props.downloadPath.exists}
                          onClick={this.props.downloadPath.exists && this.handleVideoDownload}/>
                }
                content='Download'
            />
        );

        let elRemoveIcon = (
            <Popup
                trigger={
                    <Icon link name='remove' size='large' color="red"
                          onClick={this.handleVideoRemove}/>                }
                content='Remove from list'
            />
        );

        let elProgress = (
            <Progress progress color='green'
                      percent={this.state.percent}
                      indicating={(this.state.percent != 0) && (this.state.percent != 100)}/>
        );

        return (
            <List.Item style={{textAlign: 'left'}}>
                <List.Content floated='right'>
                    {elDownloadIcon}
                </List.Content>
                <List.Content floated='right'>
                    {elRemoveIcon}
                </List.Content>
                <Image avatar src={this.props.video.thumbnail}/>
                <List.Content>
                    {this.props.video.title}
                </List.Content>
                {elProgress}
            </List.Item>
        );
    }
}

function InfoList(props) {

    const listItems = props.videos.map((video) =>
        <InfoItem key={video.id} video={video}
                  downloadPath={props.downloadPath}
                  handleRemoveVideo={props.handleRemoveVideo}/>);

    return (
        <List divided ordered size="large">
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
                <InfoList videos={this.props.videos}
                          downloadPath={this.props.downloadPath}
                          handleRemoveVideo={this.props.handleRemoveVideo}/>
            </div>
        );
    }
}

export default Info;