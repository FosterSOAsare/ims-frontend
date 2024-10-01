import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

import { ISupplierDetails } from ".";

import Input from "@/components/Input";
import CustomSelect from "@/components/Select";

import GhanaImage from "@/assets/images/ghana.svg";

const Step3 = ({ supplierDetails, setValues, step, setStep }: { supplierDetails: ISupplierDetails; setValues: (data: any) => void; step: number; setStep: Dispatch<SetStateAction<number>> }) => {
	const { paymentDetails: details } = supplierDetails;

	const [paymentDetails, setPaymentDetails] = useState(details);

	const setValue = (name: string, value: string) => {
		setPaymentDetails((prev) => ({ ...prev, [name]: value }));
	};

	const step3Data = (e: any) => {
		e.preventDefault();
		const { paymentType, bankName, accountType, accountNumber, currency, paymentTerms, phone, provider } = paymentDetails;
		// Validate fields
		if (!paymentType) return toast.error("Please select a payment type", { autoClose: 1500 });
		if (paymentType.toLowerCase() === "bank") {
			if (!bankName) return toast.error("Please enter bank name of supplier", { autoClose: 1500 });
			if (!accountType) return toast.error("Please select account type of supplier", { autoClose: 1500 });
			if (!accountNumber) return toast.error("Please enter account number of supplier", { autoClose: 1500 });
		}
		if (paymentType.toLowerCase() === "mobile money") {
			if (!provider) return toast.error("Please select supplier's service provider", { autoClose: 1500 });
			if (!/^[0-9]{9,12}$/.test(phone)) return toast.error("Please enter the valid phone number of supplier", { autoClose: 1500 });
		}

		if (!currency) return toast.error("Please select supplier's currency", { autoClose: 1500 });
		if (!paymentTerms) return toast.error("Please enter supplier's payment terms", { autoClose: 1500 });

		setValues({ paymentDetails: { paymentType, bankName, accountType, accountNumber, currency, paymentTerms, phone, provider } });
		// setStep((prev) => ++prev);
		toast.success("Supplier created successfully", { autoClose: 1500 });
	};
	return (
		<form className="flex items-start flex-col h-full gap-2" onSubmit={step3Data}>
			<div className="px-4 h-[calc(100%-100px)]  overflow-y-auto space-y-2 pb-12 w-full">
				<h3 className="mb-3 text-lg font-bold">Payment details</h3>

				<CustomSelect
					options={["Bank", "Mobile Money"]}
					value={paymentDetails.paymentType}
					label="Supplier Type"
					placeholder="Select option"
					handleChange={(value) => setValue("paymentType", value)}
				/>
				{paymentDetails.paymentType && (
					<>
						{paymentDetails.paymentType.toLowerCase() === "bank" && (
							<>
								<Input
									name="bankName"
									value={paymentDetails.bankName}
									setValue={(value) => setValue("bankName", value)}
									label="Bank Name"
									placeholder=""
									labelSx="text-sm"
									inputSx="text-sm"
								/>
								<div className="flex items-center gap-2">
									<CustomSelect
										options={["Current", "Savings"]}
										value={paymentDetails.accountType}
										label="Account type"
										placeholder="Select option"
										handleChange={(value) => setValue("accountType", value)}
									/>
									<Input
										value={paymentDetails.accountNumber}
										setValue={(value) => setValue("accountNumber", value)}
										placeholder="eg: Paracetamol"
										label="Account Number"
										labelSx="text-sm"
										name="accountNumber"
										inputSx="text-sm"
									/>
								</div>
							</>
						)}
						{paymentDetails.paymentType.toLowerCase() === "mobile money" && (
							<>
								<CustomSelect
									options={["MTN", "Telecel", "AirtelTigo"]}
									value={paymentDetails.provider}
									label="Provider"
									placeholder="Select option"
									handleChange={(value) => setValue("provider", value)}
								/>
								<div>
									<label htmlFor="costPrice" className="text-sm">
										Phone
									</label>
									<div className="border-[1px] flex items-stretch justify-start rounded-[5px] overflow-hidden">
										<div className="px-2 gap-2 border-r-[1px] py-2 flex items-center justify-center">
											<Image src={GhanaImage} alt="Image" height={12} width={25} />
											<p className="text-primary font-medium text-sm">+233</p>
										</div>
										<input
											type="text"
											value={paymentDetails.phone}
											onChange={(e) => setValue("phone", e.target.value)}
											className="flex-1 focus:outline-0 p-2 text-sm"
											placeholder="555 553 8672"
										/>
									</div>
								</div>
							</>
						)}
						<CustomSelect
							options={["GHS", "NGN", "USD"]}
							value={paymentDetails.currency}
							label="Currency"
							placeholder="Select option"
							handleChange={(value) => setValue("currency", value)}
						/>
						<div className="w-full">
							<label htmlFor="notes" className="text-sm">
								Payment terms
							</label>
							<textarea
								value={paymentDetails.paymentTerms}
								onChange={(e) => setValue("paymentTerms", e.target.value)}
								className="w-full h-24 resize-none border-[1px] focus:outline-0 p-2 rounded-[10px] border-gray-200"></textarea>
						</div>
					</>
				)}
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

export default Step3;
