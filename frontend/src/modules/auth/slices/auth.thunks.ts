import { createAsyncThunk } from "@reduxjs/toolkit";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserAuthResponseDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "../libs/types/types.js";

const TOKEN_KEY = "auth_token";

const signIn = createAsyncThunk<
	UserAuthResponseDto,
	UserSignInRequestDto,
	AsyncThunkConfig
>("auth/sign-in", async (payload, { extra }) => {
	const { authApi } = extra;

	const response = await authApi.signIn(payload);
	localStorage.setItem(TOKEN_KEY, response.token);

	return response;
});

const getAuthenticatedUser = createAsyncThunk<
	UserAuthResponseDto | null,
	undefined,
	AsyncThunkConfig
>("auth/get-authenticated-user", async (_payload, { extra }) => {
	const { authApi } = extra;
	const token = localStorage.getItem(TOKEN_KEY);

	if (!token) {
		return null;
	}

	try {
		return await authApi.getAuthenticatedUser();
	} catch (error) {
		localStorage.removeItem(TOKEN_KEY);
		return null;
	}
});

const signUp = createAsyncThunk<
	UserAuthResponseDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>("auth/sign-up", async (payload, { extra }) => {
	const { authApi } = extra;

	const response = await authApi.signUp(payload);
	localStorage.setItem(TOKEN_KEY, response.token);

	return response;
});

const logout = createAsyncThunk<void, undefined, AsyncThunkConfig>(
	"auth/logout",
	async () => {
		localStorage.removeItem(TOKEN_KEY);
	},
);

export { getAuthenticatedUser, logout, signIn, signUp };
