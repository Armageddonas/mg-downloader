import {connect} from 'react-redux'
import {setDownloadPath} from '../../actions'
import MainWindow from '../../components/mainWindow/mainWindow'

const mapDispatchToProps = (dispatch) => {
    return {
        setDownloadPath: (path) => {
            dispatch(setDownloadPath(path))
        }
    }
};

const mw = connect(
    null,
    mapDispatchToProps
)(MainWindow);

export default mw;