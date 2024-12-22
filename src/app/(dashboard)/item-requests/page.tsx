"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import suppliers, { ISupplier } from "@/data/suppliers";
import TableColumn from "./TableColumn";
import Filters, { initialFilter } from "./Filters";
import AddOrEditRequest from "./AddOrEditRequest";
import { useLazyGetItemRequestsRequestQuery } from "@/apis/itemRequestsApi";
import useDebounce from "@/hooks/useDebounce";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import NoData from "@/components/NoData";
import { PageLoading } from "@/components/Loading";
import ViewRequestDetails from "./ViewRequest";
import { useFetchLoggedInUserRequestQuery } from "@/apis/authApi";
import userHasPermission from "@/utils/userHasPermission";

export interface IFilter {
	status: string;
	drug: string;
}

export interface IItemRequest {
	id: string;
	requestNumber: string;
	itemName: string;
	quantity: string;
	dateRequested: string;
	status: "Pending" | "Delivered" | "Cancelled" | "Accepted";
}

const page = () => {
	const { data: user } = useFetchLoggedInUserRequestQuery();
	const [getStockRequests, { data, error, isLoading }] = useLazyGetItemRequestsRequestQuery();
	const [selectedRequest, setSelectedRequest] = useState<null | number>(null);
	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [showAddOrEditRequest, setShowAddOrEditRequest] = useState<boolean>(false);
	const [showRequestDetails, setShowRequestDetails] = useState<boolean>(false);

	const [filters, setFilters] = useState<IFilter>(initialFilter);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(0);

	const query = useDebounce(search, 1000);

	useEffect(() => {
		getStockRequests({ page: page + 1, search: query });
	}, [query, page]);

	useCreateErrorFromApiRequest(error);

	const request = useMemo(() => (selectedRequest !== null ? data?.requests?.[selectedRequest] : ({} as IItemRequest)), [selectedRequest]);
	return (
		<div className="relative">
			<h3 className="text-2xl mb-3 font-bold">Item requests</h3>

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
						{userHasPermission(user?.data?.permissions, "department_requests", "WRITE") && (
							<button
								className="px-3 flex items-center justify-center gap-2 py-3 hover:opacity-60 bg-sec text-white rounded-[12px] border-[1px]"
								onClick={() => setShowAddOrEditRequest(true)}>
								Create new request
							</button>
						)}
					</div>
				</div>

				{/* Table title */}
				<div className="bg-gray-700 drugs-table gap-4 mt-6 items-center rounded-[10px] border-[1px] grid grid-cols-12 px-3">
					<div className="col-span-5 text-gray-500 uppercase text-sm py-3">Request #</div>
					<div className="col-span-5 text-gray-500 uppercase text-sm py-3">Drug</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Quantity</div>
					<div className="col-span-5 text-gray-500 uppercase text-sm py-3">Date Requested</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Status</div>
					<div className="col-span-1 text-gray-500 uppercase text-xs py-3"></div>
				</div>

				{!isLoading && data && (
					<div>
						{data?.requests?.length > 0 && (
							<>
								{/* Last two on the table will have isLast so the drop down shows at the top instead */}
								{data?.requests.map((request: any, index: number) => (
									<TableColumn
										{...request}
										isLast={index >= data?.requests.length - 2}
										index={index}
										activeColumn={selectedRequest}
										setActiveColumn={setSelectedRequest}
										setShowAddOrEditRequest={setShowAddOrEditRequest}
										setShowRequestDetails={setShowRequestDetails}
									/>
								))}
							</>
						)}

						{data?.requests?.length === 0 && <NoData />}
					</div>
				)}

				{isLoading && <PageLoading />}
			</div>

			{showFilters && <Filters setShowFilters={setShowFilters} filters={filters} setFilters={setFilters} />}

			{showAddOrEditRequest && <AddOrEditRequest setShowAddOrEditRequest={setShowAddOrEditRequest} requestId={request?.id as string} setSelectedRequest={setSelectedRequest} />}
			{showRequestDetails && (
				<ViewRequestDetails
					setShowViewRequest={setShowRequestDetails}
					requestId={request?.id as string}
					setSelectedRequest={setSelectedRequest}
					setShowAddOrEditRequest={setShowAddOrEditRequest}
				/>
			)}
		</div>
	);
};

export default page;
