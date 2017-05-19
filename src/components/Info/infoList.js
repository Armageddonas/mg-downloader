import React from 'react';
import {List} from 'semantic-ui-react'

import InfoItem from '../../containers/info/infoItem';

const InfoList = ({videos}) => {
    const listItems = videos.map((video) =>
        <InfoItem key={video.id}
                  video={video}/>);

    return (
        <List divided ordered size="large">
            {listItems}
        </List>
    );
};

export default InfoList;