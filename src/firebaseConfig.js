// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmDLE4JhK5eHqTotx8cRaWOcHKcINrFwk",
    authDomain: "docs-colne.firebaseapp.com",
    projectId: "docs-colne",
    storageBucket: "docs-colne.appspot.com",
    messagingSenderId: "371859770557",
    appId: "1:371859770557:web:1134d77896a24ed0ff3bd4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
