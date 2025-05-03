class UserRepository {
	userModel;
	constructor(userModel) {
		this.userModel = userModel;
	}
	async create(entity) {
		const { email, passwordHash, passwordSalt } = entity;
		console.log(entity);
		return this.userModel
			.query()
			.insert({
				email,
				password_hash: passwordHash,
				password_salt: passwordSalt,
			})
			.returning("*");
	}
	async find(id) {
		return this.userModel.query().findById(id);
	}
	async findByEmail(email) {
		return this.userModel.query().findOne({ email });
	}
}
export { UserRepository };
