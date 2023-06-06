// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZA-i_2kVJrd3v0OcNByXJp_uvDBx-VBY",
  authDomain: "react--note-collector-app.firebaseapp.com",
  projectId: "react--note-collector-app",
  storageBucket: "react--note-collector-app.appspot.com",
  messagingSenderId: "547152119789",
  appId: "1:547152119789:web:64acc5f5b11c672d8a09e4",
  measurementId: "G-2THD80V02W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
