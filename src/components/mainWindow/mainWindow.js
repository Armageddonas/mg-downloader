import React, {Component} from 'react';
import {Sidebar, Segment, Grid, Menu, Header, Icon, Container} from 'semantic-ui-react'
import DisplayContent from '../downloader/displayContent'
import Settings from '../settings/settings'

const os = require('os');
var saveDir = os.homedir() + '/Downloads/';

class MainWindow extends Component {
    constructor(props) {
        super(props);
        // localStorage.clear();
        //todo: Check if path exists
        let downloadPathLS = JSON.parse(localStorage.getItem('downloadPath'));
        let downloadPath = downloadPathLS != null ? downloadPathLS : saveDir;
        this.state = {downloadPath: downloadPath, visible: false};

        this.handleDownloadFolder = this.handleDownloadFolder.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    handleDownloadFolder(e) {
        localStorage.setItem('downloadPath', JSON.stringify(e.target.value));
        this.setState({downloadPath: e.target.value});
    }

    toggleVisibility() {
        this.setState({visible: !this.state.visible});
    }

    render() {
        const {visible} = this.state;

        return (
            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    width='wide'
                    direction='right'
                    visible={visible}
                    icon='labeled'
                    vertical
                    inverted
                >
                    <Menu.Item name='path'>
                        <Settings onPathChange={this.handleDownloadFolder} downloadPath={this.state.downloadPath}/>
                    </Menu.Item>
                    <Menu.Item name='arrowleft'>
                        <Icon onClick={this.toggleVisibility} name='left arrow'/>
                        Back
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                    <Segment basic>
                        <Grid centered>
                            <Grid.Column mobile={16} tablet={14} computer={8}>
                                <br/>
                                <Grid columns='equal' centered>
                                    <Grid.Column>
                                        <Header as="h1">MG Downloader</Header>
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Icon name="settings" onClick={this.toggleVisibility}/>
                                    </Grid.Column>
                                    {/*<Header textAlign="center" as="h1">MG Downloader</Header>*/}
                                    {/*<Icon name="settings" onClick={this.toggleVisibility}/>*/}
                                </Grid>
                                <br/>
                                <DisplayContent downloadPath={this.state.downloadPath}/>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default MainWindow;