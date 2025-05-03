import { jwtVerify, SignJWT } from "jose";
class BaseToken {
	algorithm;
	expirationTime;
	secret;
	constructor({ algorithm, expirationTime, secret }) {
		this.secret = new TextEncoder().encode(secret);
		this.expirationTime = expirationTime;
		this.algorithm = algorithm;
	}
	async createToken(payload) {
		const token = new SignJWT(payload)
			.setProtectedHeader({ alg: this.algorithm })
			.setIssuedAt();
		if (this.expirationTime) {
			token.setExpirationTime(this.expirationTime);
		}
		return await token.sign(this.secret);
	}
	async verifyToken(token) {
		const { payload } = await jwtVerify(token, this.secret);
		return payload;
	}
}
export { BaseToken };
