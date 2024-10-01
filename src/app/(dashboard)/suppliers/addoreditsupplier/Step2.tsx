import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { ISupplierDetails } from ".";
import { newSupplierStep2Schema } from "@/libs/hookform";
import Input from "@/components/Input";

import GhanaImage from "@/assets/images/ghana.svg";

const Step2 = ({ supplierDetails, setValues, step, setStep }: { supplierDetails: ISupplierDetails; setValues: (data: any) => void; step: number; setStep: Dispatch<SetStateAction<number>> }) => {
	const { register, handleSubmit, reset } = useSelectedValuesFromHookForm(newSupplierStep2Schema);

	// Set fields on start
	useEffect(() => {
		const { name, jobTitle, department, phone, email, physicalAddress, mailingAddress } = supplierDetails.contactDetails;
		reset({ name, jobTitle, department, phone, email, physicalAddress, mailingAddress });
	}, []);

	const step2Data = (data: any) => {
		const { name, jobTitle, department, phone, email, physicalAddress, mailingAddress } = data;

		const allData = { contactDetails: { name, jobTitle, department, phone, email, physicalAddress, mailingAddress } };
		setValues(allData);

		setStep((prev) => ++prev);
	};
	return (
		<form className="flex items-start flex-col h-full gap-2" onSubmit={handleSubmit(step2Data)}>
			<div className="px-4 h-[calc(100%-100px)]  overflow-y-auto space-y-2 pb-12 w-full">
				<h3 className="mb-3 text-lg font-bold">Contact details</h3>
				<Input name="name" register={register} label="Primary Contact Name" placeholder="Eg: James Appiah" labelSx="text-sm" inputSx="text-sm" />
				<div className="flex items-center gap-2">
					<Input name="jobTitle" register={register} label="Job Title" placeholder="Enter job title" labelSx="text-sm" inputSx="text-sm" />
					<Input name="department" register={register} label="Department" placeholder="Enter department" labelSx="text-sm" inputSx="text-sm" />
				</div>
				<div>
					<label htmlFor="costPrice" className="text-sm">
						Phone
					</label>
					<div className="border-[1px] flex items-stretch justify-start rounded-[5px] overflow-hidden">
						<div className="px-2 gap-2 border-r-[1px] py-2 flex items-center justify-center">
							<Image src={GhanaImage} alt="Image" height={12} width={25} />
							<p className="text-primary font-medium text-sm">+233</p>
						</div>
						<input type="text" {...register("phone")} className="flex-1 focus:outline-0 p-2 text-sm" placeholder="555 553 8672" />
					</div>
				</div>

				{/* <Input name="phone" register={register} label="Phone Number" placeholder="" labelSx="text-sm" inputSx="text-sm" /> */}
				<Input name="email" register={register} label="Email" placeholder="username@email.com" labelSx="text-sm" inputSx="text-sm" />
				<Input name="physicalAddress" register={register} label="Physical Address" placeholder="Enter address" labelSx="text-sm" inputSx="text-sm" />
				<Input name="mailingAddress" register={register} label="Mailing Address" placeholder="Enter address" labelSx="text-sm" inputSx="text-sm" />
			</div>

			<div className="w-full h-[100px] bg-white px-4 py-4 mt-auto gap-3">
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
