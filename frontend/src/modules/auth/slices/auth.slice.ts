import { createSlice } from "@reduxjs/toolkit";
import { type UserAuthResponseDto } from "../libs/types/types.js";
import { getAuthenticatedUser, logout, signIn, signUp } from "./auth.thunks.js";

type AuthState = {
	user: UserAuthResponseDto | null;
	isLoading: boolean;
	error: string | null;
};

const initialState: AuthState = {
	user: null,
	isLoading: false,
	error: null,
};

const SLICE_NAME = "auth";

const authSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(signIn.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
		});
		builder.addCase(signIn.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload ?? "Sign in failed";
		});

		builder.addCase(signUp.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
		});
		builder.addCase(signUp.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload ?? "Sign up failed";
		});

		builder.addCase(getAuthenticatedUser.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
		});
		builder.addCase(getAuthenticatedUser.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload ?? "Failed to get authenticated user";
		});

		builder.addCase(logout.fulfilled, (state) => {
			state.user = null;
			state.error = null;
		});
	},
});

export const { reducer: authReducer } = authSlice;
export const { actions: authActions } = authSlice;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectCurrentUser = (state: { auth: AuthState }) =>
	state.auth.user;
export const selectAuthLoading = (state: { auth: AuthState }) =>
	state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export type { AuthState };
