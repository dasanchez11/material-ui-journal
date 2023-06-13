import { combineReducers } from "@reduxjs/toolkit";
import { Reducer, AnyAction } from "redux";
import { RootState } from "./root.reducer";

export function injectAsyncReducer(
  store: any,
  name: string,
  asyncReducer: Reducer<any, AnyAction>
) {
  if (store.asyncReducers[name]) {
    return;
  }
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(
    combineReducers<RootState>({
      ...store.asyncReducers,
    })
  );
}
