import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import useFirebase from "@/hooks/useFirebase";

export default function useAuth() {
  const { initFB, writeData } = useFirebase();
  const app = initFB();

  async function authSignup(email: string, password: string, name: string) {
    const auth: any = getAuth(app);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          console.log(
            "userCredential-createUserWithEmailAndPassword",
            userCredential
          );
          const user = userCredential.user;
          console.log("user", user);
          writeData(
            JSON.stringify(user.providerData[0]),
            `/users/${user.uid}/`
          );
        }
      );
      return await updateProfile(auth.currentUser, {
        displayName: name,
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
