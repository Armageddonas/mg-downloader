import React from 'react';
import {List} from 'semantic-ui-react'

import InfoItem from '../../containers/info/infoItem';

const InfoList = ({videos, downloadPath}) => {
    const listItems = videos.map((video) =>
        <InfoItem key={video.id || video.url}
                  video={video}
                  downloadPath={downloadPath}/>);

    return (
        <List divided ordered size="large">
            {listItems}
        </List>
    );
};

export default InfoList;