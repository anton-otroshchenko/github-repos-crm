// async-thunk-config.ts
import type {
	RootState,
	StoreExtraArgument,
} from "../../modules/store/store.js";
import type { ApiError } from "../types.js";

type AsyncThunkConfig = {
	state: RootState;
	rejectValue: ApiError;
	extra: StoreExtraArgument;
};

export { type AsyncThunkConfig };
