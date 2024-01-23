import { initializeApp} from "firebase-admin/app";
import { getAuth} from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBKdgmA00QdRPp5n48KCPg6H7KWXx2JZAc",
  authDomain: "localhost:9099",
  projectId: "rn-socialmedia-382203",
  storageBucket: "rn-socialmedia-382203.appspot.com",
  messagingSenderId: "380957708851",
  appId: "1:380957708851:web:e6e1873952f5c7ba024946"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firebaseDB = getFirestore();

export { app, auth, firebaseDB };
