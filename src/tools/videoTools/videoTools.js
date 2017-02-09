var youtubedl = require('youtube-dl');
var FfmpegCommand = require('fluent-ffmpeg');
const os = require('os');
var fs = require('fs');


class videoTools {

    static downloadMp4(video, downloadPath, onCompletion, onGetPercentage) {
        // Zero percent on start
        onGetPercentage(0);

        // Video config
        let videoDl = youtubedl(
            video.url,
            ['--format=18'],
            {cwd: ''}
        );

        // Get video size
        let size;
        videoDl.on('info', function (info) {
            size = info.size;
        });

        // Save video
        videoDl.pipe(fs.createWriteStream(downloadPath + '/' + video.id + '.mp4'));

        // Sense end of downloading
        videoDl.on('end', function () {
            console.log('finished downloading!');
            onCompletion();
        });

        // Calculate percentage downloaded
        let pos = 0;
        videoDl.on('data', function data(chunk) {
            pos += chunk.length;
            // let size = self.state.size;
            if (size) {
                let percent = (pos / size * 100).toFixed(0);
                // Scale down to 80%
                percent = (percent * 0.90).toFixed(0);
                onGetPercentage(percent);
            }
        });
    }

    static convertToMp3(video, downloadPath, onCompletion) {

        // Functions is used as a callback
        return function () {
            // Load video file
            let proc = FfmpegCommand(downloadPath + '/' + video.id + '.mp4');

            // Load ffmpeg binary
            if (os.platform() === 'win32') proc.setFfmpegPath(__dirname + '\\ffmpeg');

            // Convert to mp3
            proc.saveToFile(downloadPath + '/' + video.title + '.mp3')
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
        youtubedl.getInfo(videoUrl, [], function (err, info) {
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