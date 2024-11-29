import React from "react";
import Select, { components } from "react-select";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ISelect {
	options: string[];
	placeholder?: string;
	label?: string;
	value: any;
	handleChange: (value: any) => void;
}
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
		backgroundColor: state.isSelected ? "#10B981" : provided.backgroundColor,
		textTransform: "capitalize",
		"&:hover": {
			borderColor: "#ddd",
			backgroundColor: "#f0f0f0",
		},
	}),
	option: (provided: any, state: any) => ({
		...provided,
		fontSize: "14px",
		textTransform: "capitalize",
		backgroundColor: state.isSelected ? "#16a34a" : provided.backgroundColor,
		"&:hover": {
			backgroundColor: state.isSelected ? "" : "#f0f0f0",
		},

		singleValue: (provided: any) => ({
			...provided,
			textTransform: "capitalize", // Capitalize the selected value
		}),
	}),
};

const CustomSelect = ({ options, placeholder = "", label, value, handleChange }: ISelect) => {
	return (
		<div className="w-full">
			{label && (
				<label htmlFor="" className="text-sm text-primary">
					{label}
				</label>
			)}
			<Select
				options={options.map((option) => ({ label: option, value: option }))}
				styles={customStyles}
				value={{ label: value, value: value }}
				onChange={(selected: any) => handleChange(selected.value)}
				components={{ DropdownIndicator: CustomDropdownIndicator }}
				placeholder={placeholder}
				menuPlacement="auto"
				menuPosition="fixed"
			/>
		</div>
	);
};

export default CustomSelect;
