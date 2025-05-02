import { FastifyRequest, FastifyReply } from "fastify";
import { type AuthService } from "~/modules/auth/auth.service.js";

class AuthController {
  private authService: AuthService;

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async signIn(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.authService.signIn(request.body);
      reply.send(result);
    } catch (error) {
      reply.status(401).send({ message: (error as Error).message });
    }
  }

  public async signUp(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const result = await this.authService.signUp(request.body);
      reply.send(result);
    } catch (error) {
      reply.status(400).send({ message: (error as Error).message });
    }
  }

  public async getAuthenticatedUser(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const userId = (request as any).user?.id; // assuming user is attached by auth middleware
      const result = await this.authService.getAuthenticatedUser(userId);
      reply.send(result);
    } catch (error) {
      reply.status(404).send({ message: (error as Error).message });
    }
  }
}

export { AuthController };
