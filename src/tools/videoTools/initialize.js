let unzip = require('unzip');
let fs = require('fs');

const extractFfmpegZip = () => {
    let directory = __dirname;
    if (fs.existsSync(directory + '/ffmpeg.exe')) return;
    fs.createReadStream(directory + '/ffmpeg.zip').pipe(unzip.Extract({path: directory}));
    console.log('ffmpeg extracted');
};

export {extractFfmpegZip}