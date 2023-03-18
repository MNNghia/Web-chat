import firebase from "firebase/app";

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAatgkzN_ouuGfIf7f5-6FdNfSsAObXU00",
    authDomain: "chat-app-672e7.firebaseapp.com",
    projectId: "chat-app-672e7",
    storageBucket: "chat-app-672e7.appspot.com",
    messagingSenderId: "1052023330263",
    appId: "1:1052023330263:web:a96e859fd38d390e06e792",
    measurementId: "G-7FT5JSE2KB"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth()
const db = firebase.firestore()




export {db, auth};
export default firebase

