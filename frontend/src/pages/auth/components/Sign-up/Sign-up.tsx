import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSignUpSchema } from "shared";
import { useNavigate } from "react-router-dom";
import { UserSignUpRequestDto } from "../../../../modules/auth/libs/types/types.js";

type SignUpFormData = {
	email: string;
	password: string;
};

type SignUpProps = {
	onSubmit: (credentials: UserSignUpRequestDto) => Promise<void>;
};

const SignUp = ({ onSubmit }: SignUpProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormData>({
		resolver: yupResolver(userSignUpSchema),
	});

	const navigate = useNavigate();

	return (
		<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
			<div className="rounded-md shadow-sm space-y-4">
				<div>
					<label htmlFor="email" className="sr-only">
						Email address
					</label>
					<input
						id="email"
						type="email"
						autoComplete="email"
						{...register("email")}
						className={`appearance-none relative block w-full px-3 py-2 border ${
							errors.email ? "border-red-500" : "border-gray-300"
						} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
						placeholder="Email address"
					/>
					{errors.email && (
						<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
					)}
				</div>

				<div>
					<label htmlFor="password" className="sr-only">
						Password
					</label>
					<input
						id="password"
						type="password"
						autoComplete="new-password"
						{...register("password")}
						className={`appearance-none relative block w-full px-3 py-2 border ${
							errors.password ? "border-red-500" : "border-gray-300"
						} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
						placeholder="Password"
					/>
					{errors.password && (
						<p className="mt-1 text-sm text-red-600">
							{errors.password.message}
						</p>
					)}
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="text-sm">
					<button
						type="button"
						onClick={() => navigate("/sign-in")}
						className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
					>
						Already have an account? Sign in
					</button>
				</div>
			</div>

			<div>
				<button
					type="submit"
					className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Sign up
				</button>
			</div>
		</form>
	);
};

export { SignUp };
