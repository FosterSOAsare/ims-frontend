"use client";
import React, { useState } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import { Icon } from "@iconify/react/dist/iconify.js";
import CustomSelect from "@/components/Select";

export interface IProduct {
	id: string;
	name: string;
	batchNumber: string;
	supplier: string;
	expiryDate: string;
	stockAvailable: string;
	amount: string;
}
const products: IProduct[] = [
	{ id: "1", name: "Paracetamol (Tyrenol)", batchNumber: "23345788", amount: "GHC800.00", supplier: "Earnest Chemist", expiryDate: "Jun 28, 24", stockAvailable: "200" },
	{ id: "2", name: "Paracetamol (Tyrenol)", batchNumber: "23345788", amount: "GHC800.00", supplier: "Earnest Chemist", expiryDate: "Jun 28, 24", stockAvailable: "200" },
	{ id: "3", name: "Paracetamol (Tyrenol)", batchNumber: "23345788", amount: "GHC800.00", supplier: "Earnest Chemist", expiryDate: "Jun 28, 24", stockAvailable: "200" },
	{ id: "4", name: "Paracetamol (Tyrenol)", batchNumber: "23345788", amount: "GHC800.00", supplier: "Earnest Chemist", expiryDate: "Jun 28, 24", stockAvailable: "200" },
	{ id: "5", name: "Paracetamol (Tyrenol)", batchNumber: "23345788", amount: "GHC800.00", supplier: "Earnest Chemist", expiryDate: "Jun 28, 24", stockAvailable: "200" },
	{ id: "6", name: "Paracetamol (Tyrenol)", batchNumber: "23345788", amount: "GHC800.00", supplier: "Earnest Chemist", expiryDate: "Jun 28, 24", stockAvailable: "200" },
	{ id: "7", name: "Paracetamol (Tyrenol)", batchNumber: "23345788", amount: "GHC800.00", supplier: "Earnest Chemist", expiryDate: "Jun 28, 24", stockAvailable: "200" },
];
const page = () => {
	const [salesInfo, setSalesInfo] = useState({
		patientName: "",
		paymentInfo: "",
	});

	const handleChange = (property: string, value: string) => {
		setSalesInfo((prev) => ({ ...prev, [property]: value }));
	};

	return (
		<div className="relative h-[80vh]">
			<h3 className="text-2xl font-bold">Record New Sale</h3>
			<div className="flex items-center justify-start text-sm">
				<Link href="/sales" className="underline">
					Sales
				</Link>
				<span className="mx-2">/</span>
				<span>New sale</span>
			</div>

			<div className="w-full pt-4 h-[calc(100%-50px)] gap-2 flex items-stretch justify-between">
				{/* Products */}
				<div className="w-3/4 h-full">
					<div className="pr-4">
						<Input
							name="patientName"
							value={salesInfo.patientName}
							setValue={(value) => handleChange("patientName", value)}
							label="Name of patient"
							placeholder="eg: Grace Ashley"
							labelSx="text-sm"
							inputSx="text-sm"
						/>
					</div>

					<div className="w-full mt-5 h-[calc(100%-85px)] bg-white  overflow-y-auto shadow-md rounded-[8px] p-4">
						<h3 className="text-xl font-bold">Search for item</h3>
						<div className="flex-1 mt-2 relative">
							<span className="absolute left-3 top-0 bottom-0 flex items-center justify-center">
								<Icon icon="iconoir:search" className="text-sm text-gray-400" />
							</span>
							<input
								type="text"
								className="bg-gray-300 w-full p-2 text-xs border-[2px] border-transparent focus:border-gray-200 rounded-[10px] pl-8"
								placeholder="Search item. eg: Paracetamol"
							/>
						</div>

						{/* Table title */}
						<div className="bg-gray-700 drugs-table break gap-4 mt-6 items-center rounded-[10px] border-[1px] grid grid-cols-12 px-3">
							<div className="col-span-6 text-gray-500 uppercase text-[10px] py-3">Item</div>
							<div className="col-span-4 text-gray-500 uppercase text-[10px] py-3">Batch #</div>
							<div className="col-span-4 text-gray-500 uppercase text-[10px] py-3">Amount</div>
							<div className="col-span-4 text-gray-500 uppercase text-[10px] py-3">Expiry Date</div>
							<div className="col-span-3 text-gray-500 uppercase text-[10px] py-3">Stock Avail...</div>
							<div className="col-span-3 text-gray-500 uppercase text-[10px] py-3"></div>
						</div>

						<>
							{products.map((product: IProduct, index: number) => (
								<div className="drugs-table gap-4 mt-6 items-center rounded-[10px] border-[1px] grid grid-cols-12 px-3">
									<div className="col-span-6 text-gray-500 line-clamp-1 break-words text-xs py-3">
										{product.name.length > 16 ? product.name.substring(0, 16) + "..." : product.name}
									</div>
									<div className="col-span-4 text-gray-500 line-clamp-1 break-words text-xs py-3">{product.batchNumber}</div>
									<div className="col-span-4 text-gray-500 line-clamp-1 break-words text-xs py-3">{product.amount}</div>
									<div className="col-span-4 text-gray-500 line-clamp-1 break-words text-xs py-3">{product.expiryDate}</div>
									<div className="col-span-3 text-gray-500 line-clamp-1 break-words text-xs py-3">{product.stockAvailable}</div>
									<div className="col-span-3 text-gray-500 line-clamp-1 break-words text-xs py-3">
										<button className="border-[1px] p-3 py-[6px]  flex items-center justify-center gap-1 rounded-[8px]">
											<Icon icon="majesticons:plus" />
											Add
										</button>
									</div>
								</div>
							))}
						</>
					</div>
				</div>

				{/* Cart */}
				<div className="w-1/4 bg-white rounded-[8px] shadow-md overflow-y-auto h-full px-3">
					<h3 className="text-md font-bold py-2 z-[2] sticky top-0 left-0 bg-white">Sale Cart(2)</h3>
					<CustomSelect
						options={Array.from({ length: 10 }, (_i, i) => "Department " + (i + 1))}
						label="Select type of payment"
						placeholder="Select option"
						value={salesInfo.paymentInfo}
						handleChange={(value) => handleChange("paymentInfo", value)}
					/>

					<div className="w-full h-auto mb-8 my-4">
						{[1, 2].map((_item, index) => (
							<div className="w-full border-[1px] p-3 mb-4 rounded-[8px]" key={index}>
								<div className="w-full flex items-center justify-between">
									<p className="text-sm font-medium">Paracetamol (Panadol)</p>
									<button className="w-6 h-6 bg-[#FEF2F2] text-red-600 flex items-center justify-center hover:text-white hover:bg-red-500 rounded-full">
										<Icon icon="solar:trash-bin-minimalistic-bold-duotone" />
									</button>
								</div>

								<div className="w-full mt-2 flex items-center justify-between">
									<p className="text-sm font-bold">GHC 800.00</p>
									<div className="flex items-center justify-center gap-2">
										<button className="w-4 h-4 bg-slate-200 flex items-center justify-center">
											<Icon icon="ic:outline-minus" className="text-sm" />
										</button>
										<span className="text-sm">2</span>
										<button className="w-4 h-4 bg-slate-200 flex items-center justify-center">
											<Icon icon="mynaui:plus-solid" className="text-sm" />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Summary */}
					<div className="w-full mb-6">
						<h3 className="text-md font-bold">Summary</h3>
						<div className="py-2 border-b-[1px] border-dashed">
							<div className="flex items-center justify-between">
								<p>Subtotal</p>
								<span className="text-right text-sm font-light">GHC 1,600.00</span>
							</div>
							<div className="flex items-center justify-between">
								<p>Discount</p>
								<span className="text-right text-sm font-light">GHC 0.00</span>
							</div>
						</div>
						<div className="flex items-center my-2 justify-between">
							<p className="font-bold">Total</p>
							<span className="text-right text-sm font-bold">GHC 1,600.00</span>
						</div>

						<button className="flex items-center justify-center w-full py-3 font-400 text-white bg-sec rounded-[10px] mt-12">Save and print bill</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
