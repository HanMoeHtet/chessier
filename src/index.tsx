import 'dotenv/config';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store';
import App from './App';
import { Provider } from 'react-redux';
import './index.css';
import { init } from './services/firebase.service';
import { BrowserRouter } from 'react-router-dom';

init();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
