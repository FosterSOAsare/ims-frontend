import React, { Dispatch, SetStateAction } from "react";

import { IDrugDetails } from ".";

import CustomSelect from "@/components/Select";
import Input from "@/components/Input";

const measurementOptions = [
	{ label: "A-Z", value: "a-z" },
	{ label: "Z-A", value: "z-a" },
];

const dosageFormOptions = [
	{ label: "This week", value: "week" },
	{ label: "This month", value: "month" },
	{ label: "Past 3 months", value: "3_months" },
	{ label: "This year", value: "year" },
];
const supplierOptions = [
	{ label: "This week", value: "week" },
	{ label: "This month", value: "month" },
	{ label: "Past 3 months", value: "3_months" },
	{ label: "This year", value: "year" },
];
const strengthOptions = [
	{ label: "A-Z", value: "a-z" },
	{ label: "Z-A", value: "z-a" },
];
const Step1 = ({ drugDetails, setValue, step, setStep }: { drugDetails: IDrugDetails; setValue: (name: string, value: string) => void; step: number; setStep: Dispatch<SetStateAction<number>> }) => {
	return (
		<div className="flex items-start flex-col h-full gap-2">
			<div className="px-4 h-[calc(100%-100px)] overflow-y-auto pb-12 w-full">
				<Input name="name" label="Drug Name" placeholder="eg: paracetamol" />
				<Input name="name" label="Drug Brand" placeholder="eg: Panadol" />
				<Input name="name" label="Drug Code/ID" placeholder="eg: Panadol" />

				<CustomSelect options={dosageFormOptions} label="Dosage Form" placeholder="Select option" value={drugDetails.dosageForm} handleChange={(value) => setValue("dosageForm", value)} />
				<CustomSelect options={strengthOptions} label="Strength" placeholder="Select option" value={drugDetails.strength} handleChange={(value) => setValue("strength", value)} />
				<CustomSelect
					options={measurementOptions}
					label="Unit of Measurement"
					placeholder="Select option"
					value={drugDetails.unitOfMeasurement}
					handleChange={(value) => setValue("unitOfMeasurement", value)}
				/>

				<CustomSelect options={supplierOptions} label="Manufacturer" placeholder="Select option" value={drugDetails.manufacturer} handleChange={(value) => setValue("manufacturer", value)} />
			</div>

			<div className="w-full h-[90px] bg-white px-4 py-4 mt-auto gap-3">
				<div className="w-full mb-3 flex items-center justify-between gap-3">
					{[1, 2, 3].map((item) => (
						<div key={item} className={`w-full ${step >= item - 1 ? "bg-sec" : "bg-gray-100"} rounded-full h-2`}></div>
					))}
				</div>
				<button className="w-full bg-sec py-2 rounded-[10px] text-white" onClick={() => setStep((prev) => ++prev)}>
					Save
				</button>
			</div>
		</div>
	);
};

export default Step1;
