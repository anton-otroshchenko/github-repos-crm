import axios from "axios";
import {
	UserAuthResponseDto,
	UserSignInRequestDto,
	UserSignUpRequestDto,
} from "./libs/types/types.js";

const API_BASE_URL = "http://localhost:3000/auth";

const authApi = {
	async signIn(payload: UserSignInRequestDto): Promise<UserAuthResponseDto> {
		const response = await axios.post(`${API_BASE_URL}/sign-in`, payload);
		return response.data;
	},

	async signUp(payload: UserSignUpRequestDto): Promise<UserAuthResponseDto> {
		const response = await axios.post(`${API_BASE_URL}/sign-up`, payload);
		return response.data;
	},

	async getAuthenticatedUser(): Promise<UserAuthResponseDto> {
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
