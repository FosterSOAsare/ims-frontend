"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast, ToastContainer } from "react-toastify";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { drugOrderSchema } from "@/libs/hookform";
import drugs from "@/data/drugs";

import Input from "@/components/Input";
import CustomSelect from "@/components/Select";

export interface IOrderDetails {
	drug: string;
	quantity: string;
	supplier: string;
	// orderNo: string;
	deliveryDate: string;
	paymentMethod: string;
	deliveryMethod: string;
	address: string;
}

const initial: IOrderDetails = {
	drug: "",
	quantity: "",
	supplier: "",
	// orderNo: "",
	deliveryDate: "",
	paymentMethod: "",
	deliveryMethod: "",
	address: "",
};

// const drugs = []

interface IAddOrEditStock {
	setSelectedDrugOrder: React.Dispatch<React.SetStateAction<null | number>>;
	setShowAddOrEditDrugOrder: React.Dispatch<React.SetStateAction<boolean>>;
	orderId: string;
}

const AddOrEditDrugOrder = ({ setShowAddOrEditDrugOrder, orderId, setSelectedDrugOrder }: IAddOrEditStock) => {
	const [orderDetails, setOrderDetails] = useState<IOrderDetails>(initial);

	// Fetch order if it is an edit request

	// Select fields will change the details directly while inputs will use a hookform for vaidation
	const { register, handleSubmit } = useSelectedValuesFromHookForm(drugOrderSchema);
	const setValue = (name: string, value: string) => {
		setOrderDetails((prev) => ({ ...prev, [name]: value }));
	};

	const addOrder = (data: any) => {
		const { quantity, deliveryDate, address } = data;

		const { drug, supplier, paymentMethod, deliveryMethod } = orderDetails;
		if (!drug) return toast.error("Please select the drug you want to order", { autoClose: 1500 });
		if (!paymentMethod) return toast.error("Please select a payment method", { autoClose: 1500 });
		if (!supplier) return toast.error("Please select the supplier of this drug", { autoClose: 1500 });
		if (!deliveryMethod) return toast.error("Please select a delivery method for your order", { autoClose: 1500 });

		const allData = { quantity, deliveryDate, address, drug, paymentMethod, deliveryMethod, supplier };
		console.log(allData);
	};

	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<div className="w-[28%] flex flex-col gap-4 h-[calc(100%-20px)]  bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full px-4 pt-4">
					<h3 className="text-lg font-bold">{orderId ? "Edit a " : "Add new"} order request </h3>
					<button
						type="button"
						className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200"
						onClick={() => {
							setShowAddOrEditDrugOrder(false);
							setSelectedDrugOrder(null);
						}}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>

				<form className="h-[calc(100%-60px)]" onSubmit={handleSubmit(addOrder)}>
					<div className="flex items-start flex-col h-full gap-2" onSubmit={() => ""}>
						<div className="px-4 overflow-y-auto space-y-3 pb-12 w-full">
							<CustomSelect
								options={drugs.map((drug) => drug.name)}
								value={orderDetails.drug}
								label="Drug"
								placeholder="Select option"
								handleChange={(value) => setValue("drug", value)}
							/>
							<Input name="quantity" register={register} label="Quantity" placeholder="0" labelSx="text-sm" inputSx="text-sm" />
							<CustomSelect
								options={["Ernest Chemist", "Ampem Darko Herbal", "taabea"]}
								label="Supplier"
								placeholder="Select option"
								value={orderDetails.supplier}
								handleChange={(value) => setValue("supplier", value)}
							/>
							{/* <Input name="orderNo" register={register} label="Order #" placeholder="4456677383" labelSx="text-sm" inputSx="text-sm" /> */}
							<Input name="deliveryDate" register={register} type="date" label="Expected Delivery Date" placeholder="" labelSx="text-sm" inputSx="text-sm" />
							<CustomSelect
								options={["Cash", "Mobile Money", "Bank Transfer", "In Kind"]}
								label="Payment Method"
								placeholder="Select option"
								value={orderDetails.paymentMethod}
								handleChange={(value) => setValue("paymentMethod", value)}
							/>
							<CustomSelect
								options={["Pick Up", "Door to door Delivery", "Delivery Service"]}
								label="Delivery Method"
								placeholder="Select option"
								value={orderDetails.deliveryMethod}
								handleChange={(value) => setValue("deliveryMethod", value)}
							/>

							<Input name="address" register={register} label="Delivery Address" placeholder="" labelSx="text-sm" inputSx="text-sm" />
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

export default AddOrEditDrugOrder;
