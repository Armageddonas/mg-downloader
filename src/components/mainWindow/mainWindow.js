import React, {Component} from 'react';
import DisplayContent from '../downloader/displayContent'
import Settings from '../settings/settings'

const os = require('os');
var saveDir = os.homedir() + '/Downloads/';

class MainWindow extends Component{
    constructor(props){
        super(props);
        // localStorage.clear();
        //todo: Check if path exists
        let downloadPathLS = JSON.parse(localStorage.getItem('downloadPath'));
        let downloadPath = downloadPathLS != null ? downloadPathLS : saveDir;
        this.state = {downloadPath: downloadPath};

        this.handleDownloadFolder = this.handleDownloadFolder.bind(this);
    }

    handleDownloadFolder(e) {
        localStorage.setItem('downloadPath', JSON.stringify(e.target.value));
        this.setState({downloadPath: e.target.value});
    }

    render(){
        return (
            <div>
                <DisplayContent downloadPath={this.state.downloadPath}/>
                <Settings onPathChange={this.handleDownloadFolder} downloadPath={this.state.downloadPath}/>
            </div>
        );
    }
}

export default MainWindow;