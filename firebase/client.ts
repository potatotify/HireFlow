// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDflJdbCfII_01bETliMg3VY0BlPjWHPuk",
  authDomain: "hireflow-67b30.firebaseapp.com",
  projectId: "hireflow-67b30",
  storageBucket: "hireflow-67b30.firebasestorage.app",
  messagingSenderId: "294594449200",
  appId: "1:294594449200:web:6f354b068a67af94a0c2f5",
  measurementId: "G-2J5RS0QN8S"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);