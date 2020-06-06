import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import firebase from 'firebase';
import Lib from '../static/address_lib';

class AddressDelete extends Component {
    constructor(props) {
        super(props);
        if (this.props.login == false) {
            Router.push('/address');
        }
        this.doAction=this.doAction.bind(this);
    }

    doAction(e) {
        let db=firebase.database();
        let ref=db.ref('address/'+Lib.encodeEmail(this.props.email)+'/'+Lib.encodeEmail(this.props.delEmail));
        ref.remove();
        this.go();
    }
    go() {
        Router.push('/address');
    }

    render() {
        return (
            <button onClick={this.doAction} className="deleteBtn">削除</button>
        );
    }
}

AddressDelete = connect((state) => state)(AddressDelete);
export default AddressDelete;
