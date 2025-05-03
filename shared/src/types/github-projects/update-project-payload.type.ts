import { GithubProject } from "./github-project.type.js";

type UpdateProjectPayload = {
	id: number;
	data: Partial<GithubProject>;
};

export { type UpdateProjectPayload };
