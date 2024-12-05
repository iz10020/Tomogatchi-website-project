// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, setDoc, doc } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfF_1QIaer7neTNZeR65Ey0WTF_7K3BHo",
  authDomain: "tamagotchi-faceb.firebaseapp.com",
  projectId: "tamagotchi-faceb",
  storageBucket: "tamagotchi-faceb.firebasestorage.app",
  messagingSenderId: "1098884638124",
  appId: "1:1098884638124:web:a6b7ed3bd9b1566cbec609",
  measurementId: "G-Q7QYP21F43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, getDocs, collection, setDoc, doc };