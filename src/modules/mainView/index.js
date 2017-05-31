import {connect} from 'react-redux'
import {setDownloadPath} from '../settings/index'
import mw from './components/mainWindow'

const mapDispatchToProps = (dispatch) => {
    return {
        setDownloadPath: (path) => {
            dispatch(setDownloadPath(path))
        }
    }
};

const MainWindow = connect(
    null,
    mapDispatchToProps
)(mw);

export {MainWindow};