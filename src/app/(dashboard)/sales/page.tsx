"use client";
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import TableColumn from "./TableColumn";
// import AddOrEditDrugOrder from "./AddOrEditSales";
import Filters, { initialFilter } from "./Filters";

export interface ISale {
	id: string;
	patientName: string;
	saleNumber: string;
	status: "paid" | "not paid";
	item: string;
	date: string;
	quantity: string;
	amount: string;
}
const sales: ISale[] = [
	{ id: "1", patientName: "Michael Mensah", saleNumber: "23345788", item: "Paracetamol (Tyrenol)", date: "Jun 28, 24", quantity: "2pcs", amount: "GHC500.00", status: "not paid" },
	{ id: "2", patientName: "Michael Mensah", saleNumber: "23345788", item: "Paracetamol (Tyrenol)", date: "Jun 28, 24", quantity: "5pcs", amount: "GHC500.00", status: "paid" },
	{ id: "3", patientName: "Michael Mensah", saleNumber: "23345788", item: "Paracetamol (Tyrenol)", date: "Jun 28, 24", quantity: "4pcs", amount: "GHC500.00", status: "paid" },
	{ id: "4", patientName: "Michael Mensah", saleNumber: "23345788", item: "Paracetamol (Tyrenol)", date: "Jun 28, 24", quantity: "6pcs", amount: "GHC500.00", status: "paid" },
	{ id: "5", patientName: "Michael Mensah", saleNumber: "23345788", item: "Paracetamol (Tyrenol)", date: "Jun 28, 24", quantity: "7pcs", amount: "GHC500.00", status: "paid" },
	{ id: "6", patientName: "Michael Mensah", saleNumber: "23345788", item: "Paracetamol (Tyrenol)", date: "Jun 28, 24", quantity: "5pcs", amount: "GHC500.00", status: "paid" },
	{ id: "7", patientName: "Michael Mensah", saleNumber: "23345788", item: "Paracetamol (Tyrenol)", date: "Jun 28, 24", quantity: "2pcs", amount: "GHC500.00", status: "paid" },
];

export interface IFilter {
	supplier: string;
	drugName: string;
	status: string;
}

const page = () => {
	const [selectedSale, setSelectedSale] = useState<null | number>(null);
	const [showAddOrEditOrder, setShowAddOrEditDrugOrder] = useState<boolean>(false);
	const [filters, setFilters] = useState<IFilter>(initialFilter);
	const [showFilters, setShowFilters] = useState<boolean>(false);

	const order = useMemo(() => {
		return selectedSale !== null ? sales[selectedSale] : ({} as ISale);
	}, [selectedSale]);

	return (
		<div className="relative">
			<h3 className="text-2xl mb-3 font-bold">Sales</h3>

			{/* Categories Data  */}
			<div className="w-full bg-white  mt-6 rounded-[10px] p-4 ">
				<div className="w-full flex items-center justify-between">
					<div className="w-1/2 flex items-center justify-between gap-4 relative">
						<div className="flex-1">
							<span className="absolute left-3 top-0 bottom-0 flex items-center justify-center">
								<Icon icon="iconoir:search" className="text-xl text-gray-400" />
							</span>
							<input type="text" className="bg-gray-300 w-full p-2 border-[2px] border-transparent focus:border-gray-200 rounded-[10px] pl-10" placeholder="Search sales" />
						</div>
						<button className="px-3 flex items-center justify-center gap-2 py-3 hover:bg-gray-200 rounded-[12px] border-[1px]" onClick={() => setShowFilters(true)}>
							<Icon icon="lets-icons:filter" className="text-2xl" />
							Filters
						</button>
					</div>

					<div className="flex gap-2 items-center justify-between">
						<button
							className="px-3 flex items-center justify-center gap-2 py-3 hover:opacity-60 bg-sec text-white rounded-[12px] border-[1px]"
							onClick={() => setShowAddOrEditDrugOrder(true)}>
							Record New Sale
						</button>
					</div>
				</div>

				{/* Table title */}
				<div className="bg-gray-700 drugs-table gap-4 mt-6 items-center rounded-[10px] border-[1px] grid grid-cols-12 px-3">
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Patient Name</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Sales #</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Item</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Quantity</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Amount</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Date Created</div>
					<div className="col-span-3 text-gray-500 uppercase text-xs py-3">Status</div>
					<div className="col-span-1 text-gray-500 uppercase text-xs py-3"></div>
				</div>

				<div>
					{/* Last two on the table will have isLast so the drop down shows at the top instead */}
					{sales.map((sale, index) => (
						<TableColumn
							setShowAddOrEditDrugOrder={setShowAddOrEditDrugOrder}
							{...sale}
							isLast={index >= sales.length - 2}
							index={index}
							selectedSale={selectedSale}
							setSelectedSale={setSelectedSale}
						/>
					))}
				</div>
			</div>

			{/* {showAddOrEditOrder && <AddOrEditDrugOrder orderId={order?.id as string} setSelectedSale={setSelectedSale} setShowAddOrEditDrugOrder={setShowAddOrEditDrugOrder} />} */}
			{showFilters && <Filters setFilters={setFilters} setShowFilters={setShowFilters} filters={filters} />}
		</div>
	);
};

export default page;
