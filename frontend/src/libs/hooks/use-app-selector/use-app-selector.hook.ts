import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../../modules/store/store.js";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };
