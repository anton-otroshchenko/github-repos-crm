import { type GithubProjectRepository } from "./github-project.repository.js";
import { github } from "../../libs/github/github.js";
import {
	GitHubRepoResponse,
	GithubProject,
	AddProjectPayload,
	CreateProjectPayload,
} from "shared";
import { GithubProjectMapper } from "./github-project.mapper.js";

class GithubProjectService {
	private githubProjectRepository: GithubProjectRepository;

	public constructor(githubProjectRepository: GithubProjectRepository) {
		this.githubProjectRepository = githubProjectRepository;
	}

	public async addProject(payload: AddProjectPayload): Promise<GithubProject> {
		const [owner, repoName] = this.validateRepoPath(payload.repoPath);
		await this.verifyProjectDoesntExist(payload.userId, owner, repoName);
		const repoData = await github.getRepository(owner, repoName);
		return await this.createProjectFromGitHubData(payload.userId, repoData);
	}

	public async refreshProject(projectId: number): Promise<GithubProject> {
		const project = await this.getProjectById(projectId);
		const repoData = await github.getRepository(
			project.owner,
			project.repoName,
		);

		const updatedProject = await this.githubProjectRepository.update(
			projectId,
			{
				stars: repoData.stargazers_count,
				forks: repoData.forks_count,
				open_issues: repoData.open_issues_count,
				updated_at: new Date(),
			},
		);

		return GithubProjectMapper.toDomain(updatedProject);
	}

	public async create(payload: CreateProjectPayload): Promise<GithubProject> {
		await this.verifyProjectDoesntExist(
			payload.user_id,
			payload.owner,
			payload.repo_name,
		);

		const project = await this.githubProjectRepository.create(payload);
		return GithubProjectMapper.toDomain(project);
	}

	public async find(id: number): Promise<GithubProject> {
		const project = await this.githubProjectRepository.find(id);
		if (!project) {
			throw new Error(`Project with ID ${id} not found.`);
		}
		return GithubProjectMapper.toDomain(project);
	}

	public async getUserProjects(userId: number): Promise<GithubProject[]> {
		const projects = await this.githubProjectRepository.getUserProjects(userId);
		return projects.map(GithubProjectMapper.toDomain);
	}

	public async update(
		id: number,
		data: Partial<GithubProject>,
	): Promise<GithubProject> {
		await this.getProjectById(id);
		const updatedProject = await this.githubProjectRepository.update(
			id,
			GithubProjectMapper.toPersistence(data),
		);
		return GithubProjectMapper.toDomain(updatedProject);
	}

	public async delete(id: number): Promise<void> {
		await this.getProjectById(id); // Verify project exists
		await this.githubProjectRepository.delete(id);
	}

	public async syncUserProjects(
		userId: number,
		projects: CreateProjectPayload[],
	): Promise<GithubProject[]> {
		await this.githubProjectRepository.deleteByUserId(userId);
		const createdProjects =
			await this.githubProjectRepository.bulkCreate(projects);
		return createdProjects.map(GithubProjectMapper.toDomain);
	}

	private async createProjectFromGitHubData(
		userId: number,
		repoData: GitHubRepoResponse,
	): Promise<GithubProject> {
		const project = await this.githubProjectRepository.create({
			user_id: userId,
			owner: repoData.owner.login,
			repoName: repoData.name,
			repo_url: repoData.html_url,
			stars: repoData.stargazers_count,
			forks: repoData.forks_count,
			open_issues: repoData.open_issues_count,
			createdAtUnix: repoData.created_at,
		});

		return GithubProjectMapper.toDomain(project);
	}

	private async verifyProjectDoesntExist(
		userId: number,
		owner: string,
		repoName: string,
	): Promise<void> {
		const existing = await this.githubProjectRepository.findByUserAndRepo(
			userId,
			owner,
			repoName,
		);
		if (existing) {
			throw new Error(
				`Repository ${owner}/${repoName} already exists in your projects`,
			);
		}
	}

	private validateRepoPath(repoPath: string): [string, string] {
		const [owner, repoName] = repoPath.split("/");
		if (!owner || !repoName) {
			throw new Error('Invalid repository path format. Use "owner/repo"');
		}
		return [owner, repoName];
	}

	private async getProjectById(id: number): Promise<GithubProject> {
		const project = await this.githubProjectRepository.find(id);
		if (!project) {
			throw new Error(`Project with ID ${id} not found`);
		}
		return GithubProjectMapper.toDomain(project);
	}
}

export { GithubProjectService };
export type { GithubProject, CreateProjectPayload, AddProjectPayload };
