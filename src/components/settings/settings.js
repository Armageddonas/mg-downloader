import React, {Component} from 'react';
import {Icon, Grid, Input} from 'semantic-ui-react'
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

        if (pathArray) this.props.onPathChange(pathArray[0]);
    }

    handleDirectoryInput(e) {
        this.props.onPathChange(e.target.value);
    }

    render() {
        return (
            <div>
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <Input label="path" fluid readOnly
                                   value={this.props.path ? this.props.path : this.props.genericPath}
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
        <div>
            <h3>Settings</h3>
            <h4>Download path</h4>
            <DownloadFolder onPathChange={props.onPathChange} genericPath={props.genericPath} path={props.path}/>
        </div>
    );
}

export {
    Settings,
    DownloadFolder
}