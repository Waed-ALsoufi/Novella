import firebase from "firebase";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCZQjNIvK9cIo_j39r6V1qgUM32WXJJAsQ",
  authDomain: "booksapp-b3ab6.firebaseapp.com",
  projectId: "booksapp-b3ab6",
  storageBucket: "booksapp-b3ab6.appspot.com",
  messagingSenderId: "480198567093",
  appId: "1:480198567093:web:ad4962cb27b936c4e2cafc",
};

if (firebase.apps.length < 1) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;

const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth };
