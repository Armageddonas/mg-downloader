let request = require('request');
let fs = require('fs');
let path = require('path');

let regexp = /https:\/\/yt-dl\.org\/downloads\/(\d{4}\.\d\d\.\d\d(\.\d)?)\/youtube-dl/;
let url = 'https://rg3.github.io/youtube-dl/download.html';
let isWin = (process.platform === 'win32' || process.env.NODE_PLATFORM === 'windows') ? true : false;

const getLatestVersionInfo = (callback) => {
    request.get(url, function get(err, res, body) {

        if (err || res.statusCode !== 200) {
            return callback(err || new Error('Response Error: ' + res.statusCode));
        }

        let info = regexp.exec(body);

        if (!info) {
            return callback(new Error('Could not find download link in ' + url));
        }
        // todo: set 3rd value of array to infoJSON
        let infoJSON = {url: exec(info[0]), version: info[1]};

        callback(null, infoJSON);
    })
};

function download(link, callback) {
    'use strict';
    let downloadFile = request.get(link);
    let status = null;

    downloadFile.on('response', function response(res) {
        if (res.statusCode !== 200) {
            status = new Error('Response Error: ' + res.statusCode);
            return;
        }
        downloadFile.pipe(fs.createWriteStream(path.join(__dirname, exec('youtube-dl')), {mode: 493}));
    });

    downloadFile.on('error', function error(err) {
        callback(err);
    });

    downloadFile.on('end', function end() {
        callback(status);
    });

}

function exec(path) {
    'use strict';
    return (isWin) ? path + '.exe' : path;
}

const getBinary = (callback) => {
    getLatestVersionInfo((error, info) => {
            if (error) {
                return callback(error);
            }

            download(info.url, function error(err) {
                if (err) {
                    return callback(err);
                }
                fs.writeFileSync(path.join(__dirname, 'details'), JSON.stringify({
                    version: info.version,
                    path: null,
                    exec: exec('youtube-dl')
                }), 'utf8');
                callback(null, 'Downloaded youtube-dl ' + info.version);
            })
        }
    )
};

const copyToYtdlModule = (callback) => {
    if (!fs.existsSync(__dirname + exec('/youtube-dl')) && !fs.existsSync(__dirname + '/details')) return callback();

    let ytdlPath = __dirname + '/../../../node_modules/youtube-dl/bin/' + exec('youtube-dl');
    let detailsPath = __dirname + '/../../../node_modules/youtube-dl/bin/details';

    fs.renameSync(path.join(__dirname, exec('youtube-dl')), ytdlPath);
    fs.renameSync(path.join(__dirname, '/details'), detailsPath);

    console.log('Updated ytdl to latest version');
    callback();
};

const getCurrentVersion = (callback) => {
    fs.readFile(path.join(__dirname, '../../../node_modules/youtube-dl/bin/details'), 'utf8', (err, data) => {
        if (err) callback(err);
        callback(null, JSON.parse(data));
    });
};

const update = (callback) => {
    getCurrentVersion((err, currentVersion) => {
        getLatestVersionInfo((err, info) => {
            if (currentVersion.version !== info.version) return getBinary(callback);
            callback(null, 'Already up to date ' + currentVersion.version)
        })
    })
};


export {getLatestVersionInfo};
export {getCurrentVersion};
export {getBinary};

export {copyToYtdlModule};
export {update};