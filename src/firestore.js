import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyANLKoNk8GBI1O97nM61H6MO-NFe83Q3pU",
  authDomain: "stackathon-diane.firebaseapp.com",
  databaseURL: "https://stackathon-diane.firebaseio.com",
  projectId: "stackathon-diane",
  storageBucket: "stackathon-diane.appspot.com",
  messagingSenderId: "701140408793",
  appId: "1:701140408793:web:6c8fe98e2ca8bdbd0f21c8",
  measurementId: "G-XY1PJYK0ZX",
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export default firestore;
