"use client";
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import TableColumn from "./TableColumn";
import AddOrEditStock from "./AddOrEditStock";
import Filters from "./Filters";

export interface IStock {
	id: string;
	date: string;
	reason: string;
	status: "Submitted" | "Adjusted" | "Rejected";
	type: string;
	createdBy: string;
	currentStock: number;
	actualStock: number;
}

const stockAdjustments: IStock[] = [
	{ id: "1", date: "04 Sep, 24", reason: "Theft", status: "Adjusted", type: "Reduction", createdBy: "Michael Mensah", currentStock: 100, actualStock: 50 },
	{ id: "2", date: "04 Sep, 24", reason: "Theft", status: "Adjusted", type: "Reduction", createdBy: "Michael Mensah", currentStock: 100, actualStock: 50 },
	{ id: "3", date: "04 Sep, 24", reason: "Damaged", status: "Adjusted", type: "Reduction", createdBy: "Michael Mensah", currentStock: 100, actualStock: 50 },
	{ id: "4", date: "04 Sep, 24", reason: "Theft", status: "Adjusted", type: "Reduction", createdBy: "Michael Mensah", currentStock: 100, actualStock: 50 },
	{ id: "5", date: "04 Sep, 24", reason: "Theft", status: "Adjusted", type: "Reduction", createdBy: "Michael Mensah", currentStock: 100, actualStock: 50 },
	{ id: "6", date: "04 Sep, 24", reason: "Theft", status: "Submitted", type: "Reduction", createdBy: "Michael Mensah", currentStock: 100, actualStock: 50 },
	{ id: "7", date: "04 Sep, 24", reason: "Theft", status: "Adjusted", type: "Reduction", createdBy: "Michael Mensah", currentStock: 100, actualStock: 50 },
];

export interface IFilter {
	adjustmentType: string;
	reason: string;
	status: string;
}
export const initialFilter: IFilter = { adjustmentType: "", reason: "", status: "" };

const page = () => {
	const [selectedStock, setSelectedStock] = useState<null | number>(null);
	const [showAddOrEditStock, setShowAddOrEditStock] = useState<boolean>(false);
	const [filters, setFilters] = useState<IFilter>(initialFilter);
	const [showFilters, setShowFilters] = useState<boolean>(true);

	const stock = useMemo(() => {
		return selectedStock !== null ? stockAdjustments[selectedStock] : ({} as IStock);
	}, [selectedStock]);

	return (
		<div className="relative">
			<h3 className="text-2xl mb-3 font-bold">Stock Adjustment</h3>

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
						<button className="px-3 flex items-center justify-center gap-2 py-3 hover:bg-gray-200 rounded-[12px] border-[1px]" onClick={() => setShowFilters(true)}>
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
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Date</div>
					<div className="col-span-2 text-gray-500 uppercase text-sm py-3">Reason</div>
					<div className="col-span-2 text-gray-500 uppercase text-sm py-3">Notes</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Status</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Type</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Created By</div>
					<div className="col-span-3 text-gray-500 uppercase text-xs py-3">Current Stock</div>
					<div className="col-span-3 text-gray-500 uppercase text-xs py-3">Actual Stock</div>
					<div className="col-span-1 text-gray-500 uppercase text-xs py-3"></div>
				</div>

				<div>
					{/* Last two on the table will have isLast so the drop down shows at the top instead */}
					{stockAdjustments.map((stock, index) => (
						<TableColumn
							setShowAddOrEditStock={setShowAddOrEditStock}
							{...stock}
							isLast={index >= stockAdjustments.length - 2}
							index={index}
							selectedStock={selectedStock}
							setSelectedStock={setSelectedStock}
						/>
					))}
				</div>
			</div>

			{showAddOrEditStock && <AddOrEditStock stockId={stock?.id as string} setSelectedStock={setSelectedStock} setShowAddOrEditStock={setShowAddOrEditStock} />}
			{showFilters && <Filters filters={filters} setShowFilters={setShowFilters} setFilters={setFilters} />}
		</div>
	);
};

export default page;
