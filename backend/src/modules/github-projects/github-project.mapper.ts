import { GithubProject } from "shared";
import { type GithubProjectModel } from "./github-project.model.js";

export class GithubProjectMapper {
	public static toDomain(model: GithubProjectModel): GithubProject {
		return {
			id: model.id,
			userId: model.user_id,
			owner: model.owner,
			repoName: model.repoName,
			repoUrl: model.repo_url,
			stars: model.stars,
			issues: model.open_issues,
			forks: model.forks,
			createdAtUnix: model.createdAtUnix,
		};
	}

	public static toPersistence(
		domain: Partial<GithubProject>,
	): Partial<GithubProjectModel> {
		return {
			user_id: domain.userId as number,
			owner: domain.owner as string,
			repoName: domain.repoName as string,
			repo_url: domain.repoUrl as string,
			stars: domain.stars as number,
			open_issues: domain.issues as number,
			forks: domain.forks as number,
			createdAtUnix: domain.createdAtUnix as number,
		};
	}
}
