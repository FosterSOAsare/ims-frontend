import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ISupplierDetails } from ".";
import Input from "@/components/Input";
import CustomSelect from "@/components/Select";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { newSupplierStep1Schema } from "@/libs/hookform";
import { toast } from "react-toastify";

const Step1 = ({ supplierDetails, setValues, step, setStep }: { supplierDetails: ISupplierDetails; setValues: (data: any) => void; step: number; setStep: Dispatch<SetStateAction<number>> }) => {
	const { register, handleSubmit, reset } = useSelectedValuesFromHookForm(newSupplierStep1Schema);
	const [supplierType, setSupplierType] = useState(supplierDetails.supplierType as string);
	const [leadTime, setLeadTime] = useState(supplierDetails.leadTime as string);
	const [deliveryMethod, setDeliveryMethod] = useState(supplierDetails.deliveryMethod as string);

	useEffect(() => {
		const { name, tradeName, minOrderQuantity } = supplierDetails;
		reset({ name, tradeName, minOrderQuantity });
	}, []);

	const step1Data = (data: any) => {
		const { name, tradeName, minOrderQuantity } = data;
		if (!supplierType) return toast.error("Please select a supplier type", { autoClose: 1500 });
		if (!leadTime) return toast.error("Please select a lead time of supplier", { autoClose: 1500 });
		if (!deliveryMethod) return toast.error("Please select a delivery method for supplier", { autoClose: 1500 });

		const allData = { supplierType, leadTime, deliveryMethod, name, tradeName, minOrderQuantity };
		setValues(allData);

		setStep((prev) => ++prev);
	};
	return (
		<form className="flex items-start flex-col h-full gap-2" onSubmit={handleSubmit(step1Data)}>
			<div className="px-4 h-[calc(100%-100px)]  overflow-y-auto space-y-2 pb-12 w-full">
				<h3 className="mb-3 text-lg font-bold">Drug details</h3>
				<Input name="name" register={register} label="Supplier Name" placeholder="Eg: MDS Pharmaceuticals Ltd." labelSx="text-sm" inputSx="text-sm" />
				<Input name="tradeName" register={register} label="Brand/Trade Name" placeholder="eg: Paracetamol" labelSx="text-sm" inputSx="text-sm" />
				<CustomSelect options={["Free", "Monthly", "Paid"]} value={supplierType} label="Supplier Type" placeholder="Select option" handleChange={(value) => setSupplierType(value)} />
				<Input name="minOrderQuantity" register={register} label="Minimun order qty" placeholder="eg: Panadol" labelSx="text-sm" inputSx="text-sm" />
				<CustomSelect options={["Lead 1", "Lead 2", "Lead 3"]} value={leadTime} label="Lead Time" placeholder="Select option" handleChange={(value) => setLeadTime(value)} />
				<CustomSelect
					options={["Delivery 1", "Delivery 2", "Delivery 3"]}
					value={deliveryMethod}
					label="Delivery Method"
					placeholder="Select option"
					handleChange={(value) => setDeliveryMethod(value)}
				/>
			</div>

			<div className="w-full h-[100px] bg-white px-4 py-4 mt-auto gap-3">
				<div className="w-full mb-3 flex items-center justify-between gap-3">
					{[1, 2, 3].map((item) => (
						<div key={item} className={`w-full ${step >= item - 1 ? "bg-sec" : "bg-gray-100"} rounded-full h-2`}></div>
					))}
				</div>
				<button className="w-full bg-sec py-2 rounded-[10px] text-white" type="submit">
					Next
				</button>
			</div>
		</form>
	);
};

export default Step1;
