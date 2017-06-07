import React, {Component} from 'react';
import {Icon, Popup,} from 'semantic-ui-react'

const DownloadIcon = ({handleVideoDownload, disabled}) => {
    const action = () => {
        if (disabled) return;
        handleVideoDownload();
    };

    return (
        <Popup
            trigger={
                <Icon name='download' size='large' color="blue"
                      link={!disabled}
                      disabled={disabled}
                      onClick={action}/>
            }
            content='Download'
        />
    );
};

export default DownloadIcon;