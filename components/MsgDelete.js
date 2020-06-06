import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import firebase from 'firebase';
import Lib from '../static/address_lib';

class MsgDelete extends Component {
    style = {
        fontSize: '15px'
    }

    constructor(props) {
        super(props);
        if (this.props.login == false) {
            Router.push('/address');
        }
        this.doAction = this.doAction.bind(this);
    }

    doAction(e) {

        let db = firebase.database();
        let ref = db.ref('address/' + Lib.encodeEmail(this.props.email) + '/' + Lib.encodeEmail(Router.query.email) + '/messages');
        console.log(ref);
        ref.remove();
    }

    render() {
        return (
            <button onClick={this.doAction} className="btn" style={this.style}>メッセージの履歴を削除</button>
        );
    }
}

MsgDelete = connect((state) => state)(MsgDelete);
export default MsgDelete;
