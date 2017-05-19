import {connect} from 'react-redux'
import {setDownloadPath} from '../../actions'
import DirectoryPicker from '../../components/mainWindow/mainWindow'

const mapDispatchToProps = (dispatch) => {
    return {
        setDownloadPath: (path) => {
            dispatch(setDownloadPath(path))
        }
    }
};

const dp = connect(
    null,
    mapDispatchToProps
)(DirectoryPicker);

export default dp;