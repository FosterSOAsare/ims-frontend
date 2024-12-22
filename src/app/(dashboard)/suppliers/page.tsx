"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { ISupplier } from "@/data/suppliers";
import { formatDate } from "@/utils/date";
import useDebounce from "@/hooks/useDebounce";
import { useDeleteASupplierRequestMutation, useLazyGetSuppliersRequestQuery } from "@/apis/suppliersApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";

import SupplierDetails from "./SupplierDetails";
import Filters, { initialFilter } from "./Filters";
import AddOrEditSupplier from "./addoreditsupplier";
import Loading, { PageLoading } from "@/components/Loading";
import NoData from "@/components/NoData";
import { useFetchLoggedInUserRequestQuery } from "@/apis/authApi";
import userHasPermission from "@/utils/userHasPermission";

export interface IFilter {
	status: string;
}

const page = () => {
	const { data: user } = useFetchLoggedInUserRequestQuery();
	const [getSuppliersRequest, { data: suppliers, isLoading: gettingSuppliers, error: suppliersError }] = useLazyGetSuppliersRequestQuery();
	const [deleteASupplierRequest, { isLoading: deleting, error: deleteError }] = useDeleteASupplierRequestMutation();

	const [selectedSupplier, setSelectedSupplier] = useState<null | number>(null);
	const [search, setSearch] = useState("");
	const [filters, setFilters] = useState<IFilter>(initialFilter);

	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [showAddOrEditSupplier, setShowAddOrEditSupplier] = useState<boolean>(false);
	const [showSupplierDetails, setShowSupplierDetails] = useState<boolean>(false);

	const query = useDebounce(search, 1000);

	useEffect(() => {
		getSuppliersRequest({ page: 1, search: query });
	}, [query]);

	const supplier = useMemo(() => {
		if (!suppliers || selectedSupplier === null) return {} as ISupplier;
		return suppliers?.data?.rows[selectedSupplier];
	}, [selectedSupplier, suppliers]);

	useCreateErrorFromApiRequest(suppliersError);
	useCreateErrorFromApiRequest(deleteError);
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
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="bg-gray-300 w-full p-2 border-[2px] border-transparent focus:border-gray-200 rounded-[10px] pl-10"
								placeholder="Search supplier"
							/>
						</div>
						<button className="px-3 flex items-center justify-center gap-2 py-3 hover:bg-gray-200 rounded-[12px] border-[1px]" onClick={() => setShowFilters(true)}>
							<Icon icon="lets-icons:filter" className="text-2xl" />
							Filters
						</button>
					</div>

					<div className="flex gap-2 items-center justify-between">
						{userHasPermission(user?.data?.permissions, "suppliers", "WRITE") && (
							<button
								className="px-3 flex items-center justify-center gap-2 py-3 hover:opacity-60 bg-sec text-white rounded-[12px] border-[1px]"
								onClick={() => setShowAddOrEditSupplier(true)}>
								<Icon icon="solar:buildings-3-bold-duotone" className="text-2xl" />
								Add new supplier
							</button>
						)}
					</div>
				</div>

				{/* Table title */}
				<div className="bg-gray-700 drugs-table gap-4 mt-6 items-center rounded-[10px] border-[1px] grid grid-cols-12 px-3">
					<div className="col-span-6 text-gray-500 uppercase text-sm py-3">Supplier</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Date Added</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Contact</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Status</div>
					<div className="col-span-3 text-gray-500 uppercase text-sm py-3">Total Drugs</div>
					<div className="col-span-3 text-gray-500 uppercase text-xs py-3"></div>
				</div>

				{!gettingSuppliers && suppliers && (
					<div>
						{suppliers?.data?.rows?.length > 0 && (
							<>
								{suppliers?.data?.rows?.map(({ id, name, createdAt, phoneNumber, status, totalDrugs }: ISupplier, index: number) => (
									<div className="bg-white drugs-table gap-2 border-gray-200 items-center mt-6 rounded-[10px] px-3 border-[1px] grid grid-cols-12">
										<div className="col-span-6 text-primary py-3 text-left flex gap-2 items-center">
											<Icon icon="solar:buildings-3-line-duotone" />
											{name}
										</div>
										<div className="col-span-4 text-primary py-3 text-left">{formatDate(createdAt, "short")}</div>
										<div className="col-span-4 text-primary py-3 flex items-center gap-1 text-left">{phoneNumber}</div>
										<div className="col-span-4 text-sm text-gray-500 py-3 text-left">
											<div
												className={`${
													status.toLowerCase() === "deactivated" ? "text-red-500 bg-red-100" : "bg-green-100 text-green-500"
												} inline-flex rounded-full px-2 py-1 items-center gap-1`}>
												<span className={`inline-block w-[6px] h-[6px] rounded-full ${status.toLowerCase() === "deactivated" ? " bg-red-500" : "bg-green-500"}`}></span>
												{status}
											</div>
										</div>
										<div className="col-span-3 text-primary py-3 flex items-center gap-1 text-left">{totalDrugs || 0}</div>

										{/* Actions */}
										<div className="col-span-3 text-primary py-3 gap-1 text-left flex items-center justify-end">
											<button
												disabled={deleting}
												className="p-2 rounded-full hover:bg-gray-200"
												onClick={() => {
													setSelectedSupplier(index);
													setShowSupplierDetails(true);
												}}>
												<Icon icon="mdi:eye-outline" />
											</button>
											{userHasPermission(user?.data?.permissions, "suppliers", "WRITE") && (
												<button
													onClick={() => {
														setSelectedSupplier(index);
														deleteASupplierRequest({ supplierId: id });
													}}
													disabled={deleting}
													className="p-2 rounded-full hover:bg-gray-200">
													{deleting && selectedSupplier === index ? <Loading sx="!border-[red] !w-4 !h-4" /> : <Icon icon="ph:trash" />}
												</button>
											)}

											{userHasPermission(user?.data?.permissions, "suppliers", "DELETE") && (
												<button
													disabled={deleting}
													className="p-2 rounded-full hover:bg-red-500 hover:text-white"
													onClick={() => {
														setSelectedSupplier(index);
														setShowAddOrEditSupplier(true);
													}}>
													<Icon icon="lucide:edit-2" />
												</button>
											)}
										</div>
									</div>
								))}
							</>
						)}

						{suppliers?.data?.rows?.length === 0 && <NoData />}
					</div>
				)}

				{gettingSuppliers && <PageLoading />}
			</div>

			{showFilters && <Filters setShowFilters={setShowFilters} filters={filters} setFilters={setFilters} />}
			{showSupplierDetails && <SupplierDetails supplierId={supplier.id} setShowSupplierDetails={setShowSupplierDetails} setShowAddOrEditSupplier={setShowAddOrEditSupplier} />}
			{showAddOrEditSupplier && <AddOrEditSupplier setShowAddOrEditSupplier={setShowAddOrEditSupplier} supplierId={supplier.id as string} setSelectedSupplier={setSelectedSupplier} />}
		</div>
	);
};

export default page;
