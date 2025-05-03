import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { config } from "../config/config.js";
class BaseEncryption {
	inputEncoding;
	outputEncoding;
	constructor() {
		this.inputEncoding = "utf8";
		this.outputEncoding = "base64";
	}
	async compare(data, hash) {
		return await bcrypt.compare(data, hash);
	}
	decrypt(encryptedData) {
		const decipher = crypto.createDecipheriv(
			config.ENCRYPTION.ALGORITHM,
			config.ENCRYPTION.SECRET,
			null,
		);
		return (
			decipher.update(encryptedData, this.outputEncoding, this.inputEncoding) +
			decipher.final(this.inputEncoding)
		);
	}
	encrypt(data) {
		const chipher = crypto.createCipheriv(
			config.ENCRYPTION.ALGORITHM,
			config.ENCRYPTION.SECRET,
			null,
		);
		return (
			chipher.update(data, this.inputEncoding, this.outputEncoding) +
			chipher.final(this.outputEncoding)
		);
	}
	async hash(data) {
		const salt = await bcrypt.genSalt(Number(config.ENCRYPTION.SALT_ROUNDS));
		const hashedData = await bcrypt.hash(data, salt);
		return { hashedData, salt };
	}
}
export { BaseEncryption };
