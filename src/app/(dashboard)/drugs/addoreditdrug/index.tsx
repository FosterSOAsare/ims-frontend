"use client";
import React, { useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export interface IDrugDetails {
	dosageForm: { label: string; value: string };
	strength: { label: string; value: string };
	unitOfMeasurement: { label: string; value: string };
	manufacturer: { label: string; value: string };
	supplier: { label: string; value: string };
	name: string;
	brandName: string;
	drugCode: string;
}

const initial: IDrugDetails = {
	dosageForm: { label: "", value: "" },
	strength: { label: "", value: "" },
	unitOfMeasurement: { label: "", value: "" },
	name: "",
	manufacturer: { label: "", value: "" },
	brandName: "",
	drugCode: "",
	supplier: { label: "", value: "" },
};

const AddOrEditDrug = ({ setShowAddOrEditDrug, drugId }: { setShowAddOrEditDrug: React.Dispatch<React.SetStateAction<boolean>>; drugId: string }) => {
	const [drugDetails, setDrugDetails] = useState<IDrugDetails>(initial);
	const [step, setStep] = useState<number>(0);

	const setValue = (name: string, value: string | { name: string; value: string }) => {
		setDrugDetails((prev) => ({ ...prev, [name]: value }));
	};

	const steps = [
		<Step1 key={0} setValue={setValue} drugDetails={drugDetails} step={step} setStep={setStep} />,
		<Step2 key={0} setValue={setValue} drugDetails={drugDetails} step={step} setStep={setStep} />,
		<Step3 key={0} setValue={setValue} drugDetails={drugDetails} step={step} setStep={setStep} />,
	];
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<aside className="w-[28%] flex flex-col gap-4 h-[calc(100%-20px)] bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full px-4 pt-4">
					<h3 className="text-xl">{drugId ? "Edit a " : "Add new"} drug </h3>

					<button className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200" onClick={() => setShowAddOrEditDrug(false)}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>

				<div className="h-[calc(100%-50px)]">{steps[step]}</div>
			</aside>
		</div>
	);
};

export default AddOrEditDrug;
