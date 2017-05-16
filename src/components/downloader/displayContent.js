import React from 'react';

import InfoList from '../Info/infoList'
import SearchVideo from '../../containers/downloader/searchVideo'

const DisplayContent = ({videos, handleRemoveVideo, downloadPath}) => {
    return (
        <div>
            <SearchVideo/>
            <br/>
            <br/>
            <InfoList videos={videos} handleRemoveVideo={handleRemoveVideo}
                      downloadPath={downloadPath}/>
        </div>
    );
};

export default DisplayContent;
