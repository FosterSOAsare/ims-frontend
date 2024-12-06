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
	const [deliveryMethod, setDeliveryMethod] = useState(supplierDetails.deliveryMethod as string);

	useEffect(() => {
		const { name, brandTradeName, minimumOrderQuantity, leadTime } = supplierDetails;
		reset({ name, brandTradeName, minimumOrderQuantity, leadTime });
	}, []);

	const step1Data = (data: any) => {
		const { name, brandTradeName, minimumOrderQuantity, leadTime } = data;
		if (!supplierType) return toast.error("Please select a supplier type", { autoClose: 1500 });
		if (!deliveryMethod) return toast.error("Please select a delivery method for supplier", { autoClose: 1500 });

		const allData = { supplierType, leadTime, deliveryMethod, name, brandTradeName, minimumOrderQuantity };
		setValues(allData);

		setStep((prev) => ++prev);
	};
	return (
		<form className="flex items-start flex-col h-full gap-2" onSubmit={handleSubmit(step1Data)}>
			<div className="px-4 h-[calc(100%-100px)]  overflow-y-auto space-y-2 pb-12 w-full">
				<Input name="name" register={register} label="Supplier Name" placeholder="Eg: MDS Pharmaceuticals Ltd." labelSx="text-sm" inputSx="text-sm" />
				<Input required={false} name="brandTradeName" register={register} label="Brand/Trade Name" placeholder="eg: Paracetamol" labelSx="text-sm" inputSx="text-sm" />
				<CustomSelect
					options={["Manufacturer", "Distributor", "Wholesaler"]}
					value={supplierType}
					label="Supplier Type"
					placeholder="Select option"
					handleChange={(value) => setSupplierType(value)}
				/>
				<Input name="minimumOrderQuantity" register={register} label="Minimun order qty" placeholder="eg: 6700" labelSx="text-sm" inputSx="text-sm" />
				<Input name="leadTime" register={register} label="Lead Time(In days)" placeholder="Eg: 7" labelSx="text-sm" inputSx="text-sm" />
				<CustomSelect
					options={[
						"Wholesalers/Distributors",
						"From Manufacturers",
						"Couriers",
						"Specialized Pharma Logistics",
						"Company-Owned Vehicles",
						"Bike/Motorcycle Deliveries",
						"B2B Pharmaceutical Platforms",
						"E-Pharmacy Integration",
						"Cold Chain Delivery",
					]}
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
