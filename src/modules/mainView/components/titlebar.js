import React, {Component} from 'react'
import {remote} from 'electron';
import { TitleBar } from 'react-desktop/windows';

export default class extends Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.minimize = this.minimize.bind(this);
        this.toggleMaximize = this.toggleMaximize.bind(this);
    }

    close() {
        remote.getCurrentWindow().close();
    };

    minimize() {
        remote.getCurrentWindow().minimize();
    };

    toggleMaximize() {
        let window = remote.getCurrentWindow();

        if (window.isMaximized())
            window.unmaximize();
        else
            window.maximize();
    };

    render() {
        return (
            <TitleBar
                title=' '
                controls
                isMaximized={false}
                theme={'dark'}
                background={'#2185D0'}
                onCloseClick={this.close}
                onMinimizeClick={this.minimize}
                onMaximizeClick={this.toggleMaximize}
                onRestoreDownClick={this.toggleMaximize}
            />
        );
    }
}
const closeWindow = () => {
    remote.getCurrentWindow().close();
};

const minimize = () => {
    remote.getCurrentWindow().minimize();
};

const maximize = () => {
    let window = remote.getCurrentWindow();

    if (window.isMaximized())
        window.unmaximize();
    else
        window.maximize();
};