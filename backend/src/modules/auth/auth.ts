import { FastifyInstance } from "fastify";
import { AuthService } from "~/modules/auth/auth.service.js";
import { AuthController } from "~/modules/auth/auth.controller.js";
import { UserService } from "~/modules/users/user.service.js";
import { UserRepository } from "~/modules/users/user.repository.js";
import { UserModel } from "~/modules/users/user.model.js";

// Instantiate dependencies
const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

async function authRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post("/auth/sign-in", authController.signIn.bind(authController));
  fastify.post("/auth/sign-up", authController.signUp.bind(authController));
  fastify.get("/auth/me", authController.getAuthenticatedUser.bind(authController));
}

export { authRoutes };
