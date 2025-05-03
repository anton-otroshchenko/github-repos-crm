import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSignInSchema } from "shared";
import { Link } from "react-router-dom";
import { UserSignInRequestDto } from "~/modules/auth/libs/types/types.js";
import { Button, Input } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";

type SignInFormData = {
	email: string;
	password: string;
};

type SignInProps = {
	onSubmit: (credentials: UserSignInRequestDto) => Promise<void>;
};

const SignIn = ({ onSubmit }: SignInProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>({
		resolver: yupResolver(userSignInSchema),
	});

	return (
		<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
			<div className="rounded-md shadow-sm space-y-4">
				<Input
					id="email"
					type="email"
					placeholder="Email address"
					autoComplete="email"
					label="Email address"
					error={errors.email?.message as string}
					{...register("email")}
				/>

				<Input
					id="password"
					type="password"
					placeholder="Password"
					autoComplete="current-password"
					label="Password"
					error={errors.password?.message as string}
					{...register("password")}
				/>
			</div>
			<div className="flex items-center justify-between">
				<div className="text-sm">
					<Link
						to={AppRoute.SIGNUP}
						className="font-medium text-blue-600 hover:text-blue-500"
					>
						Don't have an account? Sign up
					</Link>
				</div>
			</div>

			<div>
				<Button type="submit">Sign in</Button>
			</div>
		</form>
	);
};

export { SignIn };
