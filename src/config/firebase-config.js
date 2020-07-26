import firebase from 'firebase';

//The core Firebase JS SDK is always required and must be listed first
//importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js");

//TODO: Add SDKs for Firebase products that you want to use https://firebase.google.com/docs/web/setup#available-libraries 

// Your Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDBZtHA4OGJK0OcG8wUYeLzVKWmePtdPKE",
    authDomain: "note-sharing-c9008.firebaseapp.com",
    databaseURL: "https://note-sharing-c9008.firebaseio.com",
    projectId: "note-sharing-c9008",
    storageBucket: "note-sharing-c9008.appspot.com",
    messagingSenderId: "448524709713",
    appId: "1:448524709713:web:d78fed6b59f01dad136d70",
    measurementId: "G-XWFEPP1RFG"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
firebase.analytics();

export { db };