import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  GoogleAuthProvider,
} from "firebase/auth";


// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALJQAnq4D-_wVm02Wll5rP0AKbuSAfUKM",
  authDomain: "campuscart-7d979.firebaseapp.com",
  projectId: "campuscart-7d979",
  storageBucket: "campuscart-7d979.firebasestorage.app",
  messagingSenderId: "156267054751",
  appId: "1:156267054751:web:d5a40a26da71b185a3c4aa",
  measurementId: "G-ZP87FRGNP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const googleProvider =
  new GoogleAuthProvider();