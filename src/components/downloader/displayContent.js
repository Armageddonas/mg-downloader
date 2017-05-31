import React from 'react';

import {InfoList} from '../../modules/videoList'
import {SearchVideoBar} from '../../modules/searchVideoBar'

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
