import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKKSSks5QvUmkx1V8bwsx-uCAflylLNGw",
  authDomain: "flixmind-auth.firebaseapp.com",
  projectId: "flixmind-auth",
  storageBucket: "flixmind-auth.firebasestorage.app",
  messagingSenderId: "848994441562",
  appId: "1:848994441562:web:b2da65526238004ed8bb63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
