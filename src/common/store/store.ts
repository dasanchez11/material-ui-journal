import { configureStore } from "@reduxjs/toolkit";
import { initialReducers, rootReducer } from "./root.reducer";

export type InitialStore = typeof initialStore;
const initialStore = configureStore({
  reducer: rootReducer,
});

export type Store = InitialStore & { asyncReducers?: any };
const store: Store = initialStore;
export type RootState = ReturnType<typeof store.getState>;

store.asyncReducers = { ...initialReducers };
export default store;
