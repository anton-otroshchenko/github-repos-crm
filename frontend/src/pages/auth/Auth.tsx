import { useLocation, useNavigate } from "react-router-dom";
import { SignUp, SignIn } from "./components/components.js";
import { useAppDispatch, useAppSelector } from "../../libs/hooks/hooks.js";
import {
	UserSignInRequestDto,
	UserSignUpRequestDto,
} from "../../modules/auth/libs/types/types.js";
import { selectAuth } from "../../modules/auth/slices/auth.slice.js";
import { signIn, signUp } from "../../modules/auth/slices/auth.thunks.js";
import { useEffect } from "react";
import { AppRoute } from "~/libs/enums/app-route/app-route.enum.js";

const Auth = () => {
	const { pathname } = useLocation();
	const isSignUp = pathname.includes("sign-up");

	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const { user, isLoading, error } = useAppSelector(selectAuth);

	useEffect(() => {
		if (user) {
			navigate(AppRoute.PROJECTS);
		}
	}, [user, dispatch, navigate]);

	const handleSignIn = async (credentials: UserSignInRequestDto) => {
		try {
			await dispatch(signIn(credentials)).unwrap();
			navigate(AppRoute.PROJECTS);
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	const handleSignUp = async (credentials: UserSignUpRequestDto) => {
		try {
			await dispatch(signUp(credentials)).unwrap();
			navigate(AppRoute.PROJECTS);
		} catch (error) {
			console.error("Sign up failed:", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
						{isSignUp ? "Create a new account" : "Sign in to your account"}
					</h2>
				</div>

				{isSignUp ? (
					<SignUp onSubmit={handleSignUp} />
				) : (
					<SignIn onSubmit={handleSignIn} />
				)}
			</div>
		</div>
	);
};

export default Auth;
