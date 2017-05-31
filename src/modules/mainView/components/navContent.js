import React from 'react';
import {DirectoryPicker} from "../../settings/index";

const NavContent = ({onPathChange, downloadFolder}) => {
    return (
        <div>
            <h3>Settings</h3>
            <h4>Download path</h4>
            <DirectoryPicker onPathChange={onPathChange} directory={downloadFolder}/>
        </div>
    );
};

export default NavContent;
