import App,{Container} from 'next/app';
import React from 'react';
import withReduxStore from '../lib/redux-store';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

class _App extends App {
    render() {
        const {Component,pageProps,reduxStore}=this.props
        return (
            <Container>
                <Provider store={reduxStore}> 
                    <Component {...pageProps}/>
                </Provider>
            </Container>
        )
    }
}

export default withReduxStore(_App)