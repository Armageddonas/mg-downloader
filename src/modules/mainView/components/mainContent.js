import React from 'react';

import {InfoList} from '../../videoList/index'
import {SearchVideoBar} from '../../searchVideoBar/index'

const DisplayContent = () => {
    return (
        <div>
            <SearchVideoBar/>
            <InfoList/>
        </div>
    );
};

export default DisplayContent;
