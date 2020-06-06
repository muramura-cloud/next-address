import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Image from '../static/Image';

class Account extends Component {
    style = {
        fontSize: "12pt",
        padding: "5px 10px",
    }

    constructor(props) {
        super(props);
        this.login_check = this.login_check.bind(this);
    }

    login() {
        console.log('login');
        let provider = new firebase.auth.GoogleAuthProvider();
        var self = this;
        firebase.auth().signInWithPopup(provider).then((result) => {
            this.props.dispatch({
                type: 'UPDATE_USER',
                value: {
                    login: true,
                    username: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                    data: this.props.data,
                    items: this.props.items,
                }
            });
            this.props.onLogined();
        });
    }

    logout() {
        console.log('logout');
        firebase.auth().signOut();
        this.props.dispatch({
            type: 'UPDATE_USER',
            value: {
                login: false,
                username: 'click here!',
                email: '',
                photo: '',
                data: [],
                items: [],
            }
        });
        this.props.onLogouted();
    }

    login_check() {
        if (this.props.login == false) {
            this.login();
        } else {
            this.logout();
        }
    }

    render() {
        return (
            <div className="login">
                {this.props.login
                    ?
                    <div className="loginbox">
                        <p className="login">
                            <span className="account" onClick={this.login_check}>
                                <Image fname={this.props.photo} width="30" height="30" radius="30" />
                            </span>
                        </p>
                        <p className="login">
                            <span onClick={this.login_check} className="btn">ログアウト</span>
                        </p>
                    </div>
                    :
                    <p className="login">
                        <span className="btn" onClick={this.login_check}>ログイン：click!</span>
                    </p>
                }
            </div>
        );
    }
}
Account = connect((state) => state)(Account);
export default Account;
