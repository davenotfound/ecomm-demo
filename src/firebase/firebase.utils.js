import firebase from "firebase/compat/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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

export const createUserProfileDoc = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

const app = firebase.initializeApp(config);

export const auth = getAuth(app);
auth.tenantId = null;

export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signInWithEmailPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export const signUpWithEmailAndPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export default firebase;
