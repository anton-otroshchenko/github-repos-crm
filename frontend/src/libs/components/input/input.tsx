import { InputHTMLAttributes, forwardRef } from "react";

type Properties = {
	label?: string;
	error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Properties>(
	({ id, label, error, className = "", ...props }, ref) => {
		return (
			<div>
				{label && (
					<label htmlFor={id} className="sr-only">
						{label}
					</label>
				)}
				<input
					id={id}
					ref={ref}
					className={`appearance-none relative block w-full px-3 py-2 border ${
						error ? "border-red-500" : "border-gray-300"
					} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${className}`}
					{...props}
				/>
				{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
			</div>
		);
	},
);

Input.displayName = "Input";

export { Input };
