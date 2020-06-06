import React, { Component } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import '../static/style.scss';

class Layout extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>{this.props.title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0,width=device-width" />
                </Head>
                <Header header={this.props.header}/>
                {this.props.children}
                <Footer footer="copy right MURATARIKU" />
            </div>
        );
    }
}

export default Layout;

