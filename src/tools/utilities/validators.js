export function validateYouTubeUrl(ytUrl) {
    let url = ytUrl;
    if (url !== undefined || url !== '') {
        let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
        let match = url.match(regExp);
        return (match && match[2].length === 11);
    }
}