"use client";
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import suppliers, { ISuppliers } from "@/data/suppliers";
import TableColumn from "./TableColumn";
// import Filters, { initialFilter } from "./Filters";
// import AddOrEditSupplier from "./addoreditsupplier";

export interface IFilter {
	status: string;
}

export interface IDepartment {
	id: string;
	department: string;
	requestNumber: string;
	drug: string;
	quantity: string;
	dateRequested: string;
	status: "Pending" | "Delivered" | "Cancelled" | "Accepted";
}

const requests: IDepartment[] = [
	{ id: "1", department: "Trauma & Orthpaedics", requestNumber: "R-66g778", drug: "Paracetamol (Panadol)", quantity: "200pcs", dateRequested: "24 Jun, 24", status: "Pending" },
	{ id: "2", department: "Surgical", requestNumber: "R-5567789", drug: "Paracetamol (Panadol)", quantity: "2,000pcs", dateRequested: "24 Jun, 24", status: "Pending" },
	{ id: "3", department: "Surgical", requestNumber: "R-788949", drug: "Paracetamol (Panadol)", quantity: "200pcs", dateRequested: "24 Jun, 24", status: "Accepted" },
	{ id: "4", department: "Medicine & Therapeu...", requestNumber: "R-5567", drug: "Paracetamol (Panadol)", quantity: "200pcs", dateRequested: "24 Jun, 24", status: "Accepted" },
	{ id: "5", department: "Dental", requestNumber: "R-5567", drug: "Paracetamol (Panadol)", quantity: "200pcs", dateRequested: "24 Jun, 24", status: "Delivered" },
	{ id: "6", department: "Dental", requestNumber: "R-5567", drug: "Paracetamol (Panadol)", quantity: "200pcs", dateRequested: "24 Jun, 24", status: "Delivered" },
	{ id: "7", department: "Dental", requestNumber: "R-5567", drug: "Paracetamol (Panadol)", quantity: "200pcs", dateRequested: "24 Jun, 24", status: "Cancelled" },
];

const page = () => {
	const [selectedRequest, setSelectedRequest] = useState<null | number>(0);
	const [showFilters, setShowFilters] = useState<boolean>(false);
	// const [filters, setFilters] = useState<IFilter>(initialFilter);
	const [showAddOrEditSupplier, setShowAddOrEditSupplier] = useState<boolean>(false);
	const [showSupplierDetails, setShowSupplierDetails] = useState<boolean>(false);

	const request = useMemo(() => (selectedRequest !== null ? suppliers[selectedRequest] : ({} as ISuppliers)), [selectedRequest]);
	return (
		<div className="relative">
			<h3 className="text-2xl mb-3 font-bold">Department requests</h3>

			{/* Request Data  */}
			<div className="w-full bg-white  mt-6 rounded-[10px] p-4 ">
				<div className="w-full flex items-center justify-between">
					<div className="w-1/2 flex items-center justify-between gap-4 relative">
						<div className="flex-1">
							<span className="absolute left-3 top-0 bottom-0 flex items-center justify-center">
								<Icon icon="iconoir:search" className="text-xl text-gray-400" />
							</span>
							<input type="text" className="bg-gray-300 w-full p-2 border-[2px] border-transparent focus:border-gray-200 rounded-[10px] pl-10" placeholder="Search request" />
						</div>
						<button className="px-3 flex items-center justify-center gap-2 py-3 hover:bg-gray-200 rounded-[12px] border-[1px]" onClick={() => setShowFilters(true)}>
							<Icon icon="lets-icons:filter" className="text-2xl" />
							Filters
						</button>
					</div>

					<div className="flex gap-2 items-center justify-between">
						<button
							className="px-3 flex items-center justify-center gap-2 py-3 hover:opacity-60 bg-sec text-white rounded-[12px] border-[1px]"
							onClick={() => setShowAddOrEditSupplier(true)}>
							Create new request
						</button>
					</div>
				</div>

				{/* Table title */}
				<div className="bg-gray-700 drugs-table gap-4 mt-6 items-center rounded-[10px] border-[1px] grid grid-cols-12 px-3">
					<div className="col-span-5 text-gray-500 uppercase text-sm py-3">Department Name</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Request #</div>
					<div className="col-span-5 text-gray-500 uppercase text-sm py-3">Drug</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Quantity</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Date Requested</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Status</div>
					<div className="col-span-1 text-gray-500 uppercase text-xs py-3"></div>
				</div>

				<div>
					{/* Last two on the table will have isLast so the drop down shows at the top instead */}
					{requests.map((request, index) => (
						<TableColumn {...request} isLast={index >= requests.length - 2} index={index} activeColumn={selectedRequest} setActiveColumn={setSelectedRequest} />
					))}
				</div>
			</div>

			{/* {showFilters && <Filters setShowFilters={setShowFilters} filters={filters} setFilters={setFilters} />}
			{showAddOrEditSupplier && <AddOrEditSupplier setShowAddOrEditSupplier={setShowAddOrEditSupplier} supplierId={supplier.id as string} seSelectedRequest={seSelectedRequest} />} */}
		</div>
	);
};

export default page;
