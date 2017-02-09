const os = require('os');
const fs = require('fs');

class fileManager {
    static getDownloadPath() {
        let saveDir = os.homedir() + '/Downloads/';

        let downloadPathLS = JSON.parse(localStorage.getItem('downloadPath'));
        let downloadPath = downloadPathLS != null ? downloadPathLS : saveDir;

        if (!fs.existsSync(downloadPath)) return {value: downloadPath, exists: false};

        return {value: downloadPath, exists: true};
    }

    static setDownloadPath(path) {
        localStorage.setItem('downloadPath', JSON.stringify(path));

        if (!fs.existsSync(path)) return {value: path, exists: false};
        return {value: path, exists: true};
    }
}

export default fileManager;