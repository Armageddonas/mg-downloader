import React, {Component} from 'react';
import {Progress, Icon, Image, List} from 'semantic-ui-react'
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

        return (
            <List.Item style={{textAlign: 'left'}}>
                <List.Content floated='right'>
                    <Icon onClick={this.props.downloadPath.exists && this.handleVideoDownload}
                          link={this.props.downloadPath.exists} name='download' size='large' color="blue"
                          disabled={!this.props.downloadPath.exists}/>
                </List.Content>
                <List.Content floated='right'>
                    <Icon onClick={this.handleVideoRemove} link name='remove' size='large' color="red"/>
                </List.Content>
                <Image avatar src={this.props.video.thumbnail}/>
                <List.Content>
                    {this.props.video.title}
                </List.Content>
                <Progress percent={this.state.percent} progress
                          indicating={(this.state.percent != 0) && (this.state.percent != 100)} color='green'/>
            </List.Item>
        );
    }
}

function InfoList(props) {

    const listItems = props.videos.map((video) =>
        <InfoItem key={video.id} video={video} handleRemoveVideo={props.handleRemoveVideo}
                  downloadPath={props.downloadPath}/>);

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
                <InfoList videos={this.props.videos} handleRemoveVideo={this.props.handleRemoveVideo}
                          downloadPath={this.props.downloadPath}/>
            </div>
        );
    }
}

export default Info;