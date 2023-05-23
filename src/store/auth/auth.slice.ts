import { createSlice } from "@reduxjs/toolkit";
import { AuthState, UserInfo } from "..";

export const authInitialState: AuthState = {
  status: "not-authenticated",
  uuid: null,
  displayName: null,
  photoUrl: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login: (state, { payload }: { payload: UserInfo }) => {
      state.status = "authenticated";
      state.photoUrl = payload.photoURL;
      state.displayName = payload.displayName;
      state.uuid = payload.uid;
    },
    logout: (state, action) => {},
    authStarted: (state) => {
      state.status = "checking";
      state.uuid = null;
      state.displayName = null;
      state.photoUrl = null;
      state.errorMessage = null;
    },
    authFailure: (state, { payload }: { payload: string }) => {
      state.status = "not-authenticated";
      state.errorMessage = payload;
    },
  },
});
export const { login, logout, authStarted, authFailure } = authSlice.actions;
