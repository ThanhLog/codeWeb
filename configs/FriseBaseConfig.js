// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Correctly import getFirestore
import { getAnalytics } from "firebase/analytics"; // Optional, if you plan to use Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1M0bNN61IecRPFym7ZL0Zpuv2D--p3hI",
  authDomain: "productdeatil.firebaseapp.com",
  projectId: "productdeatil",
  storageBucket: "productdeatil.appspot.com",
  messagingSenderId: "5699221176",
  appId: "1:5699221176:web:f47685347ea7f223dc264d",
  measurementId: "G-T1B5ZPNLJ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

// Export the initialized app and db
export { app, db };

// Optional: Initialize Analytics if you plan to use it
// const analytics = getAnalytics(app);
