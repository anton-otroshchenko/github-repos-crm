import { isRejected, type Middleware } from "@reduxjs/toolkit";
import { notification } from "../../notification/notification.module.js";

const handleError = (): Middleware => {
	return () => {
		return (next) => (action) => {
			if (isRejected(action)) {
				const message =
					action.meta?.rejectedWithValue && typeof action.payload === "string"
						? action.payload
						: (action.error?.message ?? "Unexpected error");

				notification.error(message);
			}

			return next(action);
		};
	};
};

export { handleError };
