import React from 'react'
import ReactDOM from 'react-dom'

import MainWindow from './containers/mainWindow/mainWindow'
import environment from './environment'
import {initState} from './tests'

import {Provider} from 'react-redux'
import {createLogger} from 'redux-logger'
import megaDownloaderApp from './modules/rootReducer'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger();

let middleware = [thunkMiddleware];
if(environment.debug === true) middleware.push(loggerMiddleware);

let store = createStore(
    megaDownloaderApp,
    applyMiddleware(...middleware)
);

if (environment.debug === true) {
    initState(store.dispatch);
}

ReactDOM.render(
    <Provider store={store}>
        <MainWindow/>
    </Provider>,
    document.getElementById('root')
);
