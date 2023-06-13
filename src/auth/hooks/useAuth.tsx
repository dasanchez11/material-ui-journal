import { useEffect, useMemo } from "react";
import { FirebaseAuth, useAppDispatch, useAppSelector } from "../../common";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store";
import { UserInfo } from "../models";

export const useAuth = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { displayName, email, uid, photoURL } = user as UserInfo;
      if (email) dispatch(login({ displayName, email, uid, photoURL }));
    });
  }, []);

  const loggedIn = useMemo(() => status === "authenticated", [status]);
  const checking = useMemo(() => status === "checking", [status]);
  const loggedOut = useMemo(() => status === "not-authenticated", [status]);

  return { status, loggedIn, checking, loggedOut };
};
