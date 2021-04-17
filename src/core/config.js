import Firebase from "firebase";
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAxvunrw8pImfoIo0DqeOlboQ2gQ6yv20U",
  authDomain: "suhail-f1d6e.firebaseapp.com",
  databaseURL: "https://suhail-f1d6e-default-rtdb.firebaseio.com",
  projectId: "suhail-f1d6e",
  storageBucket: "suhail-f1d6e.appspot.com",
  messagingSenderId: "1077938571585",
  appId: "1:1077938571585:web:64cdc8cc7a19a8bcb779c0",
  measurementId: "G-YW017YYPJ3"
}
const app = Firebase.initializeApp(FIREBASE_CONFIG);
export const db = app.database();
