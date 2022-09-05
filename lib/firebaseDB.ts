import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

import { createFirebaseApp, firebaseConfig } from "@/lib/firebaseConfig";

export default function firebaseDB() {
  function initFB() {
    const config = firebaseConfig();
    const app = createFirebaseApp(config);
    return app;
  }
  function getAuthdetails() {
    const app = initFB();
    const auth = getAuth(app);
    const user = auth.currentUser;
    const currentUser: any = {};
    if (user !== null) {
      currentUser.displayName = user.displayName;
      currentUser.email = user.email;
      currentUser.photoURL = user.photoURL;
      currentUser.emailVerified = user.emailVerified;
      currentUser.uid = user.uid;
    }
    return currentUser;
  }

  function authDetails() {
    const app = initFB();
    const auth = getAuth(app);
    return auth?.currentUser;
  }

  function initializeDB() {
    const app = initFB();
    const db = getDatabase(app);
    return db;
  }

  function writeData(data: any, dbNode: string) {
    const db = initializeDB();
    return set(ref(db, dbNode), data);
  }

  function readData(dbNode: string, result: any) {
    const db = initializeDB();
    const dataRef = ref(db, dbNode);
    onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("data-readData-onvalue,", data);
        result.data = data;
      },
      (error) => {
        console.log("error-readdata", error);
      }
    );
  }

  return { getAuthdetails, authDetails, initFB, writeData, readData };
}
