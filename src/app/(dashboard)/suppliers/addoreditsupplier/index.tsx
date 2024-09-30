"use client";
import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
// import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";
import { ToastContainer } from "react-toastify";
import Step1 from "./Step1";

export interface ISupplierDetails {
	name: string;
	tradeName: string;
	supplierType: string;
	minOrderQuantity: string;
	leadTime: string;
	deliveryMethod: string;
	contactDetails: { name: string; jobTitle: string; department: string; phone: string; email: string; physicalAddress: string; mailingAddress: string };
	paymentDetails: { type: string; name: string; accountType: string; accountNumber: string; currency: string; paymentTerms: string };
}

const initial: ISupplierDetails = {
	name: "",
	tradeName: "",
	supplierType: "",
	deliveryMethod: "",
	minOrderQuantity: "",
	leadTime: "",
	contactDetails: { name: "", jobTitle: "", department: "", phone: "", email: "", physicalAddress: "", mailingAddress: "" },
	paymentDetails: { type: "", name: "", accountType: "", accountNumber: "", currency: "", paymentTerms: "" },
};

interface IAddOrEditDrug {
	setSelectedSupplier: React.Dispatch<React.SetStateAction<null | number>>;
	setShowAddOrEditSupplier: React.Dispatch<React.SetStateAction<boolean>>;
	supplierId: string;
}

const AddOrEditDrug = ({ setShowAddOrEditSupplier, supplierId, setSelectedSupplier }: IAddOrEditDrug) => {
	const [supplierDetails, setSupplierDetails] = useState<ISupplierDetails>(initial);
	const [step, setStep] = useState<number>(0);

	// Fetch drug if it is an edit request

	useEffect(() => {
		if (supplierId) {
			// fetch drug and used the data
		}
	}, [supplierId]);

	const setValue = (data: any) => {
		setSupplierDetails((prev) => ({ ...prev, ...data }));
	};

	const steps = [
		<Step1 key={0} setValues={setValue} supplierDetails={supplierDetails} step={step} setStep={setStep} />,
		// <Step2 key={0} setValues={setValue} supplierDetails={supplierDetails} step={step} setStep={setStep} />,
		// <Step3 key={0} setValues={setValue} supplierDetails={supplierDetails} step={step} setStep={setStep} />,
	];
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<aside className="w-[28%] flex flex-col gap-4 h-[calc(100%-20px)] bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full px-4 pt-4">
					<h3 className="text-lg font-bold">{supplierId ? "Edit a " : "Add new"} supplier </h3>

					<button
						className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200"
						onClick={() => {
							setShowAddOrEditSupplier(false);
							setSelectedSupplier(null);
						}}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>

				<div className="h-[calc(100%-50px)]">{steps[step]}</div>
			</aside>
			<ToastContainer />
		</div>
	);
};

export default AddOrEditDrug;
