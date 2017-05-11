import React from 'react';
import {List} from 'semantic-ui-react'

import InfoItem from "./infoItem";

const InfoList = ({videos, downloadPath, handleRemoveVideo}) => {
    const listItems = videos.map((video) =>
        <InfoItem key={video.id || video.url}
                  video={video}
                  downloadPath={downloadPath}
                  handleRemoveVideo={handleRemoveVideo}/>);

    return (
        <List divided ordered size="large">
            {listItems}
        </List>
    );
};

export default InfoList;