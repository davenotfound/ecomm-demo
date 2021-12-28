import firebase from "firebase/compat/app";
import { getAuth, signInWithPopup } from "firebase/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyBq_bV20rSkBPSr0I_b0elKsGvRG67OAuY",
  authDomain: "ecomm-demo-db.firebaseapp.com",
  projectId: "ecomm-demo-db",
  storageBucket: "ecomm-demo-db.appspot.com",
  messagingSenderId: "949814759291",
  appId: "1:949814759291:web:1373e88c92f74a9ff737de",
  measurementId: "G-WKQXRZSVLP",
};

firebase.initializeApp(config);

const auth = getAuth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebase;
