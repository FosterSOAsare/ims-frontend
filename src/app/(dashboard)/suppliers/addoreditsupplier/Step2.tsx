import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { ISupplierDetails } from ".";
import { newSupplierStep2Schema } from "@/libs/hookform";
import Input from "@/components/Input";

import GhanaImage from "@/assets/images/ghana.svg";

const Step2 = ({ supplierDetails, setValues, step, setStep }: { supplierDetails: ISupplierDetails; setValues: (data: any) => void; step: number; setStep: Dispatch<SetStateAction<number>> }) => {
	const { register, handleSubmit, reset, getValues } = useSelectedValuesFromHookForm(newSupplierStep2Schema);

	// Set fields on start
	useEffect(() => {
		const { primaryContactName, jobTitle, department, phoneNumber, email, physicalAddress, mailingAddress, emergencyContactName, emergencyContactNumber, emergencyContactTitle } =
			supplierDetails.contactDetails;
		reset({ primaryContactName, jobTitle, department, phoneNumber, email, physicalAddress, mailingAddress, emergencyContactName, emergencyContactNumber, emergencyContactTitle });
	}, []);

	// Save data without validation and move backwards
	const goBack = () => {
		const { primaryContactName, jobTitle, department, phoneNumber, email, physicalAddress, mailingAddress, emergencyContactName, emergencyContactNumber, emergencyContactTitle } = getValues();

		setValues({
			contactDetails: { primaryContactName, jobTitle, department, phoneNumber, email, physicalAddress, mailingAddress, emergencyContactName, emergencyContactNumber, emergencyContactTitle },
		});
		setStep((prev) => --prev);
	};

	// Check validations and proceed
	const step2Data = (data: any) => {
		const { primaryContactName, jobTitle, department, phoneNumber, email, physicalAddress, mailingAddress, emergencyContactName, emergencyContactNumber, emergencyContactTitle } = data;
		const allData = {
			contactDetails: { primaryContactName, jobTitle, department, phoneNumber, email, physicalAddress, mailingAddress, emergencyContactName, emergencyContactNumber, emergencyContactTitle },
		};
		setValues(allData);
		setStep((prev) => ++prev);
	};
	return (
		<form className="flex items-start flex-col h-full gap-2" onSubmit={handleSubmit(step2Data)}>
			<div className="px-4 h-[calc(100%-100px)]  overflow-y-auto  pb-12 w-full">
				{/* Primary contact details */}
				<div className="space-y-2">
					<h3 className="mb-3 text-lg font-bold">Primary contact details</h3>
					<Input name="primaryContactName" register={register} label="Primary Contact Name" placeholder="Eg: James Appiah" labelSx="text-sm" inputSx="text-sm" />
					<div className="flex items-center gap-2">
						<Input name="jobTitle" register={register} label="Job Title" placeholder="Enter job title" labelSx="text-sm" inputSx="text-sm" />
						<Input name="department" register={register} label="Department" placeholder="Enter department" labelSx="text-sm" inputSx="text-sm" />
					</div>
					<div>
						<label htmlFor="costPrice" className="text-sm">
							PhoneNumber
						</label>
						<div className="border-[1px] flex items-stretch justify-start rounded-[5px] overflow-hidden">
							<div className="px-2 gap-2 border-r-[1px] py-2 flex items-center justify-center">
								<Image src={GhanaImage} alt="Image" height={12} width={25} />
								<p className="text-primary font-medium text-sm">+233</p>
							</div>
							<input type="text" {...register("phoneNumber")} className="flex-1 focus:outline-0 p-2 text-sm" placeholder="555 553 8672" />
						</div>
					</div>

					{/* <Input name="phoneNumber" register={register} label="PhoneNumber Number" placeholder="" labelSx="text-sm" inputSx="text-sm" /> */}
					<Input name="email" register={register} label="Email" placeholder="username@email.com" labelSx="text-sm" inputSx="text-sm" />
					<Input name="physicalAddress" register={register} label="Physical Address" placeholder="Enter address" labelSx="text-sm" inputSx="text-sm" />
					<Input name="mailingAddress" required={false} register={register} label="Mailing Address" placeholder="Enter address" labelSx="text-sm" inputSx="text-sm" />
				</div>

				{/* Emergency contact details */}
				<div className="mt-12 space-y-2">
					<h3 className="mb-3 text-lg font-bold">Emergency contact details</h3>
					<Input name="emergencyContactName" register={register} label="Emergency Contact Name" placeholder="Eg: James Appiah" labelSx="text-sm" inputSx="text-sm" />
					<div className="flex items-center gap-2">
						<Input name="emergencyContactTitle" register={register} label="Job Title" placeholder="Enter job title" labelSx="text-sm" inputSx="text-sm" />
					</div>
					<div>
						<label htmlFor="emergencyContactNumber" className="text-sm">
							PhoneNumber
						</label>
						<div className="border-[1px] flex items-stretch justify-start rounded-[5px] overflow-hidden">
							<div className="px-2 gap-2 border-r-[1px] py-2 flex items-center justify-center">
								<Image src={GhanaImage} alt="Image" height={12} width={25} />
								<p className="text-primary font-medium text-sm">+233</p>
							</div>
							<input id="emergencyContactNumber" type="text" {...register("emergencyContactNumber")} className="flex-1 focus:outline-0 p-2 text-sm" placeholder="555 553 8672" />
						</div>
					</div>
				</div>
			</div>

			<div className="w-full h-[100px] bg-white px-4 py-4 mt-auto gap-3">
				<div className="w-full mb-3 flex items-center justify-between gap-3">
					{[1, 2, 3].map((item) => (
						<div key={item} className={`w-full ${step >= item - 1 ? "bg-sec" : "bg-gray-100"} rounded-full h-2`}></div>
					))}
				</div>
				<div className="flex items-center justify-center gap-2">
					<button type="button" className="w-full hover:bg-gray-200 border-[1px] py-2 rounded-[10px]" onClick={() => goBack()}>
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
