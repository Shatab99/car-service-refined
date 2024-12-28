// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi4sAPkqx2Nz5Qq6tDfSgAPLVr-X0HK_M",
  authDomain: "car-service-8d039.firebaseapp.com",
  projectId: "car-service-8d039",
  storageBucket: "car-service-8d039.appspot.com",
  messagingSenderId: "2379436086",
  appId: "1:2379436086:web:fbb15db50cbf2071280897"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)