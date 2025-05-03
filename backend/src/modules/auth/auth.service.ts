import { type UserService } from "~/modules/users/user.service.js";
import { token } from "~/libs/token/token.js";
import { encryption } from "~/libs/encryption/encryption.js";

class AuthService {
	private encryptionService;
	private tokenService;
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
		this.tokenService = token;
		this.encryptionService = encryption;
	}

	public async getAuthenticatedUser(userId: number): Promise<any> {
		return await this.userService.find(userId);
	}

	public async signIn(userRequestDto: any): Promise<any> {
		const userEntity = await this.userService.getByEmail(userRequestDto.email);
		const user = userEntity.toObject();

		const { passwordHash } = userEntity.toNewObject();

		const isPasswordCorrect = await this.encryptionService.compare(
			userRequestDto.password,
			passwordHash,
		);

		if (!isPasswordCorrect) {
			throw new Error("Invalid email or password.");
		}

		const token = await this.tokenService.createToken({
			userId: user.id,
		});

		return {
			token,
			user,
		};
	}

	public async signUp(userRequestDto: any): Promise<any> {
		const user = await this.userService.create(userRequestDto);
		const token = await this.tokenService.createToken({ userId: user.id });

		return { token, user };
	}
}

export { AuthService };
