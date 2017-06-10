import React from 'react';
import {Progress} from 'semantic-ui-react'

const ProgressBar = ({percent}) => {
    return (
        <Progress progress
                  percent={percent}
                  indicating={(percent !== 0) && (percent !== 100)}/>
    );
};

export default ProgressBar;