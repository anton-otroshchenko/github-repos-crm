import { UserAuthResponseDto, UserSignInRequestDto } from "shared";

export type UserSignUpRequestDto = UserSignInRequestDto & {};

export type AsyncThunkConfig = {
	rejectValue: string;
};

export { type UserAuthResponseDto, type UserSignInRequestDto };
