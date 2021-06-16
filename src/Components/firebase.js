import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCZQjNIvK9cIo_j39r6V1qgUM32WXJJAsQ',
  authDomain: 'booksapp-b3ab6.firebaseapp.com',
  projectId: 'booksapp-b3ab6',
  storageBucket: 'booksapp-b3ab6.appspot.com',
  messagingSenderId: '480198567093',
  appId: '1:480198567093:web:ad4962cb27b936c4e2cafc',
});

const db = firebase.firestore();
const auth = app.auth();

export default app;
export { db, auth };
