import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';

/**
 * Entry point for the ClassTrack React application.  Wraps the root in
 * BrowserRouter for routing and GlobalProvider for state management.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

// E2E convenience: autologin if ?autologin=1
try{
  if (window.location.search.includes('autologin=1')){
    const token = 'e2e-token';
    window.__E2E_AUTOLOGIN__ = token;
  }
}catch(_e){}
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>
);