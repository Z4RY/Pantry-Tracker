// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqHyx2ngYQNFWdESvZ9UMrzK4vGllPkOA",
  authDomain: "abpantryapp.firebaseapp.com",
  projectId: "abpantryapp",
  storageBucket: "abpantryapp.appspot.com",
  messagingSenderId: "383889454890",
  appId: "1:383889454890:web:df9ed0ee52663336459053",
  measurementId: "G-FRJJ2PE88Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {app, firestore}