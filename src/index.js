import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from "recoil";
import firebase from "firebase/app";
import "firebase/auth";
import {firebaseConfig} from "./firebase";
import {FirebaseAuthProvider} from "@react-firebase/auth";

ReactDOM.render(
    <React.StrictMode>
        <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
            <RecoilRoot>
                <App/>
            </RecoilRoot>
        </FirebaseAuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
