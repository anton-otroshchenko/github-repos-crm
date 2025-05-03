export type UserAuthResponseDto = {
	user: {
		id: string;
		email: string;
	};
	token: string;
};

export type UserSignInRequestDto = {
	email: string;
	password: string;
};

export type UserSignUpRequestDto = UserSignInRequestDto & {};

export type AsyncThunkConfig = {
	rejectValue: string;
};
