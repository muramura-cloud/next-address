import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDZKtCs0Fm0tuBZXPAn7Dl88-UIYiWsGxc",
    authDomain: "address-47f20.firebaseapp.com",
    databaseURL: "https://address-47f20.firebaseio.com",
    projectId: "address-47f20",
    storageBucket: "address-47f20.appspot.com",
    messagingSenderId: "727913453116",
    appId: "1:727913453116:web:4f4802f2babfe9a9921539",
    measurementId: "G-2EWDCETT0D"
};
var fireapp;
try {
    firebase.initializeApp(firebaseConfig);
} catch (error) {
    console.log(error.message);
}
export default fireapp;

const states = {
    login: false,
    username: '',
    email: '',
    photo: '',
    data: [],
    items: [],
}

function addressReducer(state = states, action) {
    switch (action.type) {
        case 'UPDATE_USER':
            return action.value;
        default:
            return state;
    }
}

export function initStore(state = states) {
    return createStore(addressReducer, state, applyMiddleware(thunkMiddleware))
}