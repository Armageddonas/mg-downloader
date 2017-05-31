import React, {Component} from 'react';
import {Icon, Popup,} from 'semantic-ui-react'

export default class DownloadIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {clicked: false};

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        if (this.state.clicked === true) return;
        this.setState({clicked: true});

        this.props.handleVideoDownload();
    }

    render() {
        let enabled = !this.state.clicked;

        return (
            <Popup
                trigger={
                    <Icon name='download' size='large' color="blue"
                          link={enabled}
                          disabled={!enabled}
                          onClick={this.handleOnClick}/>
                }
                content='Download'
            />
        );
    }
}
