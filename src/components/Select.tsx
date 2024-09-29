import React from "react";
import Select, { components } from "react-select";
import { Icon } from "@iconify/react/dist/iconify.js"; // Example icon

const CustomDropdownIndicator = (props: any) => {
	return (
		<components.DropdownIndicator {...props}>
			<Icon icon="fluent:chevron-up-down-20-filled" style={{ marginRight: "5px", color: "#000", fontSize: "18px" }} />
		</components.DropdownIndicator>
	);
};

const customStyles = {
	control: (provided: any, state: any) => ({
		...provided,
		fontSize: "14px",
		fontWeight: 400,
		boxShadow: state.isFocused ? "none" : provided.boxShadow,
		borderRadius: "12px",
		borderColor: state.isFocused ? "#ddd" : provided.borderColor,
		backgroundColor: state.isSelected ? "#10B981" : provided.backgroundColor, // Selected option background color
		"&:hover": {
			borderColor: "#ddd", // Change border color on hover (optional)
			backgroundColor: "#f0f0f0", // Optional: background color on hover
		},
	}),
	option: (provided: any, state: any) => ({
		...provided,
		fontSize: "14px",
		backgroundColor: state.isSelected ? "#16a34a" : provided.backgroundColor,
		"&:hover": {
			backgroundColor: state.isSelected ? "" : "#f0f0f0",
		},
	}),
};

const CustomSelect = ({ options, placeholder = "", label }: { options: { label: string; value: string }[]; placeholder?: string; label?: string }) => {
	return (
		<div className="w-full">
			{label && (
				<label htmlFor="" className="text-sm text-primary">
					{label}
				</label>
			)}
			<Select options={options} styles={customStyles} components={{ DropdownIndicator: CustomDropdownIndicator }} placeholder={placeholder} />
		</div>
	);
};

export default CustomSelect;
