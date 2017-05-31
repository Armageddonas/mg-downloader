import {connect} from 'react-redux'
import {setDownloadPath} from '../../settings/index'
import NavContent from '../components/navContent'

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
