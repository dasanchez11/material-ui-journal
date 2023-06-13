import {
  AppDispatch,
  registerWithEmailAndPassword,
  signInWithEmail,
  signInWithGoogle,
  signOutFirebase,
} from "../../common";
import { AuthLogin, AuthRegister, UserInfo } from "../models";
import { authFailure, authStarted, login, logout } from "./auth.slice";

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
