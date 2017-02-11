import React, {Component} from 'react';
import {Icon, Grid} from 'semantic-ui-react'
const {dialog} = require('electron').remote;

class DownloadFolder extends Component {
    constructor(props) {
        super(props);

        this.handleDirectoryChooser = this.handleDirectoryChooser.bind(this);
        this.handleDirectoryInput = this.handleDirectoryInput.bind(this);
    }

    handleDirectoryChooser() {
        let pathArray = dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        console.log(pathArray);

        if (pathArray) this.props.onPathChange(pathArray[0]);
    }

    handleDirectoryInput(e) {
        this.props.onPathChange(e.target.value);
    }

    render() {
        return (
            <div>
                <h3>Settings</h3>
                <h4>Download path</h4>
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <input style={{
                                color: 'black',
                                backgroundColor: this.props.downloadPath.exists ? 'white' : 'red',
                                width: '100%'
                            }}
                                   onChange={this.handleDirectoryInput} value={this.props.downloadPath.value}
                                   type="text"/>

                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Icon link name='folder open' size='large'
                                  onClick={this.handleDirectoryChooser}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

function Settings(props) {
    return (
        <DownloadFolder onPathChange={props.onPathChange} downloadPath={props.downloadPath}/>
    );
}

export default Settings;