import { type UserService } from "../users/user.service.js";
import { token } from "../../libs/token/token.js";
import { encryption } from "../../libs/encryption/encryption.js";
import { User, UserAuthResponseDto, UserSignInRequestDto } from "shared";

class AuthService {
	private encryptionService;
	private tokenService;
	private userService: UserService;

	public constructor(userService: UserService) {
		this.userService = userService;
		this.tokenService = token;
		this.encryptionService = encryption;
	}

	public async getAuthenticatedUser(userId: number): Promise<User> {
		return await this.userService.find(userId);
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserAuthResponseDto> {
		const userEntity = await this.userService.getByEmail(userRequestDto.email);

		console.log(userEntity);
		const { passwordHash } = userEntity;

		const isPasswordCorrect = await this.encryptionService.compare(
			userRequestDto.password,
			passwordHash,
		);

		if (!isPasswordCorrect) {
			throw new Error("Invalid email or password.");
		}

		const token = await this.tokenService.createToken({
			userId: userEntity.id,
		});

		return {
			token,
			user: {
				email: userEntity.email,
				id: userEntity.id,
			},
		};
	}

	public async signUp(
		userRequestDto: UserSignInRequestDto,
	): Promise<UserAuthResponseDto> {
		const user = await this.userService.create(userRequestDto);
		const token = await this.tokenService.createToken({ userId: user.id });

		return {
			token,
			user: {
				email: user.email,
				id: user.id,
			},
		};
	}
}

export { AuthService };
