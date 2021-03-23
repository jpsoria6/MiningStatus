import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Reporting from './components/Reporting'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import {BrowserRouter,Route} from 'react-router-dom'
import Payments from './components/Payments';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Route path='/' component = {NavBar}/>
    <Route path='/mineros' component = {Reporting}/>
    <Route path='/pagos' component = {Payments}/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
