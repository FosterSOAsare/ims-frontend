import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

import Input from "@/components/Input";
import CustomSelect from "@/components/Select";
import drugs from "@/data/drugs";
import padNumber from "@/services/padNumber";
import { toast, ToastContainer } from "react-toastify";

export interface INewOrEditRequestDetails {
	drug: string;
	quantity: string;
	department: string;
	notes: string;
}
const initial: INewOrEditRequestDetails = {
	drug: "",
	quantity: "",
	department: "",
	notes: "",
};

interface IAddOrEditRequest {
	setShowAddOrEditRequest: React.Dispatch<React.SetStateAction<boolean>>;
	requestId: string;
	setSelectedRequest: React.Dispatch<React.SetStateAction<number | null>>;
}

const AddOrEditRequest = ({ setShowAddOrEditRequest, requestId, setSelectedRequest }: IAddOrEditRequest) => {
	const [requestDetails, setRequestDetails] = useState<INewOrEditRequestDetails>(initial);

	const addOrEditRequest = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { drug, quantity, department, notes } = requestDetails;
		if (!drug) return toast.error("Please select a drug", { autoClose: 1500 });
		if (!quantity) return toast.error("Please enter the quantity of drugs needed", { autoClose: 1500 });
		if (!department) return toast.error("Please select the department to receive the request", { autoClose: 1500 });

		// Notes is optional
		toast.success("New request successfully added...", { autoClose: 1500 });
	};

	const setValue = (name: string, value: string) => {
		setRequestDetails((prev) => ({ ...prev, [name]: value }));
	};
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<div className="w-[28%] flex flex-col gap-4 h-[calc(100%-20px)]  bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full px-4 pt-4">
					<h3 className="text-lg font-bold">{requestId ? "Edit a " : "Add new"} order request </h3>
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

				<form className="flex items-start flex-col h-full gap-2" onSubmit={addOrEditRequest}>
					<div className="px-4 h-[calc(100%-70px)]  overflow-y-auto space-y-2 pb-12 w-full">
						<h3 className="mb-3 text-lg font-bold">Drug details</h3>

						<CustomSelect options={drugs.map((d) => d.name)} value={requestDetails.drug} label="Drug" placeholder="Select drug" handleChange={(value) => setValue("drug", value)} />
						<Input
							name="quantity"
							value={requestDetails.quantity}
							setValue={(value) => setValue("quantity", value)}
							label="Quantity"
							placeholder="100"
							labelSx="text-sm"
							inputSx="text-sm"
						/>
						<CustomSelect
							options={Array.from({ length: 10 }, (_i, i) => `Department ${padNumber(i + 1)}`)}
							value={requestDetails.department}
							label="Department"
							placeholder="Select department"
							handleChange={(value) => setValue("department", value)}
						/>

						<div className="w-full">
							<label htmlFor="notes" className="text-sm">
								Additional Notes
							</label>
							<textarea
								value={requestDetails.notes}
								onChange={(e) => setValue("notes", e.target.value)}
								className="w-full h-24 resize-none border-[1px] focus:outline-0 p-2 rounded-[10px] border-gray-200"></textarea>
						</div>
					</div>

					<div className="w-full h-auto bg-white px-4 mt-auto gap-3">
						<button className="w-full bg-sec py-2 rounded-[10px] text-white" type="submit">
							Save request
						</button>
					</div>
				</form>

				<ToastContainer />
			</div>
		</div>
	);
};

export default AddOrEditRequest;
