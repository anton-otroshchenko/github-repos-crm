import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const {
	PORT,
	DB_NAME,
	DB_USERNAME,
	DB_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_CLIENT,
	JWT_ALGORITHM,
	JWT_EXPIRATION_TIME,
	JWT_SECRET,
	ENCRYPTION_ALGORITHM,
	ENCRYPTION_SALT_ROUNDS,
	ENCRYPTION_SECRET,
	GITHUB_API_URL,
	GITHUB_TOKEN,
} = process.env;

const config = {
	APP: {
		API_PATH: "/api",
		PORT: PORT as string,
	},
	DB: {
		DATABASE: DB_NAME as string,
		USERNAME: DB_USERNAME as string,
		PASSWORD: DB_PASSWORD as string,
		HOST: DB_HOST as string,
		PORT: DB_PORT as string,
		CLIENT: DB_CLIENT as string,
		DEBUG: false,
	},
	JWT: {
		ALGORITHM: JWT_ALGORITHM as string,
		EXPIRATION_TIME: JWT_EXPIRATION_TIME as string,
		SECRET: JWT_SECRET as string,
	},
	ENCRYPTION: {
		ALGORITHM: ENCRYPTION_ALGORITHM as string,
		SALT_ROUNDS: ENCRYPTION_SALT_ROUNDS,
		SECRET: ENCRYPTION_SECRET as string,
	},
	GITHUB: {
		API_URL: GITHUB_API_URL as string,
		TOKEN: GITHUB_TOKEN as string,
	},
};

export { config };
