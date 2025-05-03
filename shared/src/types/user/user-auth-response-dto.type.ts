import { User } from "./user.type.js";

type UserAuthResponseDto = {
	user: User;
	token: string;
};

export { type UserAuthResponseDto };
