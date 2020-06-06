import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import firebase from 'firebase';
import Lib from '../static/address_lib';
import Account from '../components/Account';

class AddressAdd extends Component {
    style = {
        fontSize: "12pt",
        padding: "5px 10px",
    }

    constructor(props) {
        super(props);
        if (this.props.login == false) {
            alert('ログインしてください。');
            Router.push('/address');
        }
        this.state = {
            name: '',
            email: '',
            tel: '',
            memo: '',
            message: 'input data.',
        }
        this.logined = this.logined.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeTel = this.onChangeTel.bind(this);
        this.onChangeMemo = this.onChangeMemo.bind(this);
        this.doAction = this.doAction.bind(this);
    }

    logined() {
        console.log('logined');
    }
    logouted() {
        Router.push('/address');
    }
    onChangeName(e) {
        this.setState({ name: e.target.value });
    }
    onChangeMemo(e) {
        this.setState({ memo: e.target.value });
    }
    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }
    onChangeTel(e) {
        this.setState({ tel: e.target.value });
    }
    doAction(e) {
        let key = this.state.email;
        let data = {
            name: this.state.name,
            memo: this.state.memo,
            tel: this.state.tel,
        }
        let db = firebase.database();
        let ref = db.ref('address/' + Lib.encodeEmail(this.props.email) + '/' + Lib.encodeEmail(this.state.email));
        console.log(ref);
        ref.set(data);
        this.setState({
            name: '',
            email: '',
            tel: '',
            memo: '',
            message: 'Registration finish!',
        });
    }

    render() {
        return (
            <div className="container">
                <Account onLogined={this.logined} onLogouted={this.logouted} self={this} />
                <hr />
                <p>{this.props.message}</p>
                {this.props.login
                    ?
                    <table className="addTable">
                        <tbody>
                            <tr>
                                <th>name:</th>
                                <td><input type="text" size="30" value={this.state.name} onChange={this.onChangeName} /></td>
                            </tr>
                            <tr>
                                <th>email:</th>
                                <td><input type="text" size="30" value={this.state.email} onChange={this.onChangeEmail} /></td>
                            </tr>
                            <tr>
                                <th>tel:</th>
                                <td><input type="text" size="30" value={this.state.tel} onChange={this.onChangeTel} /></td>
                            </tr>
                            <tr>
                                <th>memo:</th>
                                <td><input type="text" size="30" value={this.state.memo} onChange={this.onChangeMemo} /></td>
                            </tr>
                            <tr>
                                <th></th>
                                <td><button onClick={this.doAction} className="btn">追加</button></td>
                            </tr>
                        </tbody>
                    </table>
                    :
                    <p>ログインしてください...</p>
                }
            </div>
        );
    }
}

AddressAdd = connect((state) => state)(AddressAdd);
export default AddressAdd;