import React, {Component} from 'react';
import {Sidebar, Segment, Grid, Menu, Header, Icon, Message} from 'semantic-ui-react'

import DisplayContent from './mainContent'
import NavContent from '../containers/navContent'
import fileManager from '../../../tools/fileManager/fileManager'
import TitleBar from './titlebar';
import Overlay from './overlay';
import YtdlUpdater from './ytdlUpdater';

class MainWindow extends Component {
    constructor(props) {
        super(props);
        let dlPath = fileManager.getDownloadPath();
        // todo: move sidebar to separate component
        this.state = {visible: false};
        this.props.setDownloadPath(dlPath.value);

        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility() {
        this.setState({visible: !this.state.visible});
    }

    render() {
        const {visible} = this.state;

        return (
            <span>
                <TitleBar/>
                <Overlay/>
                <Sidebar.Pushable style={{margin:0, border:0}} as={Segment}>
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
                            <NavContent/>
                        </Menu.Item>
                        <Menu.Item name='back'>
                            <Icon onClick={this.toggleVisibility} link name='left arrow'/>
                            Back
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>

                            <Grid centered>
                                <Grid.Column mobile={16} tablet={14} computer={12}>
                                    <br/>
                                    <Grid columns='equal'>
                                        <Grid.Row>
                                            <Grid.Column textAlign="center">
                                                <Header as="h1">MeGa Downloader</Header>
                                            </Grid.Column>
                                            <Grid.Column mobile={1} tablet={1} computer={1}>
                                                <YtdlUpdater name="settings" size="large" onClick={this.toggleVisibility}/>
                                            </Grid.Column>
                                            <Grid.Column mobile={1} tablet={1} computer={1}>
                                                <Icon name="settings" size="large" onClick={this.toggleVisibility}/>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    <br/>
                                    <br/>
                                    <DisplayContent/>
                                </Grid.Column>
                            </Grid>

                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </span>
        );
    }
}

export default MainWindow;