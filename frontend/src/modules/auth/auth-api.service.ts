import axios from "axios";
import {
	UserAuthResponseDto,
	UserSignInRequestDto,
	UserSignUpRequestDto,
} from "./libs/types/types.js";
import { User } from "shared";

const baseUrl = import.meta.env["VITE_BASE_URL"];

const API_BASE_URL = `${baseUrl}/api/v1/auth`;

const authApi = {
	async signIn(payload: UserSignInRequestDto): Promise<UserAuthResponseDto> {
		const response = await axios.post(`${API_BASE_URL}/sign-in`, payload);
		return response.data;
	},

	async signUp(payload: UserSignUpRequestDto): Promise<UserAuthResponseDto> {
		const response = await axios.post(`${API_BASE_URL}/sign-up`, payload);
		return response.data;
	},

	async getAuthenticatedUser(): Promise<User> {
		const token = localStorage.getItem("auth_token");
		const response = await axios.get(`${API_BASE_URL}/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},
};

export { authApi };
