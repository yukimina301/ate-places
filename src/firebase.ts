import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBX50d5KOeV6d9kZC0UYnslRRfzvlrPM1g",
  authDomain: "ate-place.firebaseapp.com",
  projectId: "ate-place",
  storageBucket: "ate-place.appspot.com",
  messagingSenderId: "499631127760",
  appId: "1:499631127760:web:9c96ee77bae4058360b2d5",
  measurementId: "G-496SS6NBDR",
  // ignoreUndefinedProperties: "true",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();


export {db, auth};
