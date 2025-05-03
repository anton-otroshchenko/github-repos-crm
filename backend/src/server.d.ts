import { User } from "shared";

declare module "fastify" {
	interface FastifyRequest {
		user: User | null;
	}
}
