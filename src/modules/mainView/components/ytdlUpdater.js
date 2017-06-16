import React, {Component} from 'react'
import {Label, Popup} from "semantic-ui-react";
let downloader = require('../../../../node_modules/youtube-dl/lib/downloader');

export default class YtdlUpdater extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: false};
    }

    componentDidMount() {
        const updateState = () => this.setState({visible: true});
        downloader('../../../../node_modules/youtube-dl/bin', function error(err, done) {
            'use strict';
            if (err) {
                return console.log(err.stack);
            }
            console.log(done);

            if (!done.includes('Already up to date'))
                updateState();
        });
    }

    render() {
        return (<Popup
            trigger={<Label circular color='orange' style={{display: this.state.visible ? 'block' : 'none'}}>1</Label>}
            content='A library has been updated, please restart the application'
            position='bottom center'
        />)
    }
}