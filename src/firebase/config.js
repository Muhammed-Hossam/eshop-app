import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCpPlnh6ery8lQIVrpbMJYcdABol-imx0o",
  authDomain: "eshop-124f4.firebaseapp.com",
  projectId: "eshop-124f4",
  storageBucket: "eshop-124f4.appspot.com",
  messagingSenderId: "364956610923",
  appId: "1:364956610923:web:e3a13db95ee7837f869c2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
