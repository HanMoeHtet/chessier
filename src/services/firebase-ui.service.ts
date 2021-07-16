import * as firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import app from './firebase.service';

const ui = new firebaseui.auth.AuthUI(app.auth());

export const setUpUI = (id: string) => {
  ui.start(id, {
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: 'image',
          size: 'normal',
          badge: 'bottomleft',
        },
        defaultCountry: 'MM',
        defaultNationalNumber: '1234567890',
        loginHint: '+951234567890',
      },
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    siteName: process.env.REACT_APP_URL,
    signInSuccessUrl: '/home',
    signInFlow: 'popup',
    tosUrl: '/terms',
    privacyPolicyUrl: '/policies',
  });
};
