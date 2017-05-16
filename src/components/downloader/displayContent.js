import React from 'react';

import InfoList from '../../containers/info/infoList'
import SearchVideo from '../../containers/downloader/searchVideo'

const DisplayContent = ({downloadPath}) => {
    return (
        <div>
            <SearchVideo/>
            <br/>
            <br/>
            <InfoList downloadPath={downloadPath}/>
        </div>
    );
};

export default DisplayContent;
