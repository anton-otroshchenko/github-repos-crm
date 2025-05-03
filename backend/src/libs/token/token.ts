import { config } from "../config/config.js";
import { BaseToken } from "./base-token.js";

const token = new BaseToken({
	algorithm: config.JWT.ALGORITHM,
	expirationTime: config.JWT.EXPIRATION_TIME,
	secret: config.JWT.SECRET,
});

const projectApiKey = new BaseToken({
	algorithm: config.JWT.ALGORITHM,
	secret: config.JWT.SECRET,
});

export { projectApiKey, token };
