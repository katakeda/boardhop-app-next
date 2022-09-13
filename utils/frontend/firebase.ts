import * as firebase from 'firebase/app';
import * as firebaseStorage from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLOUD_STORAGE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app: firebase.FirebaseApp = firebase.initializeApp(firebaseConfig);
const storage: firebaseStorage.FirebaseStorage =
  firebaseStorage.getStorage(app);

export const uploadFile = async (
  file: Blob,
  name: string
): Promise<firebaseStorage.UploadResult> => {
  return await firebaseStorage.uploadBytes(
    firebaseStorage.ref(storage, name),
    file
  );
};
