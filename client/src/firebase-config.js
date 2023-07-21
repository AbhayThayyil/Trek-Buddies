import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDdb_ngjsZ2_-TyN7PBS-vwBQHaKaWioOA",
  authDomain: "trekbuddies.firebaseapp.com",
  projectId: "trekbuddies",
  storageBucket: "trekbuddies.appspot.com",
  messagingSenderId: "683176120040",
  appId: "1:683176120040:web:19ed1519e904d2ac2d035d",
};

const app = initializeApp(firebaseConfig);
export default app;
