import { UserRepository } from "./user.repository.js";
import { UserModel } from "./user.model.js";
import { UserService } from "./user.service.js";

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);

export { userService };
