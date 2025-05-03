import { type JWTPayload, jwtVerify, SignJWT } from "jose";

type Constructor = {
	algorithm: string;
	expirationTime?: string;
	secret: string;
};

class BaseToken {
	private algorithm: string;
	private expirationTime: string | undefined;
	private secret: Uint8Array;

	public constructor({ algorithm, expirationTime, secret }: Constructor) {
		this.secret = new TextEncoder().encode(secret);
		this.expirationTime = expirationTime;
		this.algorithm = algorithm;
	}

	public async createToken(payload: JWTPayload): Promise<string> {
		const token = new SignJWT(payload)
			.setProtectedHeader({ alg: this.algorithm })
			.setIssuedAt();

		if (this.expirationTime) {
			token.setExpirationTime(this.expirationTime);
		}

		return await token.sign(this.secret);
	}

	public async verifyToken(token: string): Promise<JWTPayload> {
		const { payload } = await jwtVerify(token, this.secret);

		return payload;
	}
}

export { BaseToken };
