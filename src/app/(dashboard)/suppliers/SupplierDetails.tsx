import React, { Dispatch, SetStateAction, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import suppliers from "@/data/suppliers";

import CustomSelect from "@/components/Select";

const supplierOptions = suppliers.map((supplier) => supplier.name + " " + supplier.id);

interface ISupplierDetailsComponent {
	supplierId: string;
	setShowSupplierDetails: React.Dispatch<React.SetStateAction<boolean>>;
	setShowAddOrEditSupplier: React.Dispatch<React.SetStateAction<boolean>>;
}

const SupplierDetails = ({ supplierId, setShowSupplierDetails, setShowAddOrEditSupplier }: ISupplierDetailsComponent) => {
	const [showBusinessInfo, setShowBusinessInfo] = useState(false);
	const [showPaymentInfo, setShowPaymentInfo] = useState(false);

	const businessInfo = [
		{ name: "Registration Number", value: "RC123456789" },
		{ name: "Tax Identification Number (TIN)", value: "TIN-4567890123" },
		{ name: "License Number", value: "MED-PH-7890" },
		{ name: "Validity", value: "Expires 31st December, 2024" },
		{ name: "ISO 9001", value: "Quality Management Certified" },
		{ name: "FDA Approval", value: "FDA-GH-2023-7890" },
	];

	const paymentInfo = [
		{ name: "bank", value: "Ecobank" },
		{ name: "Account Number", value: "1234567890123" },
		{ name: "Account type", value: "Corporate Current Account" },
		{ name: "Currency", value: "Ghanaian Cedi (GHS)" },
	];

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

				<div className="h-[calc(100%-50px)]">
					<div className="h-[calc(100%-60px)] overflow-y-auto pb-12 w-full">
						<div className="w-full  h-auto px-4">
							<div className="w-full pb-6 border-b-[1px]">
								<h3 className="text-2xl font-bold flex items-center gap-2">
									<Icon icon="solar:buildings-3-line-duotone" className="text-xl text-gray-400" />
									Earnest Chemist
								</h3>
								<h3 className="text-lg mt-4 font-bold">Supplier Details</h3>

								<div className="flex gap-2 mt-4">
									<div className="w-3/5 bg-[#F8F9FB] border-[1px] card p-2 rounded-[12px]">
										<h3 className="uppercase text-sm font-medium text-gray-400">Contact Person</h3>
										<div className="flex mt-2 gap-2 items-center justify-start">
											<p className="font-normal text-sm text-primary">Michael Mensah</p>
											<span className="px-2 py-[4px] rounded-full bg-[#D9FDFD] text-[#087878] text-xs">Sales Manager</span>
										</div>
									</div>

									<div className="w-2/5 bg-[#F8F9FB] border-[1px] card p-2 rounded-[12px]">
										<h3 className="uppercase text-sm font-medium text-gray-400">Contact</h3>
										<div className="flex mt-2 gap-2 items-center justify-start">
											<p className="text-primary text-sm font-medium flex items-center gap-2">
												<Icon icon="solar:outgoing-call-outline" className="text-xl" />
												+233 55677835
											</p>
										</div>
									</div>
								</div>

								<div className="mt-4 w-[68%] border-[#F1F5F9] bg-[#F8F9FB] border-[1px] card p-4 rounded-[12px]">
									<h3 className="uppercase text-sm font-medium text-gray-400">TYPE</h3>
									<div className="flex mt-4 gap-2  items-center justify-start">
										<p className="p-1 px-3 rounded-full font-medium text-xs text-sec bg-blue-200 flex items-center gap-2">Pharmaceuticals and Medical Supplies</p>
									</div>
								</div>

								<div className="mt-4 w-full">
									<h3 className="uppercase text-sm font-medium text-gray-400">General Info</h3>
									<div className="flex mt-4 text-sm gap-2 font-light items-center justify-start">
										Lorem ipsum dolor sit amet consectetur. Morbi amet ultrices a egestas lectus. Sed aliquet felis tellus gravida nibh risus amet a tincidunt. Amet ornare amet
										iaculis a habitant. Id amet arcu lobortis tempus eget pharetra maecenas.
									</div>
								</div>
							</div>
						</div>

						{/* Business and Legal Info */}
						<section className="w-full p-4 pb-8 border-b-[1px]">
							<h3 className="text-xl font-bold text-primary mb-3">Business And Legal Info</h3>
							<div className="bg-gray-100 card rounded-[12px] border-[1px] p-4">
								<div className="flex items-center justify-between mb-2 text-sm">
									<h3 className="uppercase text-sm font-medium text-gray-400">Business Info</h3>
									<button className="underline" onClick={() => setShowBusinessInfo((prev) => !prev)}>
										{showBusinessInfo ? "Hide" : "Show"}
									</button>
								</div>
								<div className={`${showBusinessInfo ? "" : "blur-sm"}`}>
									{businessInfo.map(({ name, value }, index) => (
										<p className="w-full text-sm mb-2" key={index}>
											{name}: <span className="text-primary font-medium"> {value}</span>
										</p>
									))}
								</div>
							</div>
						</section>

						{/* Payment Info */}
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
										<p className="w-full text-sm mb-2" key={index}>
											{name}: <span className="text-primary font-medium"> {value}</span>
										</p>
									))}
								</div>
							</div>
						</section>

						{/* Order Details */}
						<section className="px-4 pb-8 border-b-[1px]">
							<h3 className="text-lg mt-4 font-bold">Order Details</h3>
							<div className="flex gap-2 bg-[#F8F9FB] card rounded-[12px] p-4 mt-4">
								<div className="w-auto border-r-[1px] pr-4 border-[#F1F5F9]">
									<h3 className="uppercase text-sm font-medium text-gray-400">Minimum order Qty</h3>
									<div className="flex mt-2 gap-2 items-center justify-start">
										<p className="font-normal text-sm text-primary">500 units per product</p>
									</div>
								</div>

								<div className="pl-4">
									<h3 className="uppercase text-sm font-medium text-gray-400">LEAD TIME</h3>
									<div className="flex mt-2 gap-2 items-center justify-start">
										<p className="text-primary text-sm font-medium flex items-center gap-2">5-7 business days</p>
									</div>
								</div>
							</div>
						</section>

						{/* Reviews */}
						<section className="p-4 pb-8 border-b-[1px]">
							<h3 className="text-lg mt-4 font-bold">Review</h3>
							<h1 className="font-bold text-5xl">4.0</h1>
							<p className="mb-2 text-gray-500">Based on internal reviews</p>
							<div className="flex items-center gap-1">
								{Array.from({ length: 4 }, (_i, i) => i).map((i, index) => (
									<div key={index}>
										<Icon icon="ic:round-star" className="text-[#F57922] text-xl" />
									</div>
								))}
							</div>
						</section>

						<section className="p-4">
							<div className="flex gap-2 mt-4">
								<div className="w-3/5 bg-[#F8F9FB] border-[1px] card p-2 rounded-[12px]">
									<h3 className="uppercase text-sm font-medium text-gray-400">Emergency Contact</h3>
									<div className="flex mt-2 gap-2 items-center justify-start">
										<p className="font-normal text-sm text-primary">James Ofori</p>
										<span className="px-2 py-[4px] rounded-full bg-[#D9FDFD] text-[#087878] text-xs">Sales Manager</span>
									</div>
								</div>

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
			</aside>
		</div>
	);
};

export default SupplierDetails;
