let downloader = require('../../../node_modules/youtube-dl/lib/downloader');
let fs = require('fs');
let os = require('os');


let updater = (callback) => {
    if (os.platform() === 'linux') {
        callback();
        return;
    }

    downloader(function error(err, done) {
        'use strict';
        if (err) {
            callback();
            return console.log(err.stack);
        }

        console.log(done);
        // if (os.platform() === 'linux')
        // fs.chmodSync(__dirname + '/../../../node_modules/youtube-dl/bin/youtube-dl', '755');
        if (!done.includes('Already up to date')) console.log('Youtube-dl updated');
        callback();
    });
};

export default updater