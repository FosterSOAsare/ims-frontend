import React from "react";

interface IINput {
	label?: string;
	name: string;
	placeholder?: string;
	type?: string;
	labelSx?: string;
	inputSx?: string;
}

const Input = ({ label, type = "text", name, placeholder = "", labelSx = "", inputSx = "" }: IINput) => {
	return (
		<div className="w-full">
			{label && (
				<label htmlFor={name} className={`${labelSx}`}>
					{label}
				</label>
			)}
			<input type={type} id={name} className={`w-full p-2 border-[1px] focus:outline-0 border-gray-200 rounded-[10px] bg-white ${inputSx}`} placeholder={placeholder} />
		</div>
	);
};

export default Input;
