import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

export const signOut = () => {
  app.auth().signOut();
};

export default app;
