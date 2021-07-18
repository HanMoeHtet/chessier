import 'dotenv/config';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
