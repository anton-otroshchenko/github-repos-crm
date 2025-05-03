import { GithubProject } from "./github-project.type.js";

type ProjectsState = {
	projects: GithubProject[] | null;
	isLoading: boolean;
	error: string | null;
};

export { type ProjectsState };
