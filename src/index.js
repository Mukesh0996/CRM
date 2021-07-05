import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { AuthContextProvider } from './Store/Auth/AuthStore';
import store from './Store/index';


ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
    <Provider store={store}><App/></Provider>
    </BrowserRouter> 
  </AuthContextProvider>,
  document.getElementById('root')
);

reportWebVitals();
