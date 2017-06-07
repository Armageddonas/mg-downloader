import React, {Component} from 'react'
import {Modal, Message} from 'semantic-ui-react'

export default class ErrorModal extends Component{
    constructor(props){
        super(props);
        this.state = {open: this.props.open};

        this.onClose = this.onClose.bind(this);
        this.open = this.open.bind(this);
    }

    open(){
        this.setState({open: true})
    }

    onClose(){
        this.setState({open: false})
    }

    render() {
        return (
            <Modal size='small' open={this.state.open} onClose={this.onClose} >
                <Modal.Header>Oops</Modal.Header>
                <Modal.Content>
                    <Message negative>
                        <Message.Header>The folder you picked doesn't exists</Message.Header>
                        <p>Please pick another folder from the program settings on the top right or from this item's settings</p>
                    </Message>
                </Modal.Content>
            </Modal>
        );
    }
}