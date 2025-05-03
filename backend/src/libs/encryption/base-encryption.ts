import bcrypt from "bcrypt";

import { config } from "../config/config.js";

class BaseEncryption {
	public async compare(data: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(data, hash);
	}

	public async hash(data: string) {
		const salt = await bcrypt.genSalt(Number(config.ENCRYPTION.SALT_ROUNDS));
		const hashedData = await bcrypt.hash(data, salt);

		return { hashedData, salt };
	}
}

export { BaseEncryption };
