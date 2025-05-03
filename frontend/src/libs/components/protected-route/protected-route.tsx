import { useAppSelector } from "~/libs/hooks/hooks.js";
import { Navigate } from "react-router-dom";
import React, { JSX } from "react";
import { selectAuth } from "../../../modules/auth/slices/auth.slice.js";
import { Loader } from "../components.js";

type Properties = { children: JSX.Element };

const ProtectedRoute: React.FC<Properties> = ({ children }) => {
	const { user, isLoading, error } = useAppSelector(selectAuth);

	if (isLoading) {
		return (
			<div className="flex min-h-screen bg-gray-100 justify-center items-center">
				<Loader />
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/sign-in" replace />;
	}

	return children;
};

export { ProtectedRoute };
