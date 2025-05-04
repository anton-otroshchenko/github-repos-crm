import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSignUpSchema } from "shared";
import { Link } from "react-router-dom";
import { UserSignUpRequestDto } from "~/modules/auth/libs/types/types.js";
import { Input, Button } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";

type Properties = {
	onSubmit: (credentials: UserSignUpRequestDto) => Promise<void>;
};

const SignUp: React.FC<Properties> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserSignUpRequestDto>({
		resolver: yupResolver(userSignUpSchema),
	});

	return (
		<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
			<div className="rounded-md shadow-sm space-y-4">
				<Input
					id="email"
					type="email"
					autoComplete="email"
					placeholder="Email address"
					label="Email address"
					error={errors.email?.message as string}
					{...register("email")}
				/>

				<Input
					id="password"
					type="password"
					autoComplete="new-password"
					placeholder="Password"
					label="Password"
					error={errors.password?.message as string}
					{...register("password")}
				/>
			</div>

			<div className="flex items-center justify-between">
				<div className="text-sm">
					<Link
						to={AppRoute.SIGNIN}
						className="font-medium text-blue-600 hover:text-blue-500"
					>
						Already have an account? Sign in
					</Link>
				</div>
			</div>

			<Button type="submit">Sign up</Button>
		</form>
	);
};

export { SignUp };
