import React, {Component} from 'react';
import {Sidebar, Segment, Grid, Menu, Header, Icon, Message} from 'semantic-ui-react'

import DisplayContent from '../../containers/downloader/displayContent'
import NavContent from '../../containers/mainWindow/navContent'
import fileManager from '../../tools/fileManager/fileManager'

class MainWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {downloadPath: fileManager.getDownloadPath(), visible: false};
        this.props.setDownloadPath(this.state.downloadPath.value);

        this.toggleVisibility = this.toggleVisibility.bind(this);
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
                            <Grid.Column mobile={16} tablet={14} computer={8}>
                                <br/>
                                <Grid columns='equal' centered>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header as="h1">MeGa Downloader</Header>
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <Icon name="settings" size="large" onClick={this.toggleVisibility}/>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Message
                                                style={{display: this.state.downloadPath.exists ? 'none' : 'block'}}
                                                negative>
                                                <Message.Header>Download folder is invalid</Message.Header>
                                                <p>You can fix the path from settings</p>
                                            </Message>
                                        </Grid.Column>
                                    </Grid.Row>
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