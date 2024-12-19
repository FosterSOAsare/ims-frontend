"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { drugOrderSchema } from "@/libs/hookform";

import Input from "@/components/Input";
import CustomSelect from "@/components/Select";
import { useGetAllSuppliersRequestQuery } from "@/apis/suppliersApi";
import { useGetAllDrugsRequestQuery } from "@/apis/drugsApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import { useCreateADrugOrderRequestMutation, useLazyGetADrugOrderRequestQuery, useUpdateADrugOrderRequestMutation } from "@/apis/drugOrdersApi";
import Loading, { PageLoading } from "@/components/Loading";

export interface IOrderDetails {
	itemId: string;
	quantity: string;
	supplier: string;
	additionalNotes: string;
	expectedDeliveryDate: string;
	paymentMethod: string;
	deliveryMethod: string;
	deliveryAddress: string;
}

const initial: IOrderDetails = {
	itemId: "",
	quantity: "",
	supplier: "",
	additionalNotes: "",
	expectedDeliveryDate: "",
	paymentMethod: "",
	deliveryMethod: "",
	deliveryAddress: "",
};

interface IAddOrEditStock {
	setSelectedDrugOrder: React.Dispatch<React.SetStateAction<null | number>>;
	setShowAddOrEditDrugOrder: React.Dispatch<React.SetStateAction<boolean>>;
	orderId: string;
}

