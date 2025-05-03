import { type UserModel } from "./user.model.js";
import { UserCreateEntity } from "shared";

class UserRepository {
	private userModel: typeof UserModel;

	public constructor(userModel: typeof UserModel) {
		this.userModel = userModel;
	}

	public async create(entity: UserCreateEntity): Promise<UserModel> {
		const { email, passwordHash, passwordSalt } = entity;

		return this.userModel
			.query()
			.insert({
				email,
				passwordHash: passwordHash,
				passwordSalt: passwordSalt,
			})
			.returning("*");
	}

	public async find(id: number): Promise<null | UserModel | undefined> {
		return this.userModel.query().findById(id);
	}

	public async findByEmail(
		email: string,
	): Promise<null | UserModel | undefined> {
		return this.userModel.query().findOne({ email });
	}
}

export { UserRepository };
