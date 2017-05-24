let youtubedl = require('youtube-dl');
let FfmpegCommand = require('fluent-ffmpeg');
const os = require('os');
let fs = require('fs');


class videoTools {

    static downloadFromServer(videoFilename, videoUrl, onCompletion, onGetPercentage) {
        // Zero percent on start
        onGetPercentage(0);

        // Video config
        let videoDl = youtubedl(
            videoUrl,
            ['--format=bestaudio'],
            {cwd: ''}
        );

        // Get video size
        let size;
        videoDl.on('info', function (info) {
            size = info.size;
        });

        // Save video
        videoDl.pipe(fs.createWriteStream(videoFilename));

        // Sense end of downloading
        videoDl.on('end', function () {
            console.log('finished downloading!');
            onCompletion();
        });

        // Calculate percentage downloaded
        let pos = 0;
        videoDl.on('data', function data(chunk) {
            pos += chunk.length;
            if (size) {
                let percent = pos / size * 100;
                // Scale down to 90%
                percent = percent * 0.90;
                onGetPercentage(percent);
            }
        });
    }

    // todo: rename to initConvertToMp3
    static convertToMp3(videoFilename, audioFilename, onGetPercentage, onCompletion) {

        // Functions is used as a callback
        return function () {
            // Load video file
            let proc = FfmpegCommand(videoFilename);

            // Load ffmpeg binary
            if (os.platform() === 'win32') proc.setFfmpegPath(__dirname + '\\ffmpeg');

            // Convert to mp3
            proc.saveToFile(audioFilename)
                .on('progress', function (progress) {
                    // Scale to 10%. Also adds 90 because downloading percentage stops at 90%
                    let percent = 90 + progress.percent * 0.1;
                    if (percent < 100) onGetPercentage(percent);
                })
                .on('end', function () {
                        console.log("converted mp3");
                        onCompletion();
                    }
                );
        }
    }

    static getInfo(videoUrl, onInfoFound, onError) {
        // Get video info
        console.log('Fetching video info');
        youtubedl.getInfo(videoUrl, [], {}, function (err, info) {
            if (err) {
                onError(videoUrl);
                throw err;
            }

            let videoInfo = {
                title: info.title,
                thumbnail: info.thumbnail,
                description: info.description,
                id: info.id,
                url: videoUrl,
                loading: false
            };

            onInfoFound(videoInfo);
        });
    }

}

export default videoTools;
