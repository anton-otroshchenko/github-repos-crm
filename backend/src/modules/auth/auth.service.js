import { token } from "~/libs/token/token.js";
import { encryption } from "~/libs/encryption/encryption.js";
class AuthService {
	encryptionService;
	tokenService;
	userService;
	constructor(userService) {
		this.userService = userService;
		this.tokenService = token;
		this.encryptionService = encryption;
	}
	async getAuthenticatedUser(userId) {
		return await this.userService.find(userId);
	}
	async signIn(userRequestDto) {
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
	async signUp(userRequestDto) {
		const user = await this.userService.create(userRequestDto);
		const token = await this.tokenService.createToken({ userId: user.id });
		return { token, user };
	}
}
export { AuthService };
