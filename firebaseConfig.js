// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCe67Ixz0Qc6HDmmy8KBJNncupKwcg2YqY",
  authDomain: "clone-8d790.firebaseapp.com",
  projectId: "clone-8d790",
  storageBucket: "clone-8d790.appspot.com",
  messagingSenderId: "143442938116",
  appId: "1:143442938116:web:7e7e2a964b50edf3526851",
  measurementId: "G-H49VK626DY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const analytics = getAnalytics(app);
export { app, auth, analytics };
