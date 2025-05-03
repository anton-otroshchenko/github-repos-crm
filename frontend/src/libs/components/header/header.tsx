import React from "react";
import { Button } from "../components.js";

type Properties = {
	onLogout?: () => void;
	email: string;
};

const Header: React.FC<Properties> = ({ onLogout, email }) => {
	return (
		<header className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
				<h1 className="text-xl font-bold text-gray-900">Projects CRM</h1>
				<div className="flex items-center space-x-4">
					<span className="text-sm font-medium text-gray-500">{email}</span>
					<Button onClick={onLogout} variant="secondary">
						Logout
					</Button>
				</div>
			</div>
		</header>
	);
};

export { Header };
