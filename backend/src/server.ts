import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import knex, { Knex } from "knex";
import knexConfig from "../knexfile.js";
import { Model } from "objection";
import { config } from "~/libs/config/config.js";
import { authRoutes } from "~/modules/auth/auth.js";
import cors from "@fastify/cors";

const server: FastifyInstance = Fastify({});

await server.register(cors, {
	origin: "*",
});

const knexInstance: Knex = knex(knexConfig);

Model.knex(knexInstance);

server.register(authRoutes);

const start = async () => {
	try {
		await server.listen({ port: Number(config.APP.PORT) });

		const address = server.server.address();
		const port = typeof address === "string" ? address : address?.port;

		console.log(`Server listening on ${port}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
