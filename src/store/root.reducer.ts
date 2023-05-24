import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth.slice";
import { journalSlice } from "./journal/journal.slice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  journal: journalSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
