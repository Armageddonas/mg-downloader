let fs = require('fs');
let os = require('os');

if(os.platform() === 'linux') fs.chmodSync(__dirname + '/../../../node_modules/youtube-dl/bin/youtube-dl', '755');
