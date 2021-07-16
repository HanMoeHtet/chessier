import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { store } from 'src/store';
import { setIsLoading, setUser } from 'src/store/authStore/authSlice';
import { UserData } from 'src/types';
import { DEFAULT_UERNAME, DEFAULT_RATING } from 'src/utils/constants';
import { addOrRetriveUser } from './firestore.servie';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'chessier.firebaseapp.com',
  projectId: 'chessier',
  storageBucket: 'chessier.appspot.com',
  messagingSenderId: '847062780012',
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: 'G-RF3538CC0P',
};

const app = firebase.initializeApp(config, 'chessier');

export const init = () => {
  app.auth().onAuthStateChanged(async (user) => {
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
};

export const signOut = () => {
  app.auth().signOut();
};

export default app;
