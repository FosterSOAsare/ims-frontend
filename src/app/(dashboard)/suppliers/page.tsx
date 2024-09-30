"use client";
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import suppliers, { ISuppliers } from "@/data/suppliers";
import Filters, { initialFilter } from "./Filters";

export interface IFilter {
	status: string;
}

const page = () => {
	const [selectedSupplier, setSelectedSupplier] = useState<null | number>(null);
	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [filters, setFilters] = useState<IFilter>(initialFilter);
	const [showAddOrEditSupplier, setShowAddOrEditSupplier] = useState<boolean>(false);

	const supplier = useMemo(() => (selectedSupplier !== null ? suppliers[selectedSupplier] : ({} as ISuppliers)), [selectedSupplier]);
	return (
		<div className="relative">
			<h3 className="text-2xl mb-3 font-bold">Suppliers</h3>

			{/* Suppliers Data  */}
			<div className="w-full bg-white  mt-6 rounded-[10px] p-4 ">
				<div className="w-full flex items-center justify-between">
					<div className="w-1/2 flex items-center justify-between gap-4 relative">
						<div className="flex-1">
							<span className="absolute left-3 top-0 bottom-0 flex items-center justify-center">
								<Icon icon="iconoir:search" className="text-xl text-gray-400" />
							</span>
							<input type="text" className="bg-gray-300 w-full p-2 border-[2px] border-transparent focus:border-gray-200 rounded-[10px] pl-10" placeholder="Search supplier" />
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
							<Icon icon="solar:buildings-3-bold-duotone" className="text-2xl" />
							Add new supplier
						</button>
					</div>
				</div>

				{/* Table title */}
				<div className="bg-gray-700 drugs-table gap-4 mt-6 items-center rounded-[10px] border-[1px] grid grid-cols-12 px-3">
					<div className="col-span-6 text-gray-500 uppercase text-sm py-3">Supplier</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Date Added</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Contact</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Status</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Total Drugs</div>
					<div className="col-span-3 text-gray-500 uppercase text-xs py-3"></div>
				</div>

				<div>
					{/* Last two on the table will have isLast so the drop down shows at the top instead */}
					{suppliers.map(({ id, name, dateAdded, contact, status, totalDrugs }, index) => (
						<div className="bg-white drugs-table gap-2 border-gray-200 items-center mt-6 rounded-[10px] px-3 border-[1px] grid grid-cols-12">
							<div className="col-span-6 text-primary py-3 text-left flex gap-2 items-center">
								<Icon icon="solar:buildings-3-line-duotone" />
								{name}
							</div>
							<div className="col-span-4 text-primary py-3 text-left">{dateAdded}</div>
							<div className="col-span-3 text-primary py-3 flex items-center gap-1 text-left">{contact}</div>
							<div className="col-span-4 text-sm text-gray-500 py-3 text-left">
								<div
									className={`${
										status.toLowerCase() === "deactivated" ? "text-red-500 bg-red-100" : "bg-green-100 text-green-500"
									} inline-flex rounded-full px-2 py-1 items-center gap-1`}>
									<span className={`inline-block w-[6px] h-[6px] rounded-full ${status.toLowerCase() === "deactivated" ? " bg-red-500" : "bg-green-500"}`}></span>
									{status}
								</div>
							</div>
							<div className="col-span-4 text-primary py-3 flex items-center gap-1 text-left">{totalDrugs}</div>

							{/* Actions */}
							<div className="col-span-3 text-primary py-3 gap-1 text-left flex items-center justify-end">
								<button className="p-2 rounded-full hover:bg-gray-200">
									<Icon icon="mdi:eye-outline" />
								</button>
								<button className="p-2 rounded-full hover:bg-gray-200">
									<Icon icon="ph:trash" />
								</button>

								<button
									className="p-2 rounded-full hover:bg-red-500 hover:text-white"
									onClick={() => {
										setSelectedSupplier(index);
										setShowAddOrEditSupplier(true);
									}}>
									<Icon icon="lucide:edit-2" />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{showFilters && <Filters setShowFilters={setShowFilters} filters={filters} setFilters={setFilters} />}
		</div>
	);
};

export default page;
