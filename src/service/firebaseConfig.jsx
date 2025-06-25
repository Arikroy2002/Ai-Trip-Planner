// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-uRL5WoOqvzQV012BeDleu8IGRU47x_4",
  authDomain: "ai-trip-planner-7e402.firebaseapp.com",
  projectId: "ai-trip-planner-7e402",
  storageBucket: "ai-trip-planner-7e402.appspot.com",
  messagingSenderId: "877166731955",
  appId: "1:877166731955:web:ca2bb669350d26684fc6c6",
  measurementId: "G-3G2HRTSFJ2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);