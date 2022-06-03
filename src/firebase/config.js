import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9qBVtbYvPza83ALmiRiXZFM3tnSb94rA",
  authDomain: "messagingchatapp.firebaseapp.com",
  projectId: "messagingchatapp",
  storageBucket: "messagingchatapp.appspot.com",
  messagingSenderId: "319398028976",
  appId: "1:319398028976:web:b93950b15aa58ca2fd3d75",
  measurementId: "G-7NWMJSL2SG"
};
// Initialize Firebase 
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === 'localhost') {
  // auth.useEmulator('http://localhost:9099');
  // db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase;
