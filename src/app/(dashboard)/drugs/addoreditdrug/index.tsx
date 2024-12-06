"use client";
import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export interface IDrugDetails {
	dosageForm: string;
	strength: string;
	unitOfMeasurement: string;
	manufacturer: string;
	supplier: string;
	name: string;
	brandName: string;
	drugCode: string;
	storage: string;
	batchNo: string;
	expDate: string;
	reorderLevel: string;
	costPrice: string;
	sellingPrice: string;
	quantity: string;
}

const initial: IDrugDetails = {
	dosageForm: "",
	strength: "",
	unitOfMeasurement: "",
	name: "",
	manufacturer: "",
	brandName: "",
	drugCode: "",
	supplier: "",
	storage: "",
	batchNo: "",
	expDate: "",
	reorderLevel: "",
	costPrice: "",
	sellingPrice: "",
	quantity: "",
};

interface IAddOrEditDrug {
	setActiveColumn: React.Dispatch<React.SetStateAction<null | number>>;
	setShowAddOrEditDrug: React.Dispatch<React.SetStateAction<boolean>>;
	drugId: string;
}

const AddOrEditDrug = ({ setShowAddOrEditDrug, drugId, setActiveColumn }: IAddOrEditDrug) => {
	const [drugDetails, setDrugDetails] = useState<IDrugDetails>(initial);
	const [step, setStep] = useState<number>(2);

	// Fetch drug if it is an edit request

	useEffect(() => {
		if (drugId) {
			// fetch drug and used the data
		}
	}, [drugId]);

	const setValue = (data: any) => {
		setDrugDetails((prev) => ({ ...prev, ...data }));
	};

	const steps = [
		<Step1 key={0} setValues={setValue} drugDetails={drugDetails} step={step} setStep={setStep} />,
		<Step2 key={0} setValues={setValue} drugDetails={drugDetails} step={step} setStep={setStep} />,
		<Step3 key={0} setValues={setValue} drugDetails={drugDetails} step={step} setStep={setStep} />,
	];
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<aside className="w-[28%] flex flex-col gap-4 h-[calc(100%-20px)] bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full px-4 pt-4">
					<h3 className="text-xl">{drugId ? "Edit a " : "Add new"} drug </h3>

					<button
						className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200"
						onClick={() => {
							setShowAddOrEditDrug(false);
							setActiveColumn(null);
						}}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>

				<div className="h-[calc(100%-50px)]">{steps[step]}</div>
			</aside>
		</div>
	);
};

export default AddOrEditDrug;
