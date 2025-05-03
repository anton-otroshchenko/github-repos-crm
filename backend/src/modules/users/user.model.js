import { Model } from "objection";
import { GithubProjectModel } from "~/modules/github-projects/github-project.model.js";
class UserModel extends Model {
	id;
	email;
	password_hash;
	password_salt;
	created_at;
	updated_at;
	static get tableName() {
		return "users";
	}
	static get relationMappings() {
		return {
			githubProjects: {
				relation: Model.HasManyRelation,
				modelClass: GithubProjectModel,
				join: {
					from: "users.id",
					to: "github_projects.user_id",
				},
			},
		};
	}
	$beforeInsert() {
		this.created_at = new Date();
		this.updated_at = new Date();
	}
	$beforeUpdate() {
		this.updated_at = new Date();
	}
}
export { UserModel };
