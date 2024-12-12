"use client";
import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useLazyGetASupplierDetailsRequestQuery } from "@/apis/suppliersApi";
import { PageLoading } from "@/components/Loading";

export interface ISupplierDetails {
	name: string;
	brandTradeName: string;
	supplierType: string;
	minimumOrderQuantity: string;
	leadTime: string;
	deliveryMethod: string;
	contactDetails: {
		primaryContactName: string;
		jobTitle: string;
		department: string;
		phoneNumber: string;
		email: string;
		physicalAddress: string;
		mailingAddress: string;
		emergencyContactName: string;
		emergencyContactTitle: string;
		emergencyContactNumber: string;
	};
	paymentDetails: { paymentType: string; bankName: string; accountType: string; accountNumber: string; currency: string; paymentTerms: string; mobileMoneyPhoneNumber: string; provider: string };
}

const initial: ISupplierDetails = {
	name: "",
	brandTradeName: "",
	supplierType: "",
	deliveryMethod: "",
	minimumOrderQuantity: "",
	leadTime: "",
	contactDetails: {
		primaryContactName: "",
		jobTitle: "",
		department: "",
		phoneNumber: "",
		email: "",
		physicalAddress: "",
		mailingAddress: "",
		emergencyContactName: "",
		emergencyContactTitle: "",
		emergencyContactNumber: "",
	},
	paymentDetails: { paymentType: "", bankName: "", accountType: "", accountNumber: "", currency: "", paymentTerms: "", mobileMoneyPhoneNumber: "", provider: "" },
};
// const initial: ISupplierDetails = {
// 	name: "MDS Pharmaceutical",
// 	brandTradeName: "MDS",
// 	supplierType: "manufacturer",
// 	deliveryMethod: "couriers",
// 	minimumOrderQuantity: "50",
// 	leadTime: "7",
// 	contactDetails: {
// 		primaryContactName: "Asare Foster",
// 		jobTitle: "Sales Manager",
// 		department: "Sales",
// 		phoneNumber: "550529015",
// 		email: "asare4ster@gmail.com",
// 		physicalAddress: "test address",
// 		mailingAddress: "",
// 		emergencyContactName: "James Ofori",
// 		emergencyContactTitle: "Sales Manager",
// 		emergencyContactNumber: "2335567783",
// 	},
// 	paymentDetails: { paymentType: "", bankName: "", accountType: "", accountNumber: "", currency: "", paymentTerms: "", mobileMoneyPhoneNumber: "", provider: "" },
// };

interface IAddOrEditSupplier {
	setSelectedSupplier: React.Dispatch<React.SetStateAction<null | number>>;
	setShowAddOrEditSupplier: React.Dispatch<React.SetStateAction<boolean>>;
	supplierId: string;
}

const AddOrEditSupplier = ({ setShowAddOrEditSupplier, supplierId, setSelectedSupplier }: IAddOrEditSupplier) => {
	const [supplierDetails, setSupplierDetails] = useState<ISupplierDetails>(initial);
	const [getASupplierRequest, { data, error, isLoading }] = useLazyGetASupplierDetailsRequestQuery();
	const [pageLoaded, setPageLoaded] = useState(true);
	const [step, setStep] = useState<number>(0);

	// Fetch supplier if it is an edit request

	useEffect(() => {
		if (supplierId) {
			setPageLoaded(false);
			// fetch supplier and used the data
			getASupplierRequest({ supplierId: supplierId as string });
		}
	}, [supplierId]);

	useEffect(() => {
		if (!data) return;

		const {
			name,
			brandTradeName,
			supplierType,
			deliveryMethod,
			minimumOrderQuantity,
			leadTime,
			primaryContactName,
			jobTitle,
			department,
			phoneNumber,
			email,
			physicalAddress,
			mailingAddress,
			emergencyContactName,
			emergencyContactTitle,
			emergencyContactNumber,
			paymentType,
			bankName,
			accountType,
			accountNumber,
			currency,
			paymentTerms,
			mobileMoneyPhoneNumber,
			provider,
		} = data?.data;

		setSupplierDetails({
			name,
			brandTradeName,
			supplierType,
			deliveryMethod,
			minimumOrderQuantity: "" + minimumOrderQuantity,
			leadTime: "" + leadTime,
			contactDetails: {
				primaryContactName,
				jobTitle,
				department,
				phoneNumber: phoneNumber.split("+233")[1],
				email,
				physicalAddress,
				mailingAddress: mailingAddress || "",
				emergencyContactName: emergencyContactName || "",
				emergencyContactTitle: emergencyContactTitle || "",
				emergencyContactNumber: emergencyContactNumber ? emergencyContactNumber.split("+233")[1] : "",
			},
			paymentDetails: {
				paymentType,
				bankName: bankName || "",
				accountType: accountType || "",
				accountNumber: accountNumber || "",
				currency,
				paymentTerms,
				mobileMoneyPhoneNumber: mobileMoneyPhoneNumber ? mobileMoneyPhoneNumber.split("+233")[1] : "",
				provider: provider || "",
			},
		});

		setPageLoaded(true);
	}, [data]);

	console.log({ supplierDetails, pageLoaded });

	const setValue = (data: any) => {
		setSupplierDetails((prev) => ({ ...prev, ...data }));
	};

	const closeSupplierModal = () => {
		setShowAddOrEditSupplier(false);
		setSelectedSupplier(null);
	};

	const steps = [
		<Step1 key={0} setValues={setValue} supplierDetails={supplierDetails} step={step} setStep={setStep} />,
		<Step2 key={1} setValues={setValue} supplierDetails={supplierDetails} step={step} setStep={setStep} />,
		<Step3 key={2} setValues={setValue} supplierDetails={supplierDetails} step={step} setStep={setStep} supplierId={supplierId} closeModal={closeSupplierModal} />,
	];
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<aside className="w-[28%] flex flex-col gap-4 h-[calc(100%-20px)] bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full px-4 pt-4">
					<h3 className="text-lg font-bold">{supplierId ? "Edit a " : "Add new"} supplier </h3>

					<button className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200" onClick={closeSupplierModal}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>

				<div className="h-[calc(100%-50px)]">
					{pageLoaded && <>{steps[step]}</>}
					{!pageLoaded && <PageLoading />}
				</div>
			</aside>
		</div>
	);
};

export default AddOrEditSupplier;
