"use client";
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import TableColumn from "./TableColumn";
import AddOrEditStock from "./AddOrEditDrugOrders";

export interface IDrugOrder {
	id: string;
	name: string;
	orderNumber: string;
	status: "Requested" | "Delivering" | "Received" | "Cancelled";
	supplier: string;
	date: string;
	quantity: string;
	delivery: string;
}
const drugOrders: IDrugOrder[] = [
	{ id: "1", name: "Paracetamol (Tyrenol)", orderNumber: "23345788", supplier: "Earnest Chemist", date: "Jun 28, 24", quantity: "20,000pcs", delivery: "Aug 07, 24", status: "Requested" },
	{ id: "2", name: "Paracetamol (Tyrenol)", orderNumber: "23345788", supplier: "Earnest Chemist", date: "Jun 28, 24", quantity: "20,000pcs", delivery: "Aug 07, 24", status: "Delivering" },
	{ id: "3", name: "Paracetamol (Tyrenol)", orderNumber: "23345788", supplier: "Earnest Chemist", date: "Jun 28, 24", quantity: "20,000pcs", delivery: "Aug 07, 24", status: "Received" },
	{ id: "4", name: "Paracetamol (Tyrenol)", orderNumber: "23345788", supplier: "Earnest Chemist", date: "Jun 28, 24", quantity: "20,000pcs", delivery: "Aug 07, 24", status: "Received" },
	{ id: "5", name: "Paracetamol (Tyrenol)", orderNumber: "23345788", supplier: "Earnest Chemist", date: "Jun 28, 24", quantity: "20,000pcs", delivery: "Aug 07, 24", status: "Received" },
	{ id: "6", name: "Paracetamol (Tyrenol)", orderNumber: "23345788", supplier: "Earnest Chemist", date: "Jun 28, 24", quantity: "20,000pcs", delivery: "Aug 07, 24", status: "Cancelled" },
	{ id: "7", name: "Paracetamol (Tyrenol)", orderNumber: "23345788", supplier: "Earnest Chemist", date: "Jun 28, 24", quantity: "20,000pcs", delivery: "Aug 07, 24", status: "Received" },
];

const page = () => {
	const [selectedDrugOrder, setSelectedDrugOrder] = useState<null | number>(null);
	const [showAddOrEditStock, setShowAddOrEditStock] = useState<boolean>(false);

	const stock = useMemo(() => {
		return selectedDrugOrder ? drugOrders[selectedDrugOrder] : ({} as IDrugOrder);
	}, [selectedDrugOrder]);

	return (
		<div className="relative">
			<h3 className="text-2xl mb-3 font-bold">Drug Orders(Stocking)</h3>

			{/* Categories Data  */}
			<div className="w-full bg-white  mt-6 rounded-[10px] p-4 ">
				<div className="w-full flex items-center justify-between">
					<div className="w-1/2 flex items-center justify-between gap-4 relative">
						<div className="flex-1">
							<span className="absolute left-3 top-0 bottom-0 flex items-center justify-center">
								<Icon icon="iconoir:search" className="text-xl text-gray-400" />
							</span>
							<input type="text" className="bg-gray-300 w-full p-2 border-[2px] border-transparent focus:border-gray-200 rounded-[10px] pl-10" placeholder="Search category" />
						</div>
						<button className="px-3 flex items-center justify-center gap-2 py-3 hover:bg-gray-200 rounded-[12px] border-[1px]">
							<Icon icon="lets-icons:filter" className="text-2xl" />
							Filters
						</button>
					</div>

					<div className="flex gap-2 items-center justify-between">
						<button className="px-3 flex items-center justify-center gap-2 py-3 hover:bg-gray-200 rounded-[12px] border-[1px]">
							<Icon icon="solar:document-line-duotone" className="text-2xl text-black" />
							Generate report
						</button>
						<button className="px-3 flex items-center justify-center gap-2 py-3 hover:opacity-60 bg-sec text-white rounded-[12px] border-[1px]" onClick={() => setShowAddOrEditStock(true)}>
							<Icon icon="ph:plus-bold" className="text-2xl" />
							New
						</button>
					</div>
				</div>

				{/* Table title */}
				<div className="bg-gray-700 drugs-table gap-4 mt-6 items-center rounded-[10px] border-[1px] grid grid-cols-12 px-3">
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Drug</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Order #</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Supplier</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Date</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Quantity</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Delivery</div>
					<div className="col-span-3 text-gray-500 uppercase text-xs py-3">Status</div>
					<div className="col-span-1 text-gray-500 uppercase text-xs py-3"></div>
				</div>

				<div>
					{/* Last two on the table will have isLast so the drop down shows at the top instead */}
					{drugOrders.map((stock, index) => (
						<TableColumn
							setShowAddOrEditStock={setShowAddOrEditStock}
							{...stock}
							isLast={index >= drugOrders.length - 2}
							index={index}
							selectedDrugOrder={selectedDrugOrder}
							setSelectedDrugOrder={setSelectedDrugOrder}
						/>
					))}
				</div>
			</div>

			{/* {showAddOrEditStock && <AddOrEditStock stockId={stock?.id as string} setSelectedDrugOrder={setSelectedDrugOrder} setShowAddOrEditStock={setShowAddOrEditStock} />} */}
		</div>
	);
};

export default page;
