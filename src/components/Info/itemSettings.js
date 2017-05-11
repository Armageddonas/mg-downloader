import React from 'react';
import {Icon, Modal, Grid} from 'semantic-ui-react'

import {DirectoryPicker} from '../settings/settings'
import Rename from "./rename";

const ItemSettings = ({filename, handleFilename, onPathChange, directory, disabled}) => {
    if (disabled === true)
        return <Icon name='setting' size='large' color="black"
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
                            <Rename filename={filename} handleFilename={handleFilename}/>
                            <DirectoryPicker onPathChange={onPathChange}
                                             directory={directory}/>
                        </Grid.Column>
                        <Grid.Column>
                        </Grid.Column>
                    </Grid>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};

export default ItemSettings;