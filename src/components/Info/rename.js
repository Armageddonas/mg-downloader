import React from 'react';
import {Input} from 'semantic-ui-react'

const Rename = ({filename, handleFilename}) => {
    return (
        <Input fluid label="filename" value={filename}
               onChange={(e) => handleFilename(e.target.value)}/>
    );
};

export default Rename;
