import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

import { IDrugDetails } from ".";

import CustomSelect from "@/components/Select";
import Input from "@/components/Input";

import GhanaImage from "@/assets/images/ghana.svg";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { newDrugStep2Schema } from "@/libs/hookform";
import { toast } from "react-toastify";

const storageOptions = ["This week", "This month", "Past 3 months", "This year"];

const Step2 = ({ drugDetails, setValues, step, setStep }: { drugDetails: IDrugDetails; setValues: (data: any) => void; step: number; setStep: Dispatch<SetStateAction<number>> }) => {
	const [storage, setStorage] = useState(drugDetails.storage);
	const { register, handleSubmit } = useSelectedValuesFromHookForm(newDrugStep2Schema);

	const step2Data = (data: any) => {
		const { batchNo, reorderLevel, expDate, quantity, costPrice, sellingPrice } = data;
		if (!storage) return toast.error("Please select a storage option", { autoClose: 1500 });

		const allData = { batchNo, reorderLevel, expDate, quantity, costPrice, sellingPrice, storage };
		setValues(allData);
		setStep((prev) => ++prev);
	};
	return (
		<form className="flex items-start flex-col h-full gap-2" onSubmit={handleSubmit(step2Data)}>
			<div className="px-4 h-[calc(100%-100px)] space-y-2 overflow-y-auto pb-12 w-full">
				<h3 className="mb-3 text-lg font-bold">Price and other details</h3>
				<Input name="batchNo" register={register} label="Batch Number" placeholder="eg: paracetamol" labelSx="text-sm" inputSx="text-sm" />
				<Input name="expDate" register={register} type="date" label="Expiry Date" labelSx="text-sm" inputSx="text-sm" />
				<Input name="reorderLevel" register={register} label="Reorder Level" placeholder="20,000" labelSx="text-sm" inputSx="text-sm" />
				<div>
					<label htmlFor="costPrice" className="text-sm">
						Cost Price
					</label>
					<div className="border-[1px] flex items-stretch justify-start rounded-[5px] overflow-hidden">
						<div className="px-2 gap-2 border-r-[1px] py-2 flex items-center justify-center">
							<Image src={GhanaImage} alt="Image" height={12} width={25} />
							<p className="text-primary font-medium text-sm">GHS</p>
						</div>
						<input type="text" {...register("costPrice")} className="flex-1 focus:outline-0 p-2 text-sm" placeholder="Eg: 20,000" />
					</div>
				</div>
				<div>
					<label htmlFor="costPrice" className="text-sm">
						Selling Price
					</label>
					<div className="border-[1px] flex items-stretch justify-start rounded-[5px] overflow-hidden">
						<div className="px-2 gap-2 border-r-[1px] py-2 flex items-center justify-center">
							<Image src={GhanaImage} alt="Image" height={12} width={25} />
							<p className="text-primary font-medium text-sm">GHS</p>
						</div>
						<input type="text" {...register("sellingPrice")} className="flex-1 focus:outline-0 p-2 text-sm" placeholder="Eg: 20,000" />
					</div>
				</div>
				<Input name="quantity" register={register} label="Quantity On hand" placeholder="20,000" labelSx="text-sm" inputSx="text-sm" />

				<CustomSelect options={storageOptions} label="Storage Requirement" placeholder="Select option" value={storage} handleChange={(value) => setStorage(value)} />
			</div>

			<div className="w-full h-[90px] bg-white px-4 py-4 mt-auto gap-3">
				<div className="w-full mb-3 flex items-center justify-between gap-3">
					{[1, 2, 3].map((item) => (
						<div key={item} className={`w-full ${step >= item - 1 ? "bg-sec" : "bg-gray-100"} rounded-full h-2`}></div>
					))}
				</div>

				<div className="flex items-center justify-center gap-2">
					<button className="w-full hover:bg-gray-200 border-[1px] py-2 rounded-[10px]" onClick={() => setStep((prev) => --prev)}>
						Go back
					</button>

					<button className="w-full bg-sec py-2 border-[1px] hover:opacity-70 rounded-[10px] text-white" type="submit">
						Next
					</button>
				</div>
			</div>
		</form>
	);
};

export default Step2;
