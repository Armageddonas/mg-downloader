import React from 'react';

import InfoList from '../../containers/info/infoList'
import SearchVideoBar from '../../modules/searchVideoBar'

const DisplayContent = () => {
    return (
        <div>
            <SearchVideoBar/>
            <br/>
            <br/>
            <InfoList/>
        </div>
    );
};

export default DisplayContent;
