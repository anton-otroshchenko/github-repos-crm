import { ApiError } from "../types.js";

type ErrorResponse = {
	response: {
		data: {
			message: ApiError;
		};
	};
};

export { type ErrorResponse };
