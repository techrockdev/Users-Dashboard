import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "gobet-admin-dashboard.firebaseapp.com",
  databaseURL: "https://gobet-admin-dashboard-default-rtdb.firebaseio.com",
  projectId: "gobet-admin-dashboard",
  storageBucket: "gobet-admin-dashboard.appspot.com",
  messagingSenderId: "1036518452845",
  appId: "1:1036518452845:web:20e0deac10fa5754541964",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
export { app, auth, storage, db };
