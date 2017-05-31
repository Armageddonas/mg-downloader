export const SET_DOWNLOAD_PATH = 'SET_DOWNLOAD_PATH';

// Settings functions
export function setDownloadPath(path){
    return {
        type: SET_DOWNLOAD_PATH,
        path
    }
}