import {connect} from 'react-redux'
import {setDownloadPath} from '../../actions'
import DirectoryPicker from '../../components/mainWindow/navContent'

const mapStateToProps = (state) => {
    const {settings} = state;
    return {downloadFolder: settings.downloadPath};
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPathChange: (path) => {
            dispatch(setDownloadPath(path))
        }
    }
};

const dp = connect(
    mapStateToProps,
    mapDispatchToProps
)(DirectoryPicker);

export default dp;