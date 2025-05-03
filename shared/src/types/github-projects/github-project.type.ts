type GithubProject = {
	id: number;
	userId: number;
	owner: string;
	repoName: string;
	repoUrl: string;
	stars: number;
	forks: number;
	issues: number;
	createdAtUnix: number;
};

export { type GithubProject };
