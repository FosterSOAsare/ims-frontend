import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

import Input from "@/components/Input";
import CustomSelect from "@/components/Select";
import padNumber from "@/utils/padNumber";
import { toast } from "react-toastify";
import { useGetAllDrugsRequestQuery } from "@/apis/drugsApi";
import Loading, { PageLoading } from "@/components/Loading";
import { useCreateAnItemRequestRequestMutation, useLazyGetAnItemRequestRequestQuery, useUpdateAnItemRequestRequestMutation } from "@/apis/itemRequestsApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";

export interface INewOrEditRequestDetails {
	item: string;
	quantity: string;
	additionalNotes: string;
}
const initial: INewOrEditRequestDetails = {
	item: "",
	quantity: "",
	additionalNotes: "",
};

interface IAddOrEditRequest {
	setShowAddOrEditRequest: React.Dispatch<React.SetStateAction<boolean>>;
	requestId: string;
	setSelectedRequest: React.Dispatch<React.SetStateAction<number | null>>;
}

const AddOrEditRequest = ({ setShowAddOrEditRequest, requestId, setSelectedRequest }: IAddOrEditRequest) => {
	const [requestDetails, setRequestDetails] = useState<INewOrEditRequestDetails>(initial);

	const { data: drugs, error, isLoading } = useGetAllDrugsRequestQuery();
	const [createItemRequest, { data: created, isLoading: creating, error: createError }] = useCreateAnItemRequestRequestMutation();
	const [updateItemRequest, { data: updated, isLoading: updating, error: updateError }] = useUpdateAnItemRequestRequestMutation();
	const [getRequestDetails, { data: request, isLoading: gettingRequest, error: requestError }] = useLazyGetAnItemRequestRequestQuery();

	// Get request details if it is an edit request
	useEffect(() => {
		if (!requestId) return;
		getRequestDetails({ requestId });
	}, [requestId]);

	useEffect(() => {
		if (!request) return;
		const { item, quantity, additionalNotes } = request?.data;

		setRequestDetails({ item: item.name, quantity, additionalNotes });
	}, [request]);

	const addOrEditRequest = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { item, quantity, additionalNotes } = requestDetails;
		if (!item) return toast.error("Please select a drug", { autoClose: 1500 });
		if (!quantity) return toast.error("Please enter the quantity of drugs needed", { autoClose: 1500 });
		if (!additionalNotes) return toast.error("Please add some additional notes to the requests", { autoClose: 1500 });

		// Get item id
		const itemId = drugs?.data?.find(({ name }: { name: string }) => name === item)?.id || "";
		// Notes is optional
		const data = { quantity: +quantity, additionalNotes, itemId };
		requestId ? updateItemRequest({ requestId, ...data }) : createItemRequest(data);
	};

	const setValue = (name: string, value: string) => {
		setRequestDetails((prev) => ({ ...prev, [name]: value }));
	};

	useEffect(() => {
		if (!created && !updated) return;
		toast.success(`Item request successfully ${created ? "created" : "updated"}...`, { autoClose: 1500 });

		setShowAddOrEditRequest(false);
		setSelectedRequest(null);
	}, [created, updated]);

	useCreateErrorFromApiRequest(createError);
	useCreateErrorFromApiRequest(updateError);
	useCreateErrorFromApiRequest(error);
	useCreateErrorFromApiRequest(requestError);
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<div className="w-[28%] flex flex-col gap-4 h-[calc(100%-20px)]  bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full px-4 pt-4">
					<h3 className="text-lg font-bold">{requestId ? "Edit a " : "New"} department item request </h3>
					<button
						type="button"
						className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200"
						onClick={() => {
							setShowAddOrEditRequest(false);
							setSelectedRequest(null);
						}}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>

				{!isLoading && drugs && (
					<>
						{((requestId && !gettingRequest && requestDetails?.item) || !requestId) && (
							<form className="flex items-start flex-col h-full gap-2" onSubmit={addOrEditRequest}>
								<div className="px-4 h-[calc(100%-70px)]  overflow-y-auto space-y-3 pb-12 w-full">
									<CustomSelect
										options={drugs?.data.map((d: { name: string }) => d.name)}
										value={requestDetails.item}
										label="Item"
										placeholder="Select item"
										handleChange={(value) => setValue("item", value)}
									/>
									<Input
										name="quantity"
										value={requestDetails.quantity}
										setValue={(value) => setValue("quantity", value)}
										label="Quantity"
										placeholder="100"
										labelSx="text-sm"
										inputSx="text-sm"
									/>
									<div className="w-full">
										<label htmlFor="notes" className="text-sm">
											Additional Notes
										</label>
										<textarea
											value={requestDetails.additionalNotes}
											onChange={(e) => setValue("additionalNotes", e.target.value)}
											className="w-full h-24 resize-none border-[1px] focus:outline-0 p-2 rounded-[10px] border-gray-200"></textarea>
									</div>
								</div>

								<div className="w-full h-auto bg-white px-4 mt-auto gap-3">
									<button disabled={creating || updating} className="w-full bg-sec py-2 rounded-[10px] text-white" type="submit">
										{creating || updating ? <Loading /> : requestId ? "Update request" : "Save request"}
									</button>
								</div>
							</form>
						)}
					</>
				)}

				{isLoading && <PageLoading />}
			</div>
		</div>
	);
};

export default AddOrEditRequest;
