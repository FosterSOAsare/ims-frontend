"use client";
import React from "react";

import Loading from "./Loading";

interface IButton {
	text: string;
	sx?: string;
	handleClick?: () => void;
	type?: "button" | "submit";
	disabled?: boolean;
	isLoading?: boolean;
}
const Button = ({ text, sx = "", type = "button", handleClick, disabled = false, isLoading = false }: IButton) => {
	return (
		<>
			<button
				type={type}
				disabled={disabled || isLoading}
				onClick={() => (handleClick ? handleClick() : "")}
				className={`${sx} flex items-center justify-center w-full py-4 font-400 text-white bg-sec rounded-[10px]`}>
				{isLoading ? <Loading /> : text}
			</button>
		</>
	);
};

export default Button;
