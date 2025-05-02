import { type UserRepository } from "./user.repository.js";
import {encryption} from "~/libs/encryption/encryption.js";

class UserService {
  private userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async create(payload: any): Promise<any> {
    const { email, fullName, password } = payload;
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error(`User with email ${email} already exists.`);
    }

    const { hashedData: passwordHash, salt: passwordSalt } =
        await encryption.hash(password);

    return await this.userRepository.create({
      email,
      passwordHash,
      passwordSalt,
    });
  }

  public async find(id: number): Promise<any> {
    const item = await this.userRepository.find(id);

    if (!item) {
      throw new Error(`User with ID ${id} not found.`);
    }

    return item.toObject();
  }

  public async getByEmail(email: string): Promise<any> {
    const item = await this.userRepository.findByEmail(email);

    if (!item) {
      throw new Error(`User with email ${email} not found.`);
    }

    return item;
  }
}

export { UserService };
