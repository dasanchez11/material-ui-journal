export * from "./router";
import { journalSlice } from "./store/journal.slice";
export const reducer = journalSlice.reducer;
