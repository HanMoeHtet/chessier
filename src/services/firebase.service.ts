import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA-W-fUWUz0NEc7OTZ7WMcGbmvDiiqlNvI',
  authDomain: 'chessier.firebaseapp.com',
  projectId: 'chessier',
  storageBucket: 'chessier.appspot.com',
  messagingSenderId: '847062780012',
  appId: '1:847062780012:web:77773e6f51bfe6d5d97049',
  measurementId: 'G-RF3538CC0P',
};

const app = firebase.initializeApp(config, 'chessier');

export const signOut = () => {
  app.auth().signOut();
};

export default app;
