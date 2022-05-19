import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import { EmailPasswordCredentials } from '../../types/common';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

const app: firebase.FirebaseApp = firebase.initializeApp(firebaseConfig);
const auth: firebaseAuth.Auth = firebaseAuth.getAuth(app);

export const signup = async ({ email, password }: EmailPasswordCredentials): Promise<firebaseAuth.UserCredential> => {
  return await firebaseAuth.createUserWithEmailAndPassword(auth, email, password);
}

export const login = async ({ email, password }: EmailPasswordCredentials): Promise<firebaseAuth.UserCredential> => {
  return await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
}

export const logout = async (): Promise<void> => {
  await firebaseAuth.signOut(auth);
}

export const googleSignin = async (): Promise<void> => {
  await firebaseAuth.signInWithRedirect(auth, new firebaseAuth.GoogleAuthProvider());
}

export const getAuthErrorMessage = (error: firebase.FirebaseError): string => {
  switch (error.code) {
    case firebaseAuth.AuthErrorCodes.INVALID_EMAIL:
    case firebaseAuth.AuthErrorCodes.EMAIL_EXISTS:
      return 'Invalid email';
    case firebaseAuth.AuthErrorCodes.INVALID_PASSWORD:
    case firebaseAuth.AuthErrorCodes.WEAK_PASSWORD:
      return 'Invalid password';
    default:
      return 'Authentication error';
  }
}