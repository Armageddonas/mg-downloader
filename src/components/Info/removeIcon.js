import React from 'react';
import {Icon, Popup,} from 'semantic-ui-react'

const RemoveIcon = ({handleVideoRemove}) => {
    return (
        <Popup
            trigger={
                <Icon link name='remove' size='large' color="red"
                      onClick={handleVideoRemove}/>
            }
            content='Remove from list'
        />
    );
};

export default RemoveIcon;
