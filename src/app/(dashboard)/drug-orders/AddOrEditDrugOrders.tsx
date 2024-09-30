"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast, ToastContainer } from "react-toastify";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { newDrugStep2Schema, stockAdjustmentSchema } from "@/libs/hookform";
import drugs from "@/data/drugs";

import Input from "@/components/Input";
import CustomSelect from "@/components/Select";

export interface IStockDetails {
	drug: string;
	currentStock: string;
	actualStock: string;
	adjustmentType: string;
	dateAdded: string;
	reason: string;
	notes: string;
}

const initial: IStockDetails = {
	drug: "",
	currentStock: "",
	actualStock: "",
	adjustmentType: "",
	dateAdded: "",
	reason: "",
	notes: "",
};

// const drugs = []

interface IAddOrEditStock {
	setSelectedStock: React.Dispatch<React.SetStateAction<null | number>>;
	setShowAddOrEditStock: React.Dispatch<React.SetStateAction<boolean>>;
	stockId: string;
}

const AddOrEditStock = ({ setShowAddOrEditStock, stockId, setSelectedStock }: IAddOrEditStock) => {
	const [stockDetails, setStockDetails] = useState<IStockDetails>(initial);
	const [step, setStep] = useState<number>(0);

	// Fetch drug if it is an edit request

	// Select fields will change the details directly while inputs will use a hookform for vaidation
	const { register, handleSubmit } = useSelectedValuesFromHookForm(stockAdjustmentSchema);
	const setValue = (name: string, value: string) => {
		setStockDetails((prev) => ({ ...prev, [name]: value }));
	};

	const addStock = (data: any) => {
		const { notes, actualStock, currentStock } = data;
		const { drug, adjustmentType, reason } = stockDetails;
		if (!drug) return toast.error("Please select the drug you want to adjust", { autoClose: 1500 });
		if (!adjustmentType) return toast.error("Please select an adjustment type", { autoClose: 1500 });
		if (!reason) return toast.error("Please select a reason for the stock adjustment", { autoClose: 1500 });

		const allData = { notes, actualStock, adjustmentType, drug, reason, currentStock };
		console.log(allData);
	};

	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<div className="w-[28%] flex flex-col gap-4 h-[calc(100%-20px)]  bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full px-4 pt-4">
					<h3 className="text-xl">{stockId ? "Edit a " : "Add new"} Adjustment </h3>
					<button
						type="button"
						className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200"
						onClick={() => {
							setShowAddOrEditStock(false);
							setSelectedStock(null);
						}}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>

				<form className="h-[calc(100%-60px)]" onSubmit={handleSubmit(addStock)}>
					<div className="flex items-start flex-col h-full gap-2" onSubmit={() => ""}>
						<div className="px-4 overflow-y-auto space-y-3 pb-12 w-full">
							<CustomSelect
								options={drugs.map((drug) => drug.name)}
								value={stockDetails.drug}
								label="Drug"
								placeholder="Select option"
								handleChange={(value) => setValue("drug", value)}
							/>
							<Input name="currentStock" register={register} label="Current Stock" placeholder="0" labelSx="text-sm" inputSx="text-sm" />
							<Input name="actualStock" register={register} label="actual Stock" placeholder="0" labelSx="text-sm" inputSx="text-sm" />

							<CustomSelect
								options={["Reduction", "Increment"]}
								label="Adjustment Type"
								placeholder="Select option"
								value={stockDetails.adjustmentType}
								handleChange={(value) => setValue("adjustmentType", value)}
							/>
							<CustomSelect options={["Theft", "Damaged"]} label="Reason" placeholder="Select option" value={stockDetails.reason} handleChange={(value) => setValue("reason", value)} />

							<div className="w-full">
								<label htmlFor="notes" className="text-sm">
									Notes
								</label>
								<textarea {...register("notes")} className="w-full h-24 resize-none border-[1px] focus:outline-0 p-2 rounded-[10px] border-gray-200"></textarea>
							</div>
						</div>

						<div className="w-full h-auto white px-4 py-4 mt-auto gap-3">
							<button className="w-full bg-sec py-2 rounded-[10px] hover:opacity-70 text-white" type="submit">
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
};

export default AddOrEditStock;
