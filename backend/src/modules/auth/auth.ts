import { FastifyInstance } from "fastify";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { UserService } from "../users/user.service.js";
import { UserRepository } from "../users/user.repository.js";
import { UserModel } from "../users/user.model.js";
import { userSignInSchema, userSignUpSchema } from "shared";

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

async function authRoutes(fastify: FastifyInstance): Promise<void> {
	fastify.post("/api/v1/auth/sign-in", {
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
	fastify.post("/api/v1/auth/sign-up", {
		handler: authController.signUp.bind(authController),
		preValidation: async (request, reply) => {
			try {
				await userSignUpSchema.validate(request.body, { abortEarly: false });
			} catch (error) {
				reply.code(400).send({
					statusCode: 400,
					error: "Bad Request",
					message: (error as Error).message,
				});
			}
		},
	});
	fastify.get(
		"/api/v1/auth/me",
		authController.getAuthenticatedUser.bind(authController),
	);
}

export { authRoutes };
