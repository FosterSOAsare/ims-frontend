"use client";
import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { useLazyGetADrugRequestQuery } from "@/apis/drugsApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import { PageLoading } from "@/components/Loading";
import { useGetItemCategoriesQuery } from "@/apis/itemCategories";

export interface IDrugDetails {
	name: string;
	brandName: string;
	dosageForm: string;
	code: string;
	strength: string;
	unitOfMeasurement: string;
	manufacturer: string;
	storageReq: string;
	reorderPoint: string;
	costPrice: string;
	sellingPrice: string;
	categoryId: string;
	fdaApproval: string;
	iso: string;
}

const initial: IDrugDetails = {
	dosageForm: "",
	strength: "",
	code: "",
	unitOfMeasurement: "",
	name: "",
	manufacturer: "",
	brandName: "",
	storageReq: "",
	reorderPoint: "",
	costPrice: "",
	sellingPrice: "",
	fdaApproval: "",
	iso: "",
	categoryId: "",
};

// const initial: IDrugDetails = {
// 	name: "Paracetamol - Fu",
// 	brandName: "Paracetamol",
// 	dosageForm: "SOLIDS",
// 	strength: "500",
// 	code: "TYEREUE",
// 	unitOfMeasurement: "gram",
// 	manufacturer: "Test Manufacturer",
// 	storageReq: "Store in a cool dry place",
// 	reorderPoint: "300",
// 	costPrice: "20000",
// 	sellingPrice: "25000",
// 	categoryId: "",
// 	fdaApproval: "FDA123",
// 	iso: "ISO123",
// };

interface IAddOrEditDrug {
	setActiveColumn: React.Dispatch<React.SetStateAction<null | number>>;
	setShowAddOrEditDrug: React.Dispatch<React.SetStateAction<boolean>>;
	drugId: string;
}

const AddOrEditDrug = ({ setShowAddOrEditDrug, drugId, setActiveColumn }: IAddOrEditDrug) => {
	const { data: categories, error: categoriesError, isLoading: gettingCategories } = useGetItemCategoriesQuery();
	const [drugDetails, setDrugDetails] = useState<IDrugDetails>(initial);
	const [pageReady, setPageReady] = useState(false);
	const [step, setStep] = useState<number>(0);
	const [getADrugRequest, { data: drug, isLoading, error }] = useLazyGetADrugRequestQuery();

	// Fetch drug if it is an edit request

	useEffect(() => {
		if (!drugId) return setPageReady(true);
		if (drugId) {
			setPageReady(false);
			// fetch drug and used the data
			getADrugRequest({ drugId: drugId as string });
		}
	}, [drugId]);

	useEffect(() => {
		if (!drug) return;
		const { name, brandName, dosageForm, strength, code, unitOfMeasurement, manufacturer, storageReq, reorderPoint, costPrice, sellingPrice, categoryId, fdaApproval, ISO } = drug.data;
		setDrugDetails((prev) => ({
			...prev,
			name,
			brandName,
			dosageForm,
			strength,
			code,
			unitOfMeasurement,
			manufacturer,
			storageReq,
			reorderPoint: "" + reorderPoint,
			costPrice: "" + costPrice,
			sellingPrice: "" + costPrice,
			categoryId: categories?.data?.rows?.find((cat: { id: string }) => cat.id === categoryId)?.name || "",
			fdaApproval,
			iso: ISO,
		}));

		setPageReady(true);
	}, [drug]);

	const setValue = (data: any) => {
		setDrugDetails((prev) => ({ ...prev, ...data }));
	};

	const closeModal = () => {
		setShowAddOrEditDrug(false);
		setActiveColumn(null);
	};

	useCreateErrorFromApiRequest(error);
	const steps = [
		<Step1 key={0} setValues={setValue} drugDetails={drugDetails} step={step} setStep={setStep} />,
		<Step2 key={0} setValues={setValue} drugDetails={drugDetails} step={step} setStep={setStep} drugId={drugId as string} closeModal={() => closeModal()} />,
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

				<div className="h-[calc(100%-50px)]">
					{pageReady && <>{steps[step]}</>}
					{!pageReady && <PageLoading />}
				</div>
			</aside>
		</div>
	);
};

export default AddOrEditDrug;