const AddOrEditDrugOrder = ({ setShowAddOrEditDrugOrder, orderId, setSelectedDrugOrder }: IAddOrEditStock) => {
	const { data: suppliers, isLoading: gettingSuppliers, error: suppliersError } = useGetAllSuppliersRequestQuery();
	const { data: drugs, isLoading: gettingDrugs, error: drugsError } = useGetAllDrugsRequestQuery();
	const [createADrugOrderRequest, { data: created, isLoading: creating, error: createError }] = useCreateADrugOrderRequestMutation();
	const [updateADrugOrderRequest, { data: updated, isLoading: updating, error: updateError }] = useUpdateADrugOrderRequestMutation();
	const [getDrugOrder, { data: drugOrder, error: drugOrderError, isLoading: drugOrderLoading }] = useLazyGetADrugOrderRequestQuery();

	// Select fields will change the details directly while inputs will use a hookform for vaidation
	const { register, getValues, reset } = useSelectedValuesFromHookForm(drugOrderSchema);

	const [orderDetails, setOrderDetails] = useState<IOrderDetails>(initial);
	const [status, setStatus] = useState<string>("");

	// Fetch order if it is an edit request
	useEffect(() => {
		if (!orderId) return;
		getDrugOrder({ orderId });
	}, []);

	useEffect(() => {
		if (!drugOrder) return;

		const { item, quantity, supplier, additionalNotes, expectedDeliveryDate, paymentMethod, deliveryMethod, deliveryAddress } = drugOrder?.data;
		console.log({ deliveryAddress, expectedDeliveryDate, quantity: "" + quantity });
		reset({ deliveryAddress, expectedDeliveryDate: new Date(expectedDeliveryDate).toISOString().split("T")[0], quantity: "" + quantity });
		setOrderDetails({
			supplier: supplier.name,
			itemId: item.name,
			quantity: "" + quantity,
			additionalNotes,
			expectedDeliveryDate: new Date(expectedDeliveryDate).toISOString().split("T")[0],
			deliveryMethod,
			deliveryAddress,
			paymentMethod,
		});
	}, [drugOrder]);

	const setValue = (name: string, value: string) => {
		setOrderDetails((prev) => ({ ...prev, [name]: value }));
	};

	const addOrder = (status: string) => {
		setStatus(status);
		const { quantity, expectedDeliveryDate, deliveryAddress } = getValues();

		let { itemId, supplier, paymentMethod, deliveryMethod, additionalNotes } = orderDetails;
		if (!itemId) return toast.error("Please select the drug you want to order", { autoClose: 1500 });
		if (!paymentMethod) return toast.error("Please select a payment method", { autoClose: 1500 });
		if (!supplier) return toast.error("Please select the supplier of this drug", { autoClose: 1500 });
		if (!deliveryMethod) return toast.error("Please select a delivery method for your order", { autoClose: 1500 });

		const allData = { quantity: +quantity, expectedDeliveryDate, deliveryAddress, itemId, paymentMethod, deliveryMethod, additionalNotes, status };

		// Get supplierId and itemId using the names
		const supplierId = suppliers?.data?.find(({ name }: { name: string }) => name === supplier)?.id || "";
		itemId = drugs?.data?.find(({ name }: { name: string }) => name === itemId)?.id || "";

		orderId ? updateADrugOrderRequest({ ...allData, supplierId, itemId, orderId }) : createADrugOrderRequest({ ...allData, supplierId, itemId });
	};

	useEffect(() => {
		if (!created && !updated) return;
		toast.success(`Drug successfully ${created ? "created" : "updated"}...`, { autoClose: 1500 });
		setStatus("");
		setShowAddOrEditDrugOrder(false);
		setSelectedDrugOrder(null);
	}, [created, updated]);

	useCreateErrorFromApiRequest(drugsError);
	useCreateErrorFromApiRequest(suppliersError);
	useCreateErrorFromApiRequest(createError);
	useCreateErrorFromApiRequest(updateError);
	useCreateErrorFromApiRequest(drugOrderError);
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<div className="w-[28%] flex flex-col gap-4 h-[calc(100%-20px)]  bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full px-4 pt-4">
					<h3 className="text-lg font-bold">{orderId ? "Edit an" : "Add new"} order request </h3>
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

				{/* This check is to make the details of the order has been received if it is an edit. Also shows if it is not an edits */}
				{((orderId && !drugOrderLoading && orderDetails?.itemId) || !orderId) && (
					<>
						{!gettingDrugs && !gettingSuppliers && drugs && suppliers && (
							<form className="h-[calc(100%-60px)]">
								<div className="flex items-start flex-col h-full gap-2" onSubmit={() => ""}>
									<div className="px-4 overflow-y-auto space-y-3 pb-12 w-full">
										<CustomSelect
											options={drugs?.data?.map((drug: { name: string }) => drug.name)}
											value={orderDetails.itemId}
											label="Drug"
											placeholder="Select option"
											handleChange={(value) => setValue("itemId", value)}
										/>
										<Input name="quantity" register={register} label="Quantity" placeholder="0" labelSx="text-sm" inputSx="text-sm" />
										<CustomSelect
											options={suppliers?.data?.map((supplier: { name: string }) => supplier.name)}
											label="Supplier"
											placeholder="Select option"
											value={orderDetails.supplier}
											handleChange={(value) => setValue("supplier", value)}
										/>
										{/* <Input name="orderNo" register={register} label="Order #" placeholder="4456677383" labelSx="text-sm" inputSx="text-sm" /> */}
										<Input name="expectedDeliveryDate" register={register} type="date" label="Expected Delivery Date" placeholder="" labelSx="text-sm" inputSx="text-sm" />
										<CustomSelect
											options={["Credit/Debit Card", "Bank Transfer", "Payment on Delivery", "Mobile Money"]}
											label="Payment Method"
											placeholder="Select option"
											value={orderDetails.paymentMethod}
											handleChange={(value) => setValue("paymentMethod", value)}
										/>
										<CustomSelect
											options={["Standard Delivery", "Express Delivery", "Same-Day Delivery", "Next-Day Delivery", "Local Pickup", "Free Shipping", "Courier Delivery"]}
											label="Delivery Method"
											placeholder="Select option"
											value={orderDetails.deliveryMethod}
											handleChange={(value) => setValue("deliveryMethod", value)}
										/>

										<Input name="deliveryAddress" register={register} label="Delivery Address" placeholder="" labelSx="text-sm" inputSx="text-sm" />

										<div className="w-full">
											<label htmlFor="notes" className="text-sm">
												Additional Notes
											</label>
											<textarea
												value={orderDetails.additionalNotes}
												onChange={(e) => setValue("additionalNotes", e.target.value)}
												className="w-full h-24 resize-none border-[1px] focus:outline-0 p-2 rounded-[10px] border-gray-200"></textarea>
										</div>
									</div>

									<div className="w-full flex items-center justify-between gap-4 h-auto white px-4 py-4 mt-auto">
										<button disabled={creating || updating} className="w-2/5 bg-gray-100 py-2 rounded-[10px] hover:bg-gray-200" type="button" onClick={() => addOrder("draft")}>
											{(creating || updating) && status === "draft" ? <Loading /> : "Save as draft"}
										</button>
										<button
											disabled={true || creating || updating}
											className="w-3/5 bg-sec py-2 rounded-[10px] hover:opacity-70 text-white"
											type="button"
											onClick={() => addOrder("requested")}>
											{(creating || updating) && status === "requested" ? <Loading /> : "Save and send mail"}
										</button>
									</div>
								</div>
							</form>
						)}
					</>
				)}

				{(drugOrderLoading || gettingSuppliers || gettingDrugs) && <PageLoading />}
			</div>
		</div>
	);
};

export default AddOrEditDrugOrder;
