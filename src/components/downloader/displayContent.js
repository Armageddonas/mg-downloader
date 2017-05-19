import React from 'react';

import InfoList from '../../containers/info/infoList'
import SearchVideo from '../../containers/downloader/searchVideo'

const DisplayContent = () => {
    return (
        <div>
            <SearchVideo/>
            <br/>
            <br/>
            <InfoList/>
        </div>
    );
};

export default DisplayContent;
