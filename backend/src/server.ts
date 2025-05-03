import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import knex, { Knex } from "knex";
import knexConfig from "../knexfile.js";
import { Model } from "objection";
import { config } from "./libs/config/config.js";
import { authRoutes } from "./modules/auth/auth.js";
import cors from "@fastify/cors";
import authorization from "./libs/plugins/authorization/authorization.plugin.js";
import { githubProjectRoutes } from "./modules/github-projects/github-project.js";

const server: FastifyInstance = Fastify({});

await server.register(cors, {
	origin: "*",
	methods: "*",
});

const knexInstance: Knex = knex(knexConfig);
Model.knex(knexInstance);

await server.register(authorization);

server.register(authRoutes);
server.register(githubProjectRoutes);

const start = async () => {
	try {
		await server.listen({ port: Number(config.APP.PORT), host: "0.0.0.0" });

		const address = server.server.address();
		const port = typeof address === "string" ? address : address?.port;

		console.log(`Server listening on ${port}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
