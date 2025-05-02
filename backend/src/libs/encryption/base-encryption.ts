import bcrypt from "bcrypt";
import crypto from "node:crypto";

import { config } from "../config/config.js";

class BaseEncryption {
    private inputEncoding: crypto.Encoding;

    private outputEncoding: crypto.Encoding;

    public constructor() {
        this.inputEncoding = "utf8";
        this.outputEncoding = "base64";
    }

    public async compare(data: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(data, hash);
    }

    public decrypt(encryptedData: string): string {
        const decipher = crypto.createDecipheriv(config.ENCRYPTION.ALGORITHM, config.ENCRYPTION.SECRET, null);

        return (
            decipher.update(encryptedData, this.outputEncoding, this.inputEncoding) +
            decipher.final(this.inputEncoding)
        );
    }

    public encrypt(data: string): string {
        const chipher = crypto.createCipheriv(config.ENCRYPTION.ALGORITHM, config.ENCRYPTION.SECRET, null);

        return (
            chipher.update(data, this.inputEncoding, this.outputEncoding) +
            chipher.final(this.outputEncoding)
        );
    }

    public async hash(data: string): Promise<any> {
        const salt = await bcrypt.genSalt(Number(config.ENCRYPTION.SALT_ROUNDS));
        const hashedData = await bcrypt.hash(data, salt);

        return { hashedData, salt };
    }
}

export { BaseEncryption };