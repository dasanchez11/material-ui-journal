import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "../../auth/store";
import { AuthState } from "../../auth/models";
import { JournalState } from "../../journal/models/note.model";

export const initialReducers = {
  auth: authSlice.reducer,
};

export const rootReducer = combineReducers({
  ...initialReducers,
});

export interface RootState {
  auth: AuthState;
  journal: JournalState;
}

// export type RootState = ReturnType<typeof rootReducer>;
