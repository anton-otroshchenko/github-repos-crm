import { FastifyInstance } from "fastify";
import { GithubProjectService } from "./github-project.service.js";
import { GithubProjectController } from "./github-project.controller.js";
import { GithubProjectRepository } from "./github-project.repository.js";
import { GithubProjectModel } from "./github-project.model.js";

const githubProjectRepository = new GithubProjectRepository(GithubProjectModel);
const githubProjectService = new GithubProjectService(githubProjectRepository);
const githubProjectController = new GithubProjectController(
	githubProjectService,
);

async function githubProjectRoutes(fastify: FastifyInstance): Promise<void> {
	fastify.post("/api/v1/projects", {
		handler: githubProjectController.addProject.bind(githubProjectController),
	});

	fastify.get(
		"/api/v1/projects",
		githubProjectController.getUserProjects.bind(githubProjectController),
	);

	fastify.delete(
		"/api/v1/projects/:id",
		githubProjectController.deleteProject.bind(githubProjectController),
	);

	fastify.post(
		"/api/v1/projects/:id/refresh",
		githubProjectController.refreshProject.bind(githubProjectController),
	);
}

export { githubProjectRoutes };
