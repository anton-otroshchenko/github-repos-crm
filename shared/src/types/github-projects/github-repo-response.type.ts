type GitHubRepoResponse = {
	id: number;
	name: string;
	full_name: string;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
	created_at: number;
	updated_at: number;
	owner: {
		login: string;
	};
};

export { GitHubRepoResponse };
