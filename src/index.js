import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
        apiKey: "AIzaSyAQZuMpVZX-A4zkUhk0R17t1lhT91oioVU",
        authDomain: "social-network-framework.firebaseapp.com",
        databaseURL: "https://social-network-framework.firebaseio.com",
        projectId: "social-network-framework",
        storageBucket: "social-network-framework.appspot.com",
        messagingSenderId: "37583615957"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
