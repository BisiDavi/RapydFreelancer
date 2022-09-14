import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

import useFirebase from "@/hooks/useFirebase";

type dataType = {
  email: string;
  password: string;
  name: string;
  role: string;
};

export default function useAuth() {
  const { initFB, writeData } = useFirebase();
  const app = initFB();

  async function authSignup(data: dataType) {
    const { email, password, name } = data;
    const auth: any = getAuth(app);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          console.log(
            "userCredential-createUserWithEmailAndPassword",
            userCredential
          );
          const user = userCredential.user;
          writeData(
            JSON.stringify(user.providerData[0]),
            `/users/${user.uid}/`
          );
        }
      );
      return await updateProfile(auth.currentUser, {
        displayName: name,
      }).then(() => {
        axios.post("/api/db", {
          collection: "users",
          data,
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  function authSignIn(email: string, password: string) {
    const auth = getAuth(app);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function authSignOut() {
    const auth = getAuth(app);
    return signOut(auth);
  }

  function authDetails() {
    const auth = getAuth(app);
    return auth?.currentUser;
  }

  return { authSignup, authSignIn, authSignOut, authDetails };
}
