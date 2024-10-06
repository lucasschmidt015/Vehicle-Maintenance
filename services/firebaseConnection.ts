import { API_KEY, GCM_SENDER_ID, PROJECT_ID, STORAGE_BUCKET, GOOGLE_APP_ID } from '@env';

import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore'; 

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: GCM_SENDER_ID,
  appId: GOOGLE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };