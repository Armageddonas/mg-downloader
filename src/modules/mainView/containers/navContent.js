import {connect} from 'react-redux'
import {actions} from '../../settings'
import NavContent from '../components/navContent'

const mapStateToProps = (state) => {
    const {settings} = state;
    return {downloadFolder: settings.downloadPath};
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPathChange: (path) => {
            dispatch(actions.setDownloadPath(path))
        }
    }
};

const nc = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavContent);

export default nc;
