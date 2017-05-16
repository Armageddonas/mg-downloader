import React from 'react';

import InfoList from '../../containers/info/infoList'
import SearchVideo from '../../containers/downloader/searchVideo'

const DisplayContent = ({handleRemoveVideo, downloadPath}) => {
    return (
        <div>
            <SearchVideo/>
            <br/>
            <br/>
            <InfoList handleRemoveVideo={handleRemoveVideo}
                      downloadPath={downloadPath}/>
        </div>
    );
};

export default DisplayContent;
