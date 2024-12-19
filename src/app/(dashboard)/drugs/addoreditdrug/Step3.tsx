import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { IDrugDetails } from ".";

import CustomSelect from "@/components/Select";
import { toast } from "react-toastify";
import { useGetAllSuppliersRequestQuery, useLazyGetASupplierDetailsRequestQuery } from "@/apis/suppliersApi";
import { PageLoading } from "@/components/Loading";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import { useGetItemCategoriesQuery } from "@/apis/itemCategories";
import { useCreateADrugRequestMutation, useEditADrugRequestMutation } from "@/apis/drugsApi";

interface IStep3 {
	drugDetails: IDrugDetails;
	setValues: (data: any) => void;
	step: number;
	setStep: Dispatch<SetStateAction<number>>;
	drugId: string;
	closeModal: () => void;
}

const Step3 = ({ drugDetails, setValues, step, setStep, drugId, closeModal }: IStep3) => {
	const { data: suppliers, error, isLoading } = useGetAllSuppliersRequestQuery();
	const [getSupplierInfoRequest, { data: supplierData, error: supplierError, isLoading: gettingSupplier }] = useLazyGetASupplierDetailsRequestQuery();
	const { data: categories } = useGetItemCategoriesQuery();
	const [createADrug, { data: created, isLoading: creating, error: createError }] = useCreateADrugRequestMutation();
	const [updatedADrug, { data: updated, isLoading: updating, error: updateError }] = useEditADrugRequestMutation();

	const step3Data = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// if (!supplier) return toast.error("Please select a supplier", { autoClose: 1500 });
		// setValues({ supplier });

		// Get supplieir
		const supplierId = suppliers?.data?.rows?.find((sup: { name: string }) => sup.name === supplier)?.id;
		let {
			name,
			brandName,
			dosageForm,
			strength,
			code,
			unitOfMeasurement,
			manufacturer,
			storageReq,
			batchNumber,
			validity,
			reorderPoint,
			costPrice,
			sellingPrice,
			quantity,
			fdaApproval,
			iso,
			categoryId,
		} = drugDetails;

		// Get category
		categoryId = categories?.data?.rows?.find((cat: { name: string }) => cat.name === categoryId)?.id;
		let data = {
			name,
			brandName,
			dosageForm: dosageForm.toUpperCase(),
			strength,
			code,
			unitOfMeasurement,
			manufacturer,
			storageReq,
			batchNumber,
			validity,
			reorderPoint: +reorderPoint,
			costPrice: +costPrice,
			sellingPrice: +sellingPrice,
			quantity: +quantity,
			categoryId,
			supplierId,
			fdaApproval,
			ISO: iso,
		};

		// Create or update drug
		console.log(data);

		// drugId ? updatedADrug({ data, drugId }) : createADrug(data);
	};

	const goBack = () => {
		setValues({ supplier });
		setStep((prev) => --prev);
	};

	useEffect(() => {
		if (!supplier) return;
		const supplierId = suppliers?.data?.rows?.find((sup: { name: string }) => sup.name === supplier)?.id;
		getSupplierInfoRequest({ supplierId });
	}, [supplier]);

	useEffect(() => {
		if (!created && !updated) return;
		toast.success(`Drug successfully ${created ? "created" : "updated"}...`, { autoClose: 1500 });
		closeModal();
	}, [created, updated]);

	useCreateErrorFromApiRequest(error);
	useCreateErrorFromApiRequest(supplierError);
	useCreateErrorFromApiRequest(createError);
	useCreateErrorFromApiRequest(updateError);
	return (
		<form className="flex items-start flex-col h-full gap-2" onSubmit={step3Data}>
			<h3 className="mb-3 text-lg font-bold px-4">Supplier details</h3>
			{!isLoading && suppliers && (
				<>
					<div className="px-4 h-[calc(100%-150px)] overflow-y-auto pb-12 w-full">
						<CustomSelect
							options={suppliers?.data?.rows?.map((p: { name: string }) => p.name)}
							label="Supplier"
							placeholder="Select option"
							value={supplier}
							handleChange={(value) => setStupplier(value)}
						/>

						{!supplierData && (
							<div className="w-full bg-gray-100 h-[60vh] flex items-center flex-col justify-center mt-6 rounded-[10px]">
								<p className="text-sm">Select supplier to see their informations</p>
							</div>
						)}

						{!gettingSupplier && supplierData && (
							<div className="w-full bg-gray-100 h-auto p-4 mt-6 rounded-[10px]">
								<h3 className="text-2xl font-bold flex items-center gap-2">
									<Icon icon="solar:buildings-3-line-duotone" className="text-xl text-gray-400" />
									{supplierData?.data?.name}
								</h3>
								<h3 className="text-xl mt-4 font-bold">Supplier Details</h3>

								<div className="mt-4 w-full bg-[#F8F9FB] border-[1px] card p-4 rounded-[12px]">
									<h3 className="uppercase text-sm font-medium text-gray-400">Contact Person</h3>
									<div className="flex mt-2 gap-2 items-center justify-start">
										<p className="font-normal text-primary">{supplierData?.data?.primaryContactName}</p>
										<span className="px-2 py-[4px] rounded-full bg-[#D9FDFD] text-[#087878] text-sm">{supplierData?.data?.jobTitle}</span>
									</div>
								</div>

								<div className="mt-4 w-full bg-[#F8F9FB] border-[1px] card p-4 rounded-[12px]">
									<h3 className="uppercase text-sm font-medium text-gray-400">Contact</h3>
									<div className="flex mt-2 gap-2 items-center justify-start">
										<p className="text-primary font-medium flex items-center gap-2">
											<Icon icon="solar:outgoing-call-outline" className="text-xl" />
											{supplierData?.data?.phoneNumber}
										</p>
									</div>
								</div>

								<div className="mt-4 w-full bg-[#F8F9FB] border-[1px] card p-4 rounded-[12px]">
									<h3 className="uppercase text-sm font-medium text-gray-400">TYPE</h3>
									<div className="flex mt-4 gap-2  items-center justify-start">
										<p className="p-1 px-3 rounded-full font-medium text-sm text-sec bg-blue-200 flex items-center gap-2">{supplierData?.data?.supplierType}</p>
									</div>
								</div>

								{/* <div className="mt-4 w-full bg-[#F8F9FB] border-[1px] card p-4 rounded-[12px]">
									<h3 className="uppercase text-sm font-medium text-gray-400">General Info</h3>
									<div className="flex mt-4 gap-2 font-light items-center justify-start">
										Lorem ipsum dolor sit amet consectetur. Morbi amet ultrices a egestas lectus. Sed aliquet felis tellus gravida nibh risus amet a tincidunt. Amet ornare amet
										iaculis a habitant. Id amet arcu lobortis tempus eget pharetra maecenas.
									</div>
								</div> */}
							</div>
						)}
					</div>

					<div className="w-full h-[90px] bg-white px-4 py-4 mt-auto gap-3">
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
								Add drug
							</button>
						</div>
					</div>
				</>
			)}

			{isLoading && (
				<div className="w-full px-4 flex items-center h-[60vh] justify-center">
					<PageLoading />
				</div>
			)}
		</form>
	);
};

export default Step3;
