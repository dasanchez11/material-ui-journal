import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";
import { FirebaseError } from "@firebase/util";

const googleProvider = new GoogleAuthProvider();

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { displayName, photoURL, uid } = result.user;
    return { ok: true, userInfo: { displayName, photoURL, uid, email } };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { ok: false, message: error.message };
    } else throw new Error("Unexpected Error ocurred");
  }
};

export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    await updateProfile(result.user, { displayName });
    const { photoURL, uid } = result.user;
    return { ok: true, userInfo: { displayName, photoURL, uid, email } };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { ok: false, message: error.message };
    } else throw new Error("Unexpected Error ocurred");
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, photoURL, uid, email } = result.user;
    return { ok: true, userInfo: { displayName, photoURL, uid, email } };
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    } else throw new Error("Unexpected Error ocurred");
  }
};
