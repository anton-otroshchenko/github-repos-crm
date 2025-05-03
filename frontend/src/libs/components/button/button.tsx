import React, { ButtonHTMLAttributes } from "react";

type Properties = {
	variant?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Properties> = ({
	variant = "primary",
	className = "",
	...props
}) => {
	const baseStyles =
		"group relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";
	const variantStyles =
		variant === "primary"
			? "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
			: "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300";

	return (
		<button
			className={`${baseStyles} ${variantStyles} ${className}`}
			{...props}
		/>
	);
};

export { Button };
