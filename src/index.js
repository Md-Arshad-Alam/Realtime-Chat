import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8BsrKl_UJhz-D_XQFfZWSw6XUYpsBClo",
  authDomain: "react-firechat-f5f72.firebaseapp.com",
  databaseURL: "https://react-firechat-f5f72-default-rtdb.firebaseio.com",
  projectId: "react-firechat-f5f72",
  storageBucket: "react-firechat-f5f72.appspot.com",
  messagingSenderId: "748944573711",
  appId: "1:748944573711:web:d4f3211af02d8be11c6a7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
