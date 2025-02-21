
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcSoYaYq02ut7bn3d6orUDat3FHXcEppg",
  authDomain: "college-managemnet-system.firebaseapp.com",
  projectId: "college-managemnet-system",
  storageBucket: "college-managemnet-system.firebasestorage.app",
  messagingSenderId: "762026980468",
  appId: "1:762026980468:web:ca0b817ffa474a052ccd21",
  measurementId: "G-0FRNPF7PBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);