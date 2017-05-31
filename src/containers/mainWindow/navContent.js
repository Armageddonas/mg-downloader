import {connect} from 'react-redux'
import {setDownloadPath} from '../../modules/settings'
import NavContent from '../../components/mainWindow/navContent'

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

const nc = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavContent);

export default nc;
