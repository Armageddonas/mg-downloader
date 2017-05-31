import {connect} from 'react-redux'
import {actions} from '../settings/index'
import mw from './components/mainWindow'

const mapDispatchToProps = (dispatch) => {
    return {
        setDownloadPath: (path) => {
            dispatch(actions.setDownloadPath(path))
        }
    }
};

const MainWindow = connect(
    null,
    mapDispatchToProps
)(mw);

export {MainWindow};