import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

import { IDrugDetails } from ".";

import Input from "@/components/Input";

import GhanaImage from "@/assets/images/ghana.svg";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { newDrugStep2Schema } from "@/libs/hookform";
import { toast } from "react-toastify";
import { useGetItemCategoriesQuery } from "@/apis/itemCategories";
import { useCreateADrugRequestMutation, useEditADrugRequestMutation } from "@/apis/drugsApi";
import Loading from "@/components/Loading";

interface IStep2 {
	drugDetails: IDrugDetails;
	setValues: (data: any) => void;
	step: number;
	setStep: Dispatch<SetStateAction<number>>;
	drugId: string;
	closeModal: () => void;
}

const Step2 = ({ drugDetails, setValues, step, setStep, drugId, closeModal }: IStep2) => {
	const { register, handleSubmit, reset, getValues } = useSelectedValuesFromHookForm(newDrugStep2Schema);
	const { data: categories } = useGetItemCategoriesQuery();
	const [createADrug, { data: created, isLoading: creating, error: createError }] = useCreateADrugRequestMutation();
	const [updatedADrug, { data: updated, isLoading: updating, error: updateError }] = useEditADrugRequestMutation();

	useEffect(() => {
		const { reorderPoint, costPrice, sellingPrice, storageReq } = drugDetails;
		reset({ reorderPoint, costPrice, sellingPrice, storageReq });
	}, []);

	const goBack = () => {
		const { reorderPoint, costPrice, sellingPrice, storageReq } = getValues();
		const allData = { reorderPoint, costPrice, sellingPrice, storageReq };
		setValues(allData);
		setStep((prev) => --prev);
	};

	const step2Data = (data: any) => {
		const { reorderPoint, costPrice, sellingPrice, storageReq } = data;
		const allData = { reorderPoint, costPrice, sellingPrice, storageReq };
		setValues(allData);
		let { name, brandName, dosageForm, strength, code, unitOfMeasurement, manufacturer, fdaApproval, iso, categoryId } = drugDetails;

		// Get category
		categoryId = categories?.data?.rows?.find((cat: { name: string }) => cat.name === categoryId)?.id;
		let drugData = {
			name,
			brandName,
			dosageForm: dosageForm.toUpperCase(),
			strength,
			code,
			unitOfMeasurement,
			manufacturer,
			storageReq,
			reorderPoint: +reorderPoint,
			costPrice: +costPrice,
			sellingPrice: +sellingPrice,
			categoryId,
			fdaApproval,
			ISO: iso,
		};

		// Create or update drug
		drugId ? updatedADrug({ data: drugData, drugId }) : createADrug(drugData);
	};

	useEffect(() => {
		if (!created && !updated) return;
		toast.success(`Drug successfully ${created ? "created" : "updated"}...`, { autoClose: 1500 });
		closeModal();
	}, [created, updated]);
	return (
		<form className="flex items-start flex-col h-full overflow-hidden gap-2" onSubmit={handleSubmit(step2Data)}>
			<div className="px-4 h-[calc(100%-100px)] space-y-2 overflow-y-auto pb-12 w-full">
				<h3 className="mb-3 text-lg font-bold">Price and other details</h3>
				<Input name="reorderPoint" register={register} label="Reorder Level" placeholder="20,000" labelSx="text-sm" inputSx="text-sm" />
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
				{/* <Input name="quantity" register={register} label="Quantity On hand" placeholder="20,000" labelSx="text-sm" inputSx="text-sm" /> */}

				{/* <CustomSelect options={storageOptions} label="Storage Requirement" placeholder="Select option" value={storage} handleChange={(value) => setStorage(value)} /> */}

				<div className="w-full">
					<label htmlFor={"storageReq"} className={` flex items-center justify-start gap-1`}>
						Storage Requirements<span className="text-red-600">*</span>
					</label>
					<label htmlFor="notes" className="text-sm"></label>
					<textarea {...register("storageReq")} className="w-full h-40 resize-none border-[1px] focus:outline-0 p-2 rounded-[10px] border-gray-200"></textarea>
				</div>
			</div>

			<div className="w-full h-[100px] bg-white px-4  py-4 mt-auto gap-3">
				<div className="w-full mb-3 flex items-center justify-between gap-3">
					{[1, 2, 3].map((item) => (
						<div key={item} className={`w-full ${step >= item - 1 ? "bg-sec" : "bg-gray-100"} rounded-full h-2`}></div>
					))}
				</div>

				<div className="flex items-center justify-center gap-2">
					<button className="w-full hover:bg-gray-200 border-[1px] py-2 rounded-[10px]" type="button" onClick={() => goBack()}>
						Go back
					</button>

					<button className="w-full bg-sec py-2 border-[1px] hover:opacity-70 rounded-[10px] text-white" type="submit">
						{updating || creating ? <Loading /> : drugId ? "Edit Drug" : "Add Drug"}
					</button>
				</div>
			</div>
		</form>
	);
};

export default Step2;
