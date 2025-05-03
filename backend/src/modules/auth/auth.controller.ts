import { FastifyRequest, FastifyReply } from "fastify";
import { type AuthService } from "./auth.service.js";
import { UserSignInRequestDto } from "shared";

class AuthController {
	private authService: AuthService;

	public constructor(authService: AuthService) {
		this.authService = authService;
	}

	public async signIn(
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<void> {
		const result = await this.authService.signIn(
			request.body as UserSignInRequestDto,
		);
		reply.send(result);
	}

	public async signUp(
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<void> {
		const result = await this.authService.signUp(
			request.body as UserSignInRequestDto,
		);
		reply.send(result);
	}

	public async getAuthenticatedUser(
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<void> {
		const userId = request.user?.id;

		if (!userId) {
			throw new Error("Unauthorized");
		}

		const result = await this.authService.getAuthenticatedUser(userId);
		reply.send(result);
	}
}

export { AuthController };
