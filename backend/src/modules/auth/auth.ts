import { FastifyInstance } from "fastify";
import { AuthService } from "~/modules/auth/auth.service.js";
import { AuthController } from "~/modules/auth/auth.controller.js";
import { UserService } from "~/modules/users/user.service.js";
import { UserRepository } from "~/modules/users/user.repository.js";
import { UserModel } from "~/modules/users/user.model.js";
import { userSignInSchema, userSignUpSchema } from "shared";

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

async function authRoutes(fastify: FastifyInstance): Promise<void> {
	fastify.post("/auth/sign-in", {
		handler: authController.signIn.bind(authController),
		preValidation: async (request, reply) => {
			try {
				await userSignInSchema.validate(request.body, { abortEarly: false });
			} catch {
				reply.code(400).send({
					statusCode: 400,
					error: "Bad Request",
					message: "Validation Error",
				});
			}
		},
	});
	fastify.post("/auth/sign-up", {
		handler: authController.signUp.bind(authController),
		preValidation: async (request, reply) => {
			try {
				await userSignUpSchema.validate(request.body, { abortEarly: false });
			} catch {
				reply.code(400).send({
					statusCode: 400,
					error: "Bad Request",
					message: "Validation Error",
				});
			}
		},
	});
	fastify.get(
		"/auth/me",
		authController.getAuthenticatedUser.bind(authController),
	);
}

export { authRoutes };
