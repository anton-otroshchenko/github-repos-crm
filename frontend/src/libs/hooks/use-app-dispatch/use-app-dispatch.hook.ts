import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../modules/store/store.js";

const useAppDispatch: () => AppDispatch = useDispatch;

export { useAppDispatch };
