import React, { Fragment, useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import suppliers from "@/data/suppliers";

import { useGetASupplierDetailsRequestQuery } from "@/apis/suppliersApi";
import { PageLoading } from "@/components/Loading";

interface ISupplierDetailsComponent {
	supplierId: string;
	setShowSupplierDetails: React.Dispatch<React.SetStateAction<boolean>>;
	setShowAddOrEditSupplier: React.Dispatch<React.SetStateAction<boolean>>;
}

const SupplierDetails = ({ supplierId, setShowSupplierDetails, setShowAddOrEditSupplier }: ISupplierDetailsComponent) => {
	// Get supplier details
	const { data: supplierDetails, isLoading, error } = useGetASupplierDetailsRequestQuery({ supplierId });
	const [showPaymentInfo, setShowPaymentInfo] = useState(false);

	const paymentInfo = [
		{ name: "bank", value: supplierDetails?.data?.bankName },
		{ name: "Account Number", value: supplierDetails?.data?.accountNumber },
		{ name: "Account type", value: supplierDetails?.data?.accountType },
		{ name: "Currency", value: supplierDetails?.data?.currency },
		{ name: "Momo Provider", value: supplierDetails?.data?.provider },
		{ name: "Phone Number", value: supplierDetails?.data?.mobileMoneyPhoneNumber },
	];

	const hasPaymentDetails = useMemo(() => paymentInfo.some((p) => p.value), [paymentInfo]);

	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<aside className="w-[32%] flex flex-col gap-2  h-[calc(100%-20px)] bg-white rounded-[5px]">
				<div className="flex items-center justify-end w-full px-4 pt-4">
					<button
						className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200"
						onClick={() => {
							setShowSupplierDetails(false);
						}}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>

				{!isLoading && supplierDetails && (
					<div className="h-[calc(100%-50px)]">
						<div className="h-[calc(100%-60px)] overflow-y-auto pb-12 w-full">
							<div className="w-full  h-auto px-4">
								<div className="w-full pb-6 border-b-[1px]">
									<h3 className="text-2xl font-bold flex items-center gap-2">
										<Icon icon="solar:buildings-3-line-duotone" className="text-xl text-gray-400" />
										{supplierDetails?.data?.name}
									</h3>
									<h3 className="text-lg mt-4 font-bold">Supplier Details</h3>

									<div className="flex gap-2 mt-4">
										<div className="w-3/5 bg-[#F8F9FB] border-[1px] card p-2 rounded-[12px]">
											<h3 className="uppercase text-sm font-medium text-gray-400">Contact Person</h3>
											<div className="flex mt-2 gap-2 items-center justify-start">
												<p className="font-normal text-sm text-primary">{supplierDetails?.data?.primaryContactName}</p>
												<span className="px-2 py-[4px] rounded-full bg-[#D9FDFD] text-[#087878] text-xs">{supplierDetails?.data?.jobTitle}</span>
											</div>
										</div>

										<div className="w-2/5 bg-[#F8F9FB] border-[1px] card p-2 rounded-[12px]">
											<h3 className="uppercase text-sm font-medium text-gray-400">Contact</h3>
											<div className="flex mt-2 gap-2 items-center justify-start">
												<p className="text-primary text-sm font-medium flex items-center gap-2">
													<Icon icon="solar:outgoing-call-outline" className="text-xl" />
													{supplierDetails?.data?.phoneNumber}
												</p>
											</div>
										</div>
									</div>

									<div className="mt-4 w-[68%] border-[#F1F5F9] bg-[#F8F9FB] border-[1px] card p-4 rounded-[12px]">
										<h3 className="uppercase text-sm font-medium text-gray-400">TYPE</h3>
										<div className="flex mt-4 gap-2  items-center justify-start">
											<p className="p-1 px-3 rounded-full font-medium text-xs text-sec bg-blue-200 flex items-center gap-2">{supplierDetails?.data?.supplierType}</p>
										</div>
									</div>
								</div>
							</div>

							{/* Payment Info */}
							{hasPaymentDetails && (
								<section className="w-full p-4 pb-8 border-b-[1px]">
									<h3 className="text-xl font-bold text-primary mb-3">Payment </h3>
									<div className="bg-gray-100 card rounded-[12px] border-[1px] p-4">
										<div className="flex items-center justify-between mb-2 text-sm">
											<h3 className="uppercase text-sm font-medium text-gray-400">Payment Info</h3>
											<button className="underline" onClick={() => setShowPaymentInfo((prev) => !prev)}>
												{showPaymentInfo ? "Hide" : "Show"}
											</button>
										</div>
										<div className={`${showPaymentInfo ? "" : "blur-sm"}`}>
											{paymentInfo.map(({ name, value }, index) => (
												<Fragment key={index}>
													{value && (
														<p className="w-full text-sm mb-2">
															{name}: <span className="text-primary font-medium"> {value}</span>
														</p>
													)}
												</Fragment>
											))}
										</div>
									</div>
								</section>
							)}

							{/* Order Details */}
							<section className="px-4 pb-8 border-b-[1px]">
								<h3 className="text-lg mt-4 font-bold">Order Details</h3>
								<div className="flex gap-2 bg-[#F8F9FB] card rounded-[12px] p-4 mt-4">
									<div className="w-auto border-r-[1px] pr-4 border-[#F1F5F9]">
										<h3 className="uppercase text-sm font-medium text-gray-400">Minimum order Qty</h3>
										<div className="flex mt-2 gap-2 items-center justify-start">
											<p className="font-normal text-sm text-primary">{supplierDetails?.data?.minimumOrderQuantity} units per product</p>
										</div>
									</div>

									<div className="pl-4">
										<h3 className="uppercase text-sm font-medium text-gray-400">LEAD TIME</h3>
										<div className="flex mt-2 gap-2 items-center justify-start">
											<p className="text-primary text-sm font-medium flex items-center gap-2">{supplierDetails?.data?.leadTime} days</p>
										</div>
									</div>
								</div>
							</section>

							<section className="p-4">
								<div className="flex gap-2 mt-4">
									{supplierDetails?.data?.emergencyContactName && (
										<div className="w-3/5 bg-[#F8F9FB] border-[1px] card p-2 rounded-[12px]">
											<h3 className="uppercase text-sm font-medium text-gray-400">Emergency Contact</h3>
											<div className="flex mt-2 gap-2 items-center justify-start">
												<p className="font-normal text-sm text-primary">{supplierDetails?.data?.emergencyContactName}</p>
												{supplierDetails?.data?.emergencyContactTitle && <span className="px-2 py-[4px] rounded-full bg-[#D9FDFD] text-[#087878] text-xs">Sales Manager</span>}
											</div>
										</div>
									)}

									<div className="w-2/5 bg-[#F8F9FB] border-[1px] card p-2 rounded-[12px]">
										<h3 className="uppercase text-sm font-medium text-gray-400">Emergency</h3>
										<div className="flex mt-2 gap-2 items-center justify-start">
											<p className="text-primary text-sm font-medium flex items-center gap-2">
												<Icon icon="solar:outgoing-call-outline" className="text-xl" />
												+233 55677835
											</p>
										</div>
									</div>
								</div>
							</section>
						</div>
						<div className="w-full h-auto bg-white px-4 py-2 mt-auto gap-3">
							<div className="flex items-center justify-center gap-2">
								<button
									className="w-full bg-sec py-2 border-[1px] hover:opacity-70 rounded-[10px] text-white"
									type="submit"
									onClick={() => {
										setShowSupplierDetails(false);
										setShowAddOrEditSupplier(true);
									}}>
									Edit
								</button>
							</div>
						</div>
					</div>
				)}

				{isLoading && <PageLoading />}
			</aside>
		</div>
	);
};

export default SupplierDetails;
