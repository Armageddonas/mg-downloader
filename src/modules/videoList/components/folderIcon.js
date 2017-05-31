import React from 'react';
import {Icon, Popup,} from 'semantic-ui-react'

const {shell} = require('electron');

const FolderIcon = ({filepath}) => {
    return (
        <Popup
            trigger={
                <Icon link name='folder open' size='large' color="blue" className="animated bounceIn"
                      onClick={() => shell.showItemInFolder(filepath)}/>
            }
            content='Open containing folder'
        />
    );
};

export default FolderIcon;