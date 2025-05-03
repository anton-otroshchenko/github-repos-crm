import { Model } from "objection";
import { UserModel } from "~/modules/users/user.model.js";
class GithubProjectModel extends Model {
	id;
	user_id;
	owner;
	repo_name;
	repo_url;
	stars = 0;
	forks = 0;
	open_issues = 0;
	created_at_unix;
	added_at;
	updated_at;
	user;
	static get tableName() {
		return "github_projects";
	}
	static get relationMappings() {
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: UserModel,
				join: {
					from: "github_projects.user_id",
					to: "users.id",
				},
			},
		};
	}
	$beforeInsert() {
		this.added_at = new Date();
		this.updated_at = new Date();
	}
	$beforeUpdate() {
		this.updated_at = new Date();
	}
}
export { GithubProjectModel };
