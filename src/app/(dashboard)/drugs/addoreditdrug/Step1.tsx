import React, { Dispatch, SetStateAction, useState } from "react";

import { IDrugDetails } from ".";

import CustomSelect from "@/components/Select";
import Input from "@/components/Input";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { newDrugStep1Schema } from "@/libs/hookform";
import { toast } from "react-toastify";

const measurementOptions = ["A-Z", "Z-A"];
const dosageFormOptions = ["This week", "This month", "Past 3 months", "This year"];
const supplierOptions = ["This week", "This month", "Past 3 months", "This year"];
const strengthOptions = ["A-Z", "Z-A"];

const Step1 = ({ drugDetails, setValues, step, setStep }: { drugDetails: IDrugDetails; setValues: (data: any) => void; step: number; setStep: Dispatch<SetStateAction<number>> }) => {
	const { register, handleSubmit } = useSelectedValuesFromHookForm(newDrugStep1Schema);
	const [dosage, setDosage] = useState(drugDetails.dosageForm as string);
	const [strength, setStrength] = useState(drugDetails.strength as string);
	const [unitOfMeasurement, setUnitOfMeasurement] = useState(drugDetails.unitOfMeasurement as string);
	const [manufacturer, setManufacturer] = useState(drugDetails.manufacturer as string);

	// Set Details

	const step1Data = (data: any) => {
		const { name, brand, code } = data;
		if (!dosage) return toast.error("Please select a dosage form", { autoClose: 1500 });
		if (!strength) return toast.error("Please select strength of drug", { autoClose: 1500 });
		if (!unitOfMeasurement) return toast.error("Please select a unit of measurement of drug", { autoClose: 1500 });
		if (!manufacturer) return toast.error("Please select the manufacturer of the drug", { autoClose: 1500 });
		const allData = { dosageForm: dosage, strength, unitOfMeasurement, name, manufacturer, brandName: brand, drugCode: code };

		setValues(allData);
		setStep((prev) => ++prev);
	};

	return (
		<form className="flex items-start flex-col h-full gap-2" onSubmit={handleSubmit(step1Data)}>
			<div className="px-4 h-[calc(100%-100px)] overflow-y-auto space-y-2 pb-12 w-full">
				<h3 className="mb-3 text-lg font-bold">Drug details</h3>
				<Input name="name" register={register} label="Drug Name" placeholder="eg: paracetamol" labelSx="text-sm" inputSx="text-sm" />
				<Input name="brand" register={register} label="Drug Brand" placeholder="eg: Panadol" labelSx="text-sm" inputSx="text-sm" />
				<Input name="code" register={register} label="Drug Code/ID" placeholder="eg: Panadol" labelSx="text-sm" inputSx="text-sm" />

				<CustomSelect options={dosageFormOptions} value={dosage} label="Dosage Form" placeholder="Select option" handleChange={(value) => setDosage(value)} />
				<CustomSelect options={strengthOptions} value={strength} label="Strength" placeholder="Select option" handleChange={(value) => setStrength(value)} />
				<CustomSelect options={measurementOptions} label="Unit of Measurement" placeholder="Select option" value={unitOfMeasurement} handleChange={(value) => setUnitOfMeasurement(value)} />
				<CustomSelect options={supplierOptions} label="Manufacturer" placeholder="Select option" value={manufacturer} handleChange={(value) => setManufacturer(value)} />
			</div>

			<div className="w-full h-[90px] bg-white px-4 py-4 mt-auto gap-3">
				<div className="w-full mb-3 flex items-center justify-between gap-3">
					{[1, 2, 3].map((item) => (
						<div key={item} className={`w-full ${step >= item - 1 ? "bg-sec" : "bg-gray-100"} rounded-full h-2`}></div>
					))}
				</div>
				<button className="w-full bg-sec py-2 rounded-[10px] text-white" type="submit">
					Next
				</button>
			</div>
		</form>
	);
};

export default Step1;
