import { type FastifyPluginAsync, type FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { JWTExpired } from "jose/errors";
import { HttpError } from "../../exceptions/http-error/http-error.js";
import { checkIsWhiteRoute } from "./helpers/helpers.js";
import { token } from "../../token/token.js";
import { WHITE_ROUTES } from "../../plugins/authorization/constants/constants.js";
import { userService } from "../../../modules/users/user.js";
import { HttpCode, HttpMessage } from "shared";

const authorization: FastifyPluginAsync = async (fastify, _options) => {
	fastify.decorateRequest("user", null);

	fastify.addHook("onRequest", async (request: FastifyRequest) => {
		if (
			checkIsWhiteRoute({
				method: request.method,
				url: request.url,
				whiteRoutes: WHITE_ROUTES,
			})
		) {
			return;
		}

		const BEARER_PREFIX = "Bearer ";
		const authHeader = request.headers.authorization;

		if (!authHeader?.startsWith(BEARER_PREFIX)) {
			throw new HttpError({
				status: HttpCode.UNAUTHORIZED,
				message: HttpMessage.UNAUTHORIZED,
			});
		}

		const jwtToken = authHeader.slice(BEARER_PREFIX.length);

		try {
			const payload = await token.verifyToken(jwtToken);
			const { userId } = payload;

			if (!userId || typeof userId !== "number") {
				throw new HttpError({
					status: HttpCode.UNAUTHORIZED,
					message: HttpMessage.INVALID_TOKEN,
				});
			}

			const user = await userService.find(userId);
			request.user = user;

			if (!user) {
				throw new HttpError({
					status: HttpCode.UNAUTHORIZED,
					message: HttpMessage.USER_NOT_FOUND,
				});
			}
		} catch (error) {
			const isTokenExpiredError = error instanceof JWTExpired;

			if (isTokenExpiredError) {
				throw new HttpError({
					status: HttpCode.UNAUTHORIZED,
					message: HttpMessage.TOKEN_EXPIRED,
				});
			}

			throw new HttpError({
				status: HttpCode.UNAUTHORIZED,
				message: HttpMessage.INVALID_TOKEN,
			});
		}
	});
};

export default fp(authorization, {
	name: "authorization",
});
