// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-travel-planner-ea6a9.firebaseapp.com",
  projectId: "ai-travel-planner-ea6a9",
  storageBucket: "ai-travel-planner-ea6a9.firebasestorage.app",
  messagingSenderId: "636475150639",
  appId: "1:636475150639:web:0bc699f3f85e36b4ded1da",
  measurementId: "G-7JCVFYLL60",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
