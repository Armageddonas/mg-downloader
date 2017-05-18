import React from 'react'
import ReactDOM from 'react-dom'

import MainWindow from './components/mainWindow/mainWindow'
import environment from './environment'

import {Provider} from 'react-redux'
import {createLogger} from 'redux-logger'
import todoApp from './reducers'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger();

let middleware = [thunkMiddleware];
if(environment.debug === true) middleware.push(loggerMiddleware);

let store = createStore(
    todoApp,
    applyMiddleware(...middleware)
);

ReactDOM.render(
    <Provider store={store}>
        <MainWindow/>
    </Provider>,
    document.getElementById('root')
);
