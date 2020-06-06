import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import firebase from 'firebase';
import Lib from '../static/address_lib';
import Account from '../components/Account';
import MsgDelete from './MsgDelete';

class AddressShow extends Component {
    style = {
        fontSize: "12pt",
        padding: "5px 10px",
    }
    timelabel = {
        fontSize: "4pt"
    }

    constructor(props) {
        super(props);
        if (this.props.login == false) {
            Router.push('/address');
        }
        this.state = {
            last: -1,
            input: '',
            email: Router.query.email,
            address: null,
            message: Router.query.email + 'のデータ',
            msgBoxCount: 0,
            msgBoxShow: 0,
            issmg: false,
        }
        this.logined = this.logined.bind(this);
        this.doChange = this.doChange.bind(this);
        this.doAction = this.doAction.bind(this);
        this.doPagenation = this.doPagenation.bind(this);
    }

    logined() {
        console.log('logined');
    }
    logouted() {
        Router.push('/address');
    }
    getAddress(email) {
        console.log('今state設定する');
        let db = firebase.database();
        let ref0 = db.ref('address/' + Lib.encodeEmail(this.props.email) + '/' + Lib.encodeEmail(email) + '/check');
        ref0.set(false);
        let ref = db.ref('address/' + Lib.encodeEmail(this.props.email));
        let self = this;
        ref.orderByKey().equalTo(Lib.encodeEmail(email)).on('value', (snapshot) => {
            for (let i in snapshot.val()) {
                let d = Lib.deepcopy(snapshot.val()[i]);
                if (d.messages == null || d.messages == undefined) {
                    self.setState({
                        address: d,
                        msgBoxCount: 0,
                        issmg: false,
                    });
                } else {
                    let keysInSmgs = Object.keys(d.messages);
                    let latestKeyInSmgs = Number(keysInSmgs.slice(-1)[0]);
                    let lenOfLatestKeyInSmgs = Object.keys(d.messages[latestKeyInSmgs]).length;
                    if (lenOfLatestKeyInSmgs >= 5) {
                        let msgBoxCount = Object.keys(d.messages).length - 1 + 1;
                        self.setState({
                            address: d,
                            msgBoxCount: msgBoxCount,
                            issmg: true,
                        });
                    } else {
                        let msgBoxCount = Object.keys(d.messages).length - 1;
                        self.setState({
                            address: d,
                            msgBoxCount: msgBoxCount,
                            issmg: true,
                        });
                    }
                }
                break;
            }
        });
    }
    doChange(e) {
        this.setState({
            input: e.target.value
        });
    }
    doAction(e) {
        console.log('送信された');
        e.preventDefault();
        let from = Lib.encodeEmail(this.props.email);
        let to = Lib.encodeEmail(this.state.email);
        let db = firebase.database();
        let timeKey = this.getTimeKey();
        let ref = db.ref('address/' + from + '/' + to + '/messages' + '/' + this.state.msgBoxCount.toString() + '/' + timeKey);
        ref.set('自分: ' + this.state.input);
        let ref2 = db.ref('address/' + to + '/' + from + '/messages' + '/' + this.state.msgBoxCount.toString() + '/' + timeKey);
        ref2.set('相手: ' + this.state.input);
        let ref3 = db.ref('address/' + to + '/' + from + '/check');
        ref3.set(true);
        this.setState({ input: '' });
    }
    getTimeKey() {
        let d = new Date();
        let yaer = Lib.toDoubleDigits(d.getFullYear());
        let month = Lib.toDoubleDigits(d.getMonth() + 1);
        let date = Lib.toDoubleDigits(d.getDate());
        let hour = Lib.toDoubleDigits(d.getHours());
        let minutes = Lib.toDoubleDigits(d.getMinutes());
        let seconds = Lib.toDoubleDigits(d.getSeconds());
        return yaer + month + date + hour + minutes + seconds;
    }
    doPagenation(e) {
        e.preventDefault();
        this.setState({
            last: 1,
            msgBoxShow: Number(e.target.textContent),
        });
    }

    render() {
        if (this.state.address == null) {
            this.getAddress(Router.query.email);
        }
        console.log(this.state);
        let items = [];
        let pageBtns = [];
        if (this.state.issmg != false) {
            switch (this.state.last) {
                case -1:
                    console.log('最新のページを表示する準備');
                    console.log(this.state.last);
                    let keys = Object.keys(this.state.address.messages);
                    let latestKey = Number(keys.slice(-1)[0]);
                    for (let j in this.state.address.messages[latestKey]) {
                        let month = j.substr(4, 2);
                        let date = j.substr(6, 2);
                        let hour = j.substr(8, 2);
                        let minutes = j.substr(10, 2);
                        items.unshift(
                            <li key={j}>
                                <label style={this.timelabel}>{month + '/' + date + ' ' + hour + '.' + minutes}</label>
                                <p>{this.state.address.messages[latestKey][j]}</p>
                            </li>
                        );
                    }
                    break;
                case 1:
                    console.log('選択されたページを表示する準備');
                    console.log(this.state.last);
                    for (let k in this.state.address.messages) {
                        if (k == this.state.msgBoxShow) {
                            for (let l in this.state.address.messages[k]) {
                                let month = l.substr(4, 2);
                                let date = l.substr(6, 2);
                                let hour = l.substr(8, 2);
                                let minutes = l.substr(10, 2);
                                items.unshift(
                                    <li key={l}>
                                        <label style={this.timelabel}>{month + '/' + date + ' ' + hour + '.' + minutes}</label>
                                        <p>{this.state.address.messages[k][l]}</p>
                                    </li>
                                );
                            }
                        }
                    }
                    break;
            }
            if (this.state.address.messages.length >= 2) {
                for (let i in this.state.address['messages']) {
                    pageBtns.push(
                        <button key={i} onClick={this.doPagenation} className="btn">{i}</button>
                    );
                }
            }
        }
        return (
            <div className="container">
                <Account onLogined={this.logined} onLogouted={this.logouted} />
                <hr />
                <p>{this.props.message}</p>
                {this.state.address != null
                    ?
                    <table className="addressTable">
                        <tbody>
                            <tr>
                                <th>NAME:</th>
                                <td>{this.state.address.name}</td>
                            </tr>
                            <tr>
                                <th>MAIL:</th>
                                <td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <th>TEL:</th>
                                <td>{this.state.address.tel}</td>
                            </tr>
                            <tr>
                                <th>MEMO:</th>
                                <td>{this.state.address.memo}</td>
                            </tr>
                        </tbody>
                    </table>
                    :
                    <p>no address</p>
                }
                <hr />
                <table className="msgSendTable">
                    <tbody>
                        <tr>
                            <th>MESSAGE:</th>
                            <td><input type="text" size="40" value={this.state.input} onChange={this.doChange} /></td>
                            <td><button onClick={this.doAction} className="btn sendBtn">送信</button></td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                {this.state.address != null && this.state.address.messages != null
                    ?
                    <div className="showMsg">
                        <p className="showMsgTitle">{this.state.address.name}さんとのメッセージ</p>
                        <ul className="msgBox">{items}</ul>
                        <ul className="pagenationBox">{pageBtns}</ul>
                        <MsgDelete />
                    </div>
                    :
                    <p className="noMsg">メッセージはありません。</p>
                }
            </div>
        );
    }
}

AddressShow = connect((state) => state)(AddressShow);
export default AddressShow;