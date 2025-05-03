import { type UserRepository } from "./user.repository.js";
import { encryption } from "../../libs/encryption/encryption.js";
import { User, UserSignInRequestDto } from "shared";
import { UserModel } from "./user.model.js";

class UserService {
	private userRepository: UserRepository;

	public constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	public async create(payload: UserSignInRequestDto): Promise<User> {
		const { email, password } = payload;
		const existingUser = await this.userRepository.findByEmail(email);

		if (existingUser) {
			throw new Error(`User with email ${email} already exists.`);
		}

		const { hashedData: passwordHash, salt: passwordSalt } =
			await encryption.hash(password);

		const user = await this.userRepository.create({
			email,
			passwordHash,
			passwordSalt,
		});

		return {
			email: user.email,
			id: user.id,
		};
	}

	public async find(id: number): Promise<User> {
		const item = await this.userRepository.find(id);

		if (!item) {
			throw new Error(`User with ID ${id} not found.`);
		}

		return {
			email: item.email,
			id: item.id,
		};
	}

	public async getByEmail(email: string): Promise<UserModel> {
		const item = await this.userRepository.findByEmail(email);

		if (!item) {
			throw new Error(`User with email ${email} not found.`);
		}

		return item;
	}
}

export { UserService };
