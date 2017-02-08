import React from 'react';
import ReactDOM from 'react-dom';
import MainWindow from './components/mainWindow/mainWindow'
import { Container, Header } from 'semantic-ui-react'


ReactDOM.render(
    <Container>
        <br/>
        <Header textAlign="center" as="h1">MG Downloader</Header>
        <br/>
        <MainWindow/>
    </Container>,
    document.getElementById('root')
);
