import React from 'react'
import ReactDOM from 'react-dom'
import MainWindow from './components/mainWindow/mainWindow'

import {Provider} from 'react-redux'
import {createLogger} from 'redux-logger'
import todoApp from './reducers'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger();

let store = createStore(
    todoApp,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);

ReactDOM.render(
    <Provider store={store}>
        <MainWindow/>
    </Provider>,
    document.getElementById('root')
);
