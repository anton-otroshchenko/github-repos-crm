import { Model, type RelationMappings } from "objection";
import { UserModel } from "~/modules/users/user.model.js";

class GithubProjectModel extends Model {
	public id!: number;

	public user_id!: number;

	public owner!: string;
	public repo_name!: string;
	public repo_url!: string;
	public stars: number = 0;
	public forks: number = 0;
	public open_issues: number = 0;
	public created_at_unix!: number;
	public added_at!: Date;
	public updated_at!: Date;

	public user?: UserModel;

	public static override get tableName(): string {
		return "github_projects";
	}

	static get relationMappings(): RelationMappings {
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
