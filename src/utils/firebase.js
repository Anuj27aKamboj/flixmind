// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACV1jS91l4ziLh5sz1N0juc2Gf2qcNy1s",
  authDomain: "flixmind.firebaseapp.com",
  projectId: "flixmind",
  storageBucket: "flixmind.firebasestorage.app",
  messagingSenderId: "865901610838",
  appId: "1:865901610838:web:c03b6e0cfd0682ec4b38f7",
  measurementId: "G-F9XYTYK98W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();