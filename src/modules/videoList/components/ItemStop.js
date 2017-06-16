import React from 'react'
import {Icon, Popup} from "semantic-ui-react";

const ItemStop = ({stopDownloading, disabled}) => {
    const onClick = () => {
        if (disabled) return;
        stopDownloading();
    };

    return (
        <Popup
            trigger={
                <Icon name='stop' size='large' onClick={onClick} color="blue" disabled={disabled}/>
            }
            content='Stop downloading'
        />
    );
};

export default ItemStop;