import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/root.reducer";
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
