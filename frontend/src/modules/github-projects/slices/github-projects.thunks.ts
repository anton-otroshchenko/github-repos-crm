import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	type AddProjectPayload,
	type GithubProject,
	type UpdateProjectPayload,
} from "../libs/types/types.js";
import { ErrorResponse, AsyncThunkConfig } from "~/libs/types/types.js";

const fetchUserProjects = createAsyncThunk<
	GithubProject[],
	number,
	AsyncThunkConfig
>(
	"githubProjects/fetchUserProjects",
	async (userId, { extra, rejectWithValue }) => {
		const { githubProjectApi } = extra;

		try {
			return await githubProjectApi.getUserProjects(userId);
		} catch (error) {
			const message =
				(error as ErrorResponse)?.response?.data?.message ??
				"Failed to fetch user projects";
			return rejectWithValue(message);
		}
	},
);

const addProject = createAsyncThunk<
	GithubProject,
	AddProjectPayload,
	AsyncThunkConfig
>("githubProjects/addProject", async (payload, { extra, rejectWithValue }) => {
	const { githubProjectApi } = extra;

	try {
		return await githubProjectApi.addProject(payload);
	} catch (error) {
		const message =
			(error as ErrorResponse)?.response?.data?.message ??
			"Failed to add project";
		return rejectWithValue(message);
	}
});

const updateProject = createAsyncThunk<
	GithubProject,
	UpdateProjectPayload,
	AsyncThunkConfig
>(
	"githubProjects/updateProject",
	async (payload, { extra, rejectWithValue }) => {
		const { githubProjectApi } = extra;

		try {
			return await githubProjectApi.update(payload.id, payload.data);
		} catch (error) {
			const message =
				(error as ErrorResponse)?.response?.data?.message ??
				"Failed to update project";
			return rejectWithValue(message);
		}
	},
);

const deleteProject = createAsyncThunk<number, number, AsyncThunkConfig>(
	"githubProjects/deleteProject",
	async (projectId, { extra, rejectWithValue }) => {
		const { githubProjectApi } = extra;

		try {
			await githubProjectApi.delete(projectId);
			return projectId;
		} catch (error) {
			const message =
				(error as ErrorResponse)?.response?.data?.message ??
				"Failed to delete project";
			return rejectWithValue(message);
		}
	},
);

const refreshProject = createAsyncThunk<
	GithubProject,
	number,
	AsyncThunkConfig
>(
	"githubProjects/refreshProject",
	async (projectId, { extra, rejectWithValue }) => {
		const { githubProjectApi } = extra;

		try {
			return await githubProjectApi.refreshProject(projectId);
		} catch (error) {
			const message =
				(error as ErrorResponse)?.response?.data?.message ??
				"Failed to refresh project";
			return rejectWithValue(message);
		}
	},
);

export {
	fetchUserProjects,
	addProject,
	updateProject,
	deleteProject,
	refreshProject,
};
