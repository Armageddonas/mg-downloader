import React from 'react';
import {Progress} from 'semantic-ui-react'

const ProgressBar = ({percent}) => {
    return (
        <Progress progress color={percent === 100 ? 'green' : 'blue'}
                  percent={percent}
                  indicating={(percent !== 0) && (percent !== 100)}/>
    );
};

export default ProgressBar;