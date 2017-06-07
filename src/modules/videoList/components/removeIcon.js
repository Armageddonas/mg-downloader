import React from 'react';
import {Icon, Popup,} from 'semantic-ui-react'

const RemoveIcon = ({handleVideoRemove, disabled}) => {
    let action = () => {
        if (disabled) return;
        handleVideoRemove();
    };

    return (
        <Popup
            trigger={
                <Icon link={!disabled} name='remove' size='large' color="red"
                      onClick={action} disabled={disabled}/>
            }
            content='Remove from list'
        />
    );
};

export default RemoveIcon;
