import React, {Component} from 'react';
import { Input } from 'semantic-ui-react'

function DownloadFolder(props) {
    return (
        <div>
            <h3>Settings</h3>
            <h4>Download path</h4>
            <input style={{color:'black'}} size="40" onChange={props.onChange} value={props.downloadPath} type="text"/>
        </div>
    );
}

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DownloadFolder onChange={this.props.onPathChange} downloadPath={this.props.downloadPath}/>
        );
    }
}

export default Settings;