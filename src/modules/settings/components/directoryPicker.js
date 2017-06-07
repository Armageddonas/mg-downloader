import React, {Component} from 'react';
import {Icon, Grid, Input} from 'semantic-ui-react'
let fs = require("fs");
const {dialog} = require('electron').remote;

const DirectoryPicker = ({onPathChange, directory}) => {

    const handleDirectoryChooser = () => {
        let pathArray = dialog.showOpenDialog({
            properties: ['openDirectory']
        });

        if (pathArray) onPathChange(pathArray[0]);
    };

    return (
        <div>
            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <Input label="path" fluid readOnly
                               error={!fs.existsSync(directory)}
                               value={directory}
                               type="text"/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Icon link name='folder open' size='large'
                              onClick={handleDirectoryChooser}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default DirectoryPicker
