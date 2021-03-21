import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Reporting from './components/Reporting'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';


ReactDOM.render(
  <React.StrictMode>
    <NavBar></NavBar>
    <Reporting></Reporting>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
