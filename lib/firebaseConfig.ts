import { getApp, initializeApp } from "firebase/app";

export function firebaseConfig() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
  };
  return firebaseConfig;
}

export const createFirebaseApp = (config = {}) => {
  try {
    return getApp();
  } catch (err) {
    return initializeApp(config);
  }
};
