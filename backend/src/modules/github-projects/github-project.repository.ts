import { type GithubProjectModel } from "./github-project.model.js";

class GithubProjectRepository {
	private githubProjectModel: typeof GithubProjectModel;

	public constructor(githubProjectModel: typeof GithubProjectModel) {
		this.githubProjectModel = githubProjectModel;
	}

	public async create(
		data: Partial<GithubProjectModel>,
	): Promise<GithubProjectModel> {
		return this.githubProjectModel.query().insert(data).returning("*");
	}

	public async find(
		id: number,
	): Promise<null | GithubProjectModel | undefined> {
		return this.githubProjectModel
			.query()
			.findById(id)
			.withGraphFetched("user");
	}

	public async findByUserAndRepo(
		userId: number,
		owner: string,
		repoName: string,
	): Promise<null | GithubProjectModel | undefined> {
		return this.githubProjectModel.query().findOne({
			user_id: userId,
			owner,
			repo_name: repoName,
		});
	}

	public async getUserProjects(userId: number): Promise<GithubProjectModel[]> {
		return this.githubProjectModel
			.query()
			.where({ user_id: userId })
			.orderBy("stars", "desc");
	}

	public async update(
		id: number,
		data: Partial<GithubProjectModel>,
	): Promise<GithubProjectModel> {
		return this.githubProjectModel.query().patchAndFetchById(id, {
			...data,
			updated_at: new Date(),
		});
	}

	public async delete(id: number): Promise<number> {
		return this.githubProjectModel.query().deleteById(id);
	}

	public async bulkCreate(
		projects: Partial<GithubProjectModel>[],
	): Promise<GithubProjectModel[]> {
		return await this.githubProjectModel
			.query()
			.insertGraph(projects)
			.returning("*");
	}

	public async deleteByUserId(userId: number): Promise<number> {
		return this.githubProjectModel.query().where({ user_id: userId }).delete();
	}
}

export { GithubProjectRepository };
