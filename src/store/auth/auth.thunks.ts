import { AppDispatch, UserInfo } from "..";
import { authFailure, authStarted, login, logout } from "./auth.slice";
import {
  registerWithEmailAndPassword,
  signInWithEmail,
  signInWithGoogle,
  signOutFirebase,
} from "../../firebase/providers";
import { AuthLogin, AuthRegister } from "../../auth/models";

export const loginAsync = ({ email, password }: AuthLogin) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authStarted());
    try {
      const result = await signInWithEmail(email, password);
      dispatch(login(result.userInfo as UserInfo));
    } catch (error: any) {
      dispatch(authFailure(error.message));
    }
  };
};

export const registerAsync = ({
  email,
  password,
  displayName,
}: AuthRegister) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authStarted());
    try {
      const result = await registerWithEmailAndPassword(
        email,
        password,
        displayName
      );
      dispatch(login(result.userInfo as UserInfo));
    } catch (error: any) {
      dispatch(authFailure(error.message));
    }
  };
};

export const googleLoginAsync = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(authStarted());
    try {
      const result = await signInWithGoogle();
      dispatch(login(result.userInfo as UserInfo));
    } catch (error: any) {
      dispatch(authFailure(error.message));
    }
  };
};

export const logoutAsync = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authStarted());
      await signOutFirebase();
      dispatch(logout());
    } catch (error: any) {
      dispatch(authFailure(error.message));
    }
  };
};
