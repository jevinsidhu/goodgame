import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp ({
    apiKey: "AIzaSyD6Zd13friRUqtxd3AnqxyTtGC33JEPjug",
    authDomain: "goodgame-e6e91.firebaseapp.com",
    projectId: "goodgame-e6e91",
    storageBucket: "goodgame-e6e91.appspot.com",
    messagingSenderId: "520995856077",
    appId: "1:520995856077:web:018f01825988a5d4059384"
  });

export const db = firebase.firestore();

export default app;