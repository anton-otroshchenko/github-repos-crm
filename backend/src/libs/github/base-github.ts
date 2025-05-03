import axios, { type AxiosInstance } from "axios";
import { config } from "../config/config.js";
import { GitHubRepoResponse } from "shared";

class BaseGithub {
	private apiClient: AxiosInstance;
	private baseUrl: string;

	public constructor() {
		this.baseUrl = config.GITHUB.API_URL;

		this.apiClient = axios.create({
			baseURL: this.baseUrl,
			headers: {
				"Accept": "application/vnd.github.v3+json",
				"Authorization": config.GITHUB.TOKEN,
			},
		});
	}

	public async getRepository(
		owner: string,
		repo: string,
	): Promise<GitHubRepoResponse> {
		try {
			const response = await this.apiClient.get<GitHubRepoResponse>(
				`/repos/${owner}/${repo}`,
			);
			return response.data;
		} catch (error) {
			this.handleApiError(error, "Failed to fetch repository");
		}
	}

	private handleApiError(error: unknown, defaultMessage: string): never {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 404) {
				throw new Error("Resource not found on GitHub");
			}
			if (error.response?.status === 403) {
				throw new Error("GitHub API rate limit exceeded");
			}
			throw new Error(`${defaultMessage}: ${error.message}`);
		}
		throw new Error(defaultMessage);
	}
}

export { BaseGithub };
