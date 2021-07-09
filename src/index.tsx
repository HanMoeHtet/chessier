import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './index.css';

import { setIsLoading, setUser } from 'src/store/authStore/authSlice';
import firebase from 'src/services/firebase.service';
import { addOrRetriveUser } from './services/firestore.servie';
import { UserData } from './types';
import { DEFAULT_RATING, DEFAULT_UERNAME } from './utils/constants';

firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) {
    store.dispatch(setIsLoading(false));
    store.dispatch(setUser(null));
    return;
  }
  const { displayName, email, phoneNumber, uid, photoURL, providerId } = user;
  const defaultUserData: UserData = {
    displayName: displayName || DEFAULT_UERNAME,
    photoURL,
    rating: DEFAULT_RATING,
    uid,
  };
  const userData: UserData = await addOrRetriveUser(uid, defaultUserData);
  store.dispatch(
    setUser({
      displayName: userData.displayName,
      email,
      phoneNumber,
      uid,
      photoURL: userData.photoURL,
      providerId,
      rating: userData.rating,
    })
  );
  store.dispatch(setIsLoading(false));
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
