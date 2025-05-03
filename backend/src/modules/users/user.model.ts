import { Model, type RelationMappings } from "objection";
import { GithubProjectModel } from "~/modules/github-projects/github-project.model.js";

class UserModel extends Model {
	public id!: number;

	public email!: string;
	public password_hash!: string;
	public password_salt!: string;
	public created_at!: Date;
	public updated_at!: Date;

	public static override get tableName(): string {
		return "users";
	}

	static get relationMappings(): RelationMappings {
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
