import React from "react";

interface IInput {
	label?: string;
	name: string;
	placeholder?: string;
	type?: string;
	labelSx?: string;
	inputSx?: string;
	register?: any;
	value?: string;
	setValue?: (value: string) => void;
}

const Input = ({ label, type = "text", name, placeholder = "", labelSx = "", inputSx = "", register, value, setValue }: IInput) => {
	return (
		<div className="w-full">
			{label && (
				<label htmlFor={name} className={`${labelSx}`}>
					{label}
				</label>
			)}
			{register && (
				<input type={type} {...register(name)} id={name} className={`w-full p-2 border-[1px] focus:outline-0 border-gray-200 rounded-[10px] bg-white ${inputSx}`} placeholder={placeholder} />
			)}
			{!register && (
				<input
					type={type}
					name={name}
					value={value as string}
					onChange={(e) => (setValue ? setValue(e.target.value as string) : "")}
					id={name}
					className={`w-full p-2 border-[1px] focus:outline-0 border-gray-200 rounded-[10px] bg-white ${inputSx}`}
					placeholder={placeholder}
				/>
			)}
		</div>
	);
};

export default Input;
