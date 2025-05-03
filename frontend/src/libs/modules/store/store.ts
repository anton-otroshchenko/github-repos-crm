import { configureStore } from "@reduxjs/toolkit";
import { authReducer, authApi } from "~/modules/auth/auth.js";
import { githubProjectApi } from "~/modules/github-projects/github-projects.api.js";
import { githubProjectsReducer } from "~/modules/github-projects/slices/github-projects.slice.js";
import { handleError } from "./middleware/handle-error.middleware.js";

const store = configureStore({
	reducer: {
		auth: authReducer,
		projects: githubProjectsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: {
					authApi,
					githubProjectApi,
				},
			},
		}).prepend(handleError()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreExtraArgument = {
	authApi: typeof authApi;
	githubProjectApi: typeof githubProjectApi;
};

export { store };
