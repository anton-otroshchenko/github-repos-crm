import { createSlice, isRejected } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GithubProject, ProjectsState } from "../libs/types/types.js";
import {
	addProject,
	deleteProject,
	fetchUserProjects,
	refreshProject,
	updateProject,
} from "./github-projects.thunks.js";
import { RootState } from "../../../libs/modules/store/store.js";

const initialState: ProjectsState = {
	projects: null,
	isLoading: false,
	error: null,
};

const SLICE_NAME = "githubProjects";

const githubProjectsSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		clearProjects(state) {
			state.projects = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchUserProjects.fulfilled,
			(state, action: PayloadAction<GithubProject[]>) => {
				state.isLoading = false;
				state.projects = action.payload;
			},
		);

		builder.addCase(
			addProject.fulfilled,
			(state, action: PayloadAction<GithubProject>) => {
				state.isLoading = false;
				if (state.projects) {
					state.projects.push(action.payload);
				}
			},
		);

		builder.addCase(
			updateProject.fulfilled,
			(state, action: PayloadAction<GithubProject>) => {
				state.isLoading = false;
				if (!state.projects) return;
				const index = state.projects.findIndex(
					(p) => p.id === action.payload.id,
				);
				if (index !== -1) {
					state.projects[index] = action.payload;
				}
			},
		);

		builder.addCase(
			deleteProject.fulfilled,
			(state, action: PayloadAction<number>) => {
				state.isLoading = false;
				if (state.projects) {
					state.projects = state.projects.filter(
						(p) => p.id !== action.payload,
					);
				}
			},
		);

		builder.addCase(
			refreshProject.fulfilled,
			(state, action: PayloadAction<GithubProject>) => {
				state.isLoading = false;
				if (!state.projects) return;
				const index = state.projects.findIndex(
					(p) => p.id === action.payload.id,
				);
				if (index !== -1) {
					state.projects[index] = action.payload;
				}
			},
		);

		builder.addMatcher(
			(action) => action.type.endsWith("/pending"),
			(state) => {
				state.isLoading = true;
				state.error = null;
			},
		);

		builder.addMatcher(isRejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message || "An error occurred";
		});
	},
});

export const selectProjectsState = (state: RootState) => state.projects;

export const selectProjects = (state: RootState) =>
	selectProjectsState(state)?.projects;

export const selectIsLoading = (state: RootState) =>
	selectProjectsState(state)?.isLoading;

export const selectError = (state: RootState) =>
	selectProjectsState(state)?.error;

export const { clearProjects } = githubProjectsSlice.actions;
export const githubProjectsReducer = githubProjectsSlice.reducer;
