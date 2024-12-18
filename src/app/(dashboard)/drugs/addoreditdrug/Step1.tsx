import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { IDrugDetails } from ".";

import CustomSelect from "@/components/Select";
import Input from "@/components/Input";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { newDrugStep1Schema } from "@/libs/hookform";
import { toast } from "react-toastify";
import { useGetItemCategoriesQuery } from "@/apis/itemCategories";
import { PageLoading } from "@/components/Loading";

const measurementOptions = ["milligram", "gram", "microgram", "milliliter", "International Unit", "Unit", "tablet", "capsule", "teaspoon", "tablespoon", "drop", "puff", "patch"];
const dosageFormOptions = ["Liquids", "Solids"];

const Step1 = ({ drugDetails, setValues, step, setStep }: { drugDetails: IDrugDetails; setValues: (data: any) => void; step: number; setStep: Dispatch<SetStateAction<number>> }) => {
	const { data: categories, error, isLoading: gettingCategories } = useGetItemCategoriesQuery();
	const { register, handleSubmit, reset } = useSelectedValuesFromHookForm(newDrugStep1Schema);
	const [dosage, setDosage] = useState(drugDetails.dosageForm as string);
	const [category, setCategory] = useState(drugDetails.categoryId as string);
	const [unitOfMeasurement, setUnitOfMeasurement] = useState(drugDetails.unitOfMeasurement as string);

	console.log(drugDetails.strength);

	// Set Details for step

	useEffect(() => {
		const { name, brandName, code, manufacturer, strength, fdaApproval, iso } = drugDetails;
		reset({ name, brandName, code, manufacturer, strength, fdaApproval, iso });
	}, []);

	const step1Data = (data: any) => {
		const { name, brandName, code, manufacturer, strength } = data;
		if (!dosage) return toast.error("Please select a dosage form", { autoClose: 1500 });
		if (!category) return toast.error("Please select drug category", { autoClose: 1500 });
		if (!strength) return toast.error("Please select strength of drug", { autoClose: 1500 });
		if (!unitOfMeasurement) return toast.error("Please select a unit of measurement of drug", { autoClose: 1500 });
		const allData = { dosageForm: dosage, strength, unitOfMeasurement, name, manufacturer, brandName, code, categoryId: category };

		setValues(allData);
		setStep((prev) => ++prev);
	};

	return (
		<form className="flex items-start flex-col h-full gap-2" onSubmit={handleSubmit(step1Data)}>
			{!gettingCategories && categories && (
				<>
					<div className="px-4 h-[calc(100%-100px)] overflow-y-auto space-y-2 pb-12 w-full">
						<h3 className="mb-3 text-lg font-bold">Drug details</h3>
						<Input name="name" register={register} label="Drug Name" placeholder="eg: paracetamol" labelSx="text-sm" inputSx="text-sm" />
						<Input name="brandName" register={register} label="Drug Brand" placeholder="eg: Panadol" labelSx="text-sm" inputSx="text-sm" />
						<Input name="code" register={register} label="Drug Code/ID" placeholder="eg: Panadol" labelSx="text-sm" inputSx="text-sm" />

						<CustomSelect
							options={categories?.data?.rows?.map((cate: { name: string }) => cate.name)}
							value={category}
							label="Drug category"
							placeholder="Item Category"
							handleChange={(value) => setCategory(value)}
						/>
						<CustomSelect options={dosageFormOptions} value={dosage} label="Dosage Form" placeholder="Select option" handleChange={(value) => setDosage(value)} />
						<Input name="strength" register={register} label="Strength (uses measurement unit by default)" placeholder="eg: 1000" labelSx="text-sm" inputSx="text-sm" />
						<CustomSelect
							options={measurementOptions}
							label="Unit of Measurement"
							placeholder="Select option"
							value={unitOfMeasurement}
							handleChange={(value) => setUnitOfMeasurement(value)}
						/>
						<Input name="manufacturer" register={register} label="Manufacturer" placeholder="" labelSx="text-sm" inputSx="text-sm" />
						<Input name="fdaApproval" register={register} label="FDA Approval" placeholder="eg: FDA123" labelSx="text-sm" inputSx="text-sm" />
						<Input name="iso" register={register} label="ISO" placeholder="eg: ISO123" labelSx="text-sm" inputSx="text-sm" />
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
				</>
			)}

			{gettingCategories && (
				<div className="w-full h-[60vh]  flex items-center justify-center">
					<PageLoading />
				</div>
			)}
		</form>
	);
};

export default Step1;
