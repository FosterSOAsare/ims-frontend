"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import drugs from "@/data/drugs";

import TableColumn from "./TableColumn";
import Filters, { initialFilter } from "./Filters";
import DrugDetails from "./DrugDetails";
import AddOrEditDrug from "./addoreditdrug";
import useDebounce from "@/hooks/useDebounce";
import { useLazyGetDrugsRequestQuery } from "@/apis/drugsApi";
import NoData from "@/components/NoData";
import { PageLoading } from "@/components/Loading";

export interface IFilter {
	sort: string;
	dateAdded: string;
	alert: string;
	categories: string[];
	supplier: string;
}

const page = () => {
	const [activeColumn, setActiveColumn] = useState<null | number>(null);
	const [getDrugsRequest, { data, isLoading, error }] = useLazyGetDrugsRequestQuery();

	const [filters, setFilters] = useState<IFilter>(initialFilter);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(0);

	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [showDrugDetails, setShowDrugDetails] = useState<boolean>(false);
	const [showAddOrEditDrug, setShowAddOrEditDrug] = useState<boolean>(false);

	const query = useDebounce(search, 1000);

	useEffect(() => {
		getDrugsRequest({ page: page + 1, search: query });
	}, [query, page]);

	const viewDrug = () => {
		setShowDrugDetails(true);
	};

	const editDrug = () => {
		setShowAddOrEditDrug(true);
	};

	console.log(data);

	const drugId = useMemo(() => (activeColumn !== null ? (drugs[activeColumn]?.id as string) : ""), [activeColumn]);
	return (
		<div className="relative">
			<h3 className="text-2xl mb-3 font-bold">Drugs</h3>
			<div className="bg-white gap-2 rounded-[10px] flex items-stretch p-4 card justify-start">
				<div className="border-r-[1px] pr-12">
					<h3 className="uppercase text-sm font-medium text-gray-400">Total Drugs</h3>
					<div className="flex flex-col mt-2 gap-2 items-start justify-start">
						<h3 className="text-3xl font-bold">4500</h3>
						<div className={`${false ? "text-error-500 bg-error-50" : "bg-green-50 text-green-500"} gap-1 text-sm flex items-center justify-center px-1 py-[2px] -mt-2 rounded-[10px]`}>
							<span className={`${false ? "bg-red-600" : "bg-green-600"}  rounded-full text-white`}>
								<Icon icon={false ? "ph:arrow-down-right-bold" : "ph:arrow-up-right-bold"} />
							</span>
							6.25%
						</div>
					</div>
				</div>
				<div className="w-2/5 pl-12">
					<h3 className="uppercase text-sm font-medium mb-1 text-gray-400">Total in Stock</h3>
					<h3 className="text-xl mb-1 font-bold">200,000</h3>
					<div className="w-full gap-[3px] h-4 flex rounded-[10px] overflow-hidden">
						<div className="h-full rounded-[5px] bg-[#0DCACA]" style={{ width: "70%" }}></div>
						<div className="h-full rounded-[5px] bg-[#E36D6A]" style={{ width: "20%" }}></div>
						<div className="h-full rounded-[5px] bg-[#E2E8F0]" style={{ width: "20%" }}></div>
					</div>

					<div className="flex mt-2 items-center justify-between">
						<div className="flex items-center justify-start gap-1">
							<span className="w-3 rounded-[5px] inline-block h-3 bg-[#0DCACA]"></span>
							<p className="text-sm">High stock</p>
						</div>
						<div className="flex items-center justify-start gap-1">
							<span className="w-3 rounded-[5px] inline-block h-3 bg-[#E36D6A]"></span>
							<p className="text-sm">Low stock</p>
						</div>
						<div className="flex items-center justify-start gap-1">
							<span className="w-3 rounded-[5px] inline-block h-3 bg-[#E2E8F0]"></span>
							<p className="text-sm">Out of stock</p>
						</div>
					</div>
				</div>
			</div>

			{/* Drugs & Stock */}
			<div className="w-full bg-white  mt-6 rounded-[10px] p-4 ">
				<h3 className="text-xl mb-3 font-bold">All drugs & stocks</h3>

				<div className="w-full flex items-center justify-between">
					<div className="w-2/5 relative">
						{/* Search */}
						<span className="absolute left-3 top-0 bottom-0 flex items-center justify-center">
							<Icon icon="iconoir:search" className="text-xl text-gray-400" />
						</span>
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							type="text"
							className="bg-gray-300 w-full p-2 border-[2px] border-transparent focus:border-gray-200 rounded-[10px] pl-10"
							placeholder="Search for drug name"
						/>
					</div>

					<div className="flex gap-2 items-center justify-between">
						<button className="px-3 flex items-center justify-center gap-2 py-3 hover:bg-gray-200 rounded-[12px] border-[1px]" onClick={() => setShowFilters(true)}>
							<Icon icon="lets-icons:filter" className="text-2xl" />
							Filters
						</button>
						<button className="px-3 flex items-center justify-center gap-2 py-3 hover:opacity-60 bg-sec text-white rounded-[12px] border-[1px]" onClick={() => setShowAddOrEditDrug(true)}>
							<Icon icon="solar:jar-of-pills-bold-duotone" className="text-2xl" />
							Add new drug
						</button>
					</div>
				</div>

				{/* Table title */}
				<div className="bg-gray-700 drugs-table gap-4 mt-6 items-center rounded-[10px] border-[1px] grid grid-cols-12 px-3">
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Drug Name</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Batch #</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Category</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Stock</div>
					<div className="col-span-5 text-gray-500 uppercase text-sm py-3">Supplier</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Status</div>
					<div className="col-span-3 text-gray-500 uppercase text-xs py-3">Reorder Point</div>
				</div>

				{!isLoading && data && (
					<div>
						{data?.drugs?.length > 0 && (
							<>
								{/* Last two on the table will have isLast so the drop down shows at the top instead */}
								{data?.drugs.map(
									(
										drug: { brandName: string; name: string; stock: string; category: string; reorderPoint: number; status: string; batchNumber: string; supplier: string },
										index: number
									) => (
										<TableColumn
											key={index}
											{...drug}
											editDrug={editDrug}
											viewDrug={viewDrug}
											isLast={index >= drugs.length - 2}
											index={index}
											activeColumn={activeColumn}
											setActiveColumn={setActiveColumn}
										/>
									)
								)}
							</>
						)}
						{data?.data?.rows?.length == 0 && <NoData />}
					</div>
				)}

				{isLoading && <PageLoading />}
			</div>

			{showFilters && <Filters setShowFilters={setShowFilters} filters={filters} setFilters={setFilters} />}

			{showDrugDetails && <DrugDetails drugId={drugId} setShowDrugDetails={setShowDrugDetails} />}

			{showAddOrEditDrug && <AddOrEditDrug drugId={drugId} setShowAddOrEditDrug={setShowAddOrEditDrug} setActiveColumn={setActiveColumn} />}
		</div>
	);
};

export default page;
