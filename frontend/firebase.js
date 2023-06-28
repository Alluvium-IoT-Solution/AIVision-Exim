// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2tH2K0VIN4H8_GjU1Ya0-HpiiERZrI6E",
  authDomain: "exim-9f7e2.firebaseapp.com",
  projectId: "exim-9f7e2",
  storageBucket: "exim-9f7e2.appspot.com",
  messagingSenderId: "1098721315964",
  appId: "1:1098721315964:web:65f2a942e5e6631c39cdf9",
  measurementId: "G-V8W1ZSR86Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
