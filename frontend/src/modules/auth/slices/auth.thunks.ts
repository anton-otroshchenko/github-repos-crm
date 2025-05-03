import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	type UserAuthResponseDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "../libs/types/types.js";
import { User } from "shared";
import { ErrorResponse, AsyncThunkConfig } from "~/libs/types/types.js";

const TOKEN_KEY = "auth_token";

const signIn = createAsyncThunk<
	UserAuthResponseDto,
	UserSignInRequestDto,
	AsyncThunkConfig
>("auth/sign-in", async (payload, { extra, rejectWithValue }) => {
	const { authApi } = extra;

	try {
		const response = await authApi.signIn(payload);
		localStorage.setItem(TOKEN_KEY, response.token);
		return response;
	} catch (error) {
		const message =
			(error as ErrorResponse)?.response?.data?.message ?? "Failed to sign in";
		return rejectWithValue(message);
	}
});

const getAuthenticatedUser = createAsyncThunk<
	User | null,
	undefined,
	AsyncThunkConfig
>(
	"auth/get-authenticated-user",
	async (_payload, { extra, rejectWithValue }) => {
		const { authApi } = extra;
		const token = localStorage.getItem(TOKEN_KEY);

		if (!token) {
			return null;
		}

		try {
			return await authApi.getAuthenticatedUser();
		} catch (error) {
			localStorage.removeItem(TOKEN_KEY);
			const message =
				(error as ErrorResponse)?.response?.data?.message ??
				"Failed to fetch user";
			return rejectWithValue(message);
		}
	},
);

const signUp = createAsyncThunk<
	UserAuthResponseDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>("auth/sign-up", async (payload, { extra, rejectWithValue }) => {
	const { authApi } = extra;

	try {
		const response = await authApi.signUp(payload);
		localStorage.setItem(TOKEN_KEY, response.token);
		return response;
	} catch (error) {
		const message =
			(error as ErrorResponse)?.response?.data?.message ?? "Failed to sign up";
		return rejectWithValue(message);
	}
});

const logout = createAsyncThunk<void, undefined, AsyncThunkConfig>(
	"auth/logout",
	async () => {
		localStorage.removeItem(TOKEN_KEY);
	},
);

export { getAuthenticatedUser, logout, signIn, signUp };
