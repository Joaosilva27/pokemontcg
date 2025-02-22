// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg0Vtf1B4Sh6CwDCvt3WdvMDIJ_7pbPJo",
  authDomain: "pokemontcg-105ac.firebaseapp.com",
  projectId: "pokemontcg-105ac",
  storageBucket: "pokemontcg-105ac.firebasestorage.app",
  messagingSenderId: "283809256567",
  appId: "1:283809256567:web:f8e889b2df23192cb3a272",
  measurementId: "G-QYKK34N7M0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
