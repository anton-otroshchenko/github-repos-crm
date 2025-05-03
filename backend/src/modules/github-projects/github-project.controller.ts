import { type FastifyRequest, type FastifyReply } from "fastify";
import { GithubProjectService } from "./github-project.service.js";
import { AddProjectPayload } from "shared";

class GithubProjectController {
	private githubProjectService: GithubProjectService;

	public constructor(githubProjectService: GithubProjectService) {
		this.githubProjectService = githubProjectService;
	}

	public async addProject(
		request: FastifyRequest<{ Body: AddProjectPayload }>,
		reply: FastifyReply,
	) {
		try {
			const project = await this.githubProjectService.addProject(request.body);
			reply.code(201).send(project);
		} catch (error) {
			reply.code(400).send({
				statusCode: 400,
				error: "Bad Request",
			});
		}
	}

	public async getUserProjects(request: FastifyRequest, reply: FastifyReply) {
		try {
			const userId = request.user?.id;
			if (!userId) {
				throw new Error("User not authenticated");
			}

			const projects = await this.githubProjectService.getUserProjects(userId);
			reply.send(projects);
		} catch (error) {
			reply.code(400).send({
				statusCode: 400,
				error: "Bad Request",
			});
		}
	}

	public async deleteProject(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		try {
			await this.githubProjectService.delete(Number(request.params.id));
			reply.code(204).send();
		} catch (error) {
			reply.code(400).send({
				statusCode: 400,
				error: "Bad Request",
			});
		}
	}

	public async refreshProject(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		try {
			const refreshedProject = await this.githubProjectService.refreshProject(
				Number(request.params.id),
			);
			reply.send(refreshedProject);
		} catch (error) {
			reply.code(400).send({
				statusCode: 400,
				error: "Bad Request",
			});
		}
	}
}

export { GithubProjectController };
