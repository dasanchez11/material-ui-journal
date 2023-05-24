import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo } from "react";
import { FirebaseAuth } from "../firebase/config";
import { useAppDispatch } from "../store";
import { login, logout } from "../store/auth/auth.slice";
import { useAppSelector } from "../store/hooks/useAppSelector.hook";

export const useAuth = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) dispatch(logout());
      const { displayName, email, uid, photoURL } = user as User;
      if (email) dispatch(login({ displayName, email, uid, photoURL }));
    });
  }, []);

  const loggedIn = useMemo(() => status === "authenticated", [status]);

  const checking = useMemo(() => status === "checking", [status]);

  const loggedOut = useMemo(() => status === "not-authenticated", [status]);

  return { status, loggedIn, checking, loggedOut };
};
