import { knexSnakeCaseMappers } from "objection";
import { config } from "./src/libs/config/config.js";
const {
	DATABASE: database,
	USERNAME: username,
	PASSWORD: password,
	HOST: host,
	PORT: port,
	CLIENT: client,
	DEBUG: debug,
} = config.DB;
export default {
	client,
	connection: {
		user: username,
		port: parseInt(port, 10),
		host,
		database,
		password,
	},
	migrations: {
		directory: "./src/db/migrations",
		tableName: "knex_migrations",
	},
	debug,
	...knexSnakeCaseMappers({ underscoreBetweenUppercaseLetters: true }),
};
