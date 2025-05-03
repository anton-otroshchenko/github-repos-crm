import { encryption } from "~/libs/encryption/encryption.js";
class UserService {
	userRepository;
	constructor(userRepository) {
		this.userRepository = userRepository;
	}
	async create(payload) {
		const { email, fullName, password } = payload;
		const existingUser = await this.userRepository.findByEmail(email);
		if (existingUser) {
			throw new Error(`User with email ${email} already exists.`);
		}
		const { hashedData: passwordHash, salt: passwordSalt } =
			await encryption.hash(password);
		return await this.userRepository.create({
			email,
			passwordHash,
			passwordSalt,
		});
	}
	async find(id) {
		const item = await this.userRepository.find(id);
		if (!item) {
			throw new Error(`User with ID ${id} not found.`);
		}
		return item.toObject();
	}
	async getByEmail(email) {
		const item = await this.userRepository.findByEmail(email);
		if (!item) {
			throw new Error(`User with email ${email} not found.`);
		}
		return item;
	}
}
export { UserService };
