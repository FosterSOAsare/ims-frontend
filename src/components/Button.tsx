"use client";
import React from "react";

interface IButton {
	text: string;
	sx?: string;
	handleClick?: () => void;
	type?: "button" | "submit";
	disabled?: boolean;
}
const Button = ({ text, sx = "", type = "button", handleClick, disabled = false }: IButton) => {
	return (
		<>
			<button
				type={type}
				disabled={disabled}
				onClick={() => (handleClick ? handleClick() : "")}
				className={`${sx} flex items-center justify-center w-full py-3 font-400 text-white bg-sec rounded-[10px]`}>
				{text}
			</button>
		</>
	);
};

export default Button;
