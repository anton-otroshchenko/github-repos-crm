import axios from "axios";
import type {
	GithubProject,
	AddProjectPayload,
	UpdateProjectPayload,
} from "./libs/types/types.js";

const baseUrl = import.meta.env["VITE_BASE_URL"];

const API_BASE_URL = `${baseUrl}/api/v1/projects`;

const githubProjectApi = {
	async getUserProjects(userId: number): Promise<GithubProject[]> {
		const token = localStorage.getItem("auth_token");
		const response = await axios.get(`${API_BASE_URL}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: { user_id: userId },
		});
		return response.data;
	},

	async addProject(payload: AddProjectPayload): Promise<GithubProject> {
		const token = localStorage.getItem("auth_token");
		const response = await axios.post(`${API_BASE_URL}`, payload, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	async getProject(id: number): Promise<GithubProject> {
		const token = localStorage.getItem("auth_token");
		const response = await axios.get(`${API_BASE_URL}/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	async update(
		id: number,
		data: Partial<UpdateProjectPayload>,
	): Promise<GithubProject> {
		const token = localStorage.getItem("auth_token");
		const response = await axios.put(`${API_BASE_URL}/${id}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	async delete(id: number): Promise<void> {
		const token = localStorage.getItem("auth_token");
		await axios.delete(`${API_BASE_URL}/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	async refreshProject(id: number): Promise<GithubProject> {
		const token = localStorage.getItem("auth_token");
		const response = await axios.post(
			`${API_BASE_URL}/${id}/refresh`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	},
};

export { githubProjectApi };
