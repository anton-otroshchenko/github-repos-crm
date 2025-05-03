type CreateProjectPayload = {
	user_id: number;
	owner: string;
	repo_name: string;
	url: string;
	stars: number;
	forks: number;
	issues: number;
};

export { type CreateProjectPayload };
