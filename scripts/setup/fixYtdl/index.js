let fs = require('fs');

fs.createReadStream(__dirname + '/downloader.js').pipe(fs.createWriteStream(__dirname + '/../../../node_modules/youtube-dl/lib/downloader.js'));
