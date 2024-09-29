import React from "react";

interface IINput {
	label?: string;
	name: string;
	placeholder?: string;
	type?: string;
}

const Input = ({ label, type = "text", name, placeholder = "" }: IINput) => {
	return (
		<div className="w-full">
			{label && <label htmlFor={name}>{label}</label>}
			<input type={type} id={name} className="w-full p-2 border-[1px] focus:outline-0 border-gray-200 rounded-[10px] bg-white" placeholder={placeholder} />
		</div>
	);
};

export default Input;
