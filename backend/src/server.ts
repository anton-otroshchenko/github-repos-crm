import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import knex, { Knex } from "knex";
import knexConfig from "../knexfile";
import { Model } from "objection";

const server: FastifyInstance = Fastify({});

const knexInstance: Knex = knex(knexConfig);

Model.knex(knexInstance);

const opts: RouteShorthandOptions = {
	schema: {
		response: {
			200: {
				type: "object",
				properties: {
					pong: {
						type: "string",
					},
				},
			},
		},
	},
};

server.get("/ping", opts, async (request, reply) => {
	return { pong: "it worked!" };
});

const start = async () => {
	try {
		await server.listen({ port: 3000 });

		const address = server.server.address();
		const port = typeof address === "string" ? address : address?.port;
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
