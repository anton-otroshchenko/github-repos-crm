class GithubProjectRepository {
	githubProjectModel;
	constructor(githubProjectModel) {
		this.githubProjectModel = githubProjectModel;
	}
	async create(data) {
		return this.githubProjectModel.query().insert(data).returning("*");
	}
	async find(id) {
		return this.githubProjectModel
			.query()
			.findById(id)
			.withGraphFetched("user");
	}
	async findByUserAndRepo(userId, owner, repoName) {
		return this.githubProjectModel.query().findOne({
			user_id: userId,
			owner,
			repo_name: repoName,
		});
	}
	async getUserProjects(userId) {
		return this.githubProjectModel
			.query()
			.where({ user_id: userId })
			.orderBy("stars", "desc");
	}
	async update(id, data) {
		return this.githubProjectModel.query().patchAndFetchById(id, {
			...data,
			updated_at: new Date(),
		});
	}
	async delete(id) {
		return this.githubProjectModel.query().deleteById(id);
	}
	async bulkCreate(projects) {
		return await this.githubProjectModel
			.query()
			.insertGraph(projects)
			.returning("*");
	}
}
export { GithubProjectRepository };
