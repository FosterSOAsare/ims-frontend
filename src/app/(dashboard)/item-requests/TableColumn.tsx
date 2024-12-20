import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect } from "react";
import { IItemRequest } from "./page";
import { formatDate } from "@/utils/date";
import { useDeleteAnItemRequestRequestMutation } from "@/apis/itemRequestsApi";

interface ITableColumn extends IItemRequest {
	isLast: boolean;
	activeColumn: number | null;
	setActiveColumn: React.Dispatch<React.SetStateAction<number | null>>;
	index: number;
	setShowAddOrEditRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableColumn = ({ requestNumber, itemName, quantity, dateRequested, status, isLast, activeColumn, setActiveColumn, setShowAddOrEditRequest, index, id }: ITableColumn) => {
	const [deleteADrugRequest, { data: deleted, isLoading: deleting, error: deleteError }] = useDeleteAnItemRequestRequestMutation();

	useEffect(() => {
		if (!deleted) return;
		setActiveColumn(null);
	}, [deleted]);

	return (
		<div className="bg-white drugs-table gap-2 border-gray-200 items-center mt-6 rounded-[10px] px-3 border-[1px] grid grid-cols-12">
			<div className="col-span-5 text-primary py-3 text-left">{requestNumber}</div>
			<div className="col-span-5 text-primary py-3 text-left">{itemName}</div>
			<div className="col-span-4 text-primary py-3 text-left">{quantity}</div>
			<div className="col-span-5 text-primary py-3 flex items-center gap-1 text-left">{formatDate(dateRequested)}</div>
			<div className="col-span-4 text-sm text-gray-500 py-3 text-left">
				<div
					className={`${
						status.toLowerCase() === "cancelled"
							? "text-red-500 bg-red-100"
							: status.toLowerCase() === "accepted"
							? "text-sec bg-blue-100"
							: status.toLowerCase() === "delivered"
							? "bg-green-100 text-green-500"
							: "bg-[#FFFAEB] text-[#B54708]"
					} inline-flex rounded-full px-2 py-1 items-center gap-1`}>
					<span
						className={`inline-block w-[6px]  h-[6px] rounded-full ${
							status.toLowerCase() === "cancelled"
								? " bg-red-500"
								: status.toLowerCase() === "accepted"
								? "bg-sec"
								: status.toLowerCase() === "delivered"
								? "bg-green-500"
								: " bg-[#B54708]"
						}`}></span>
					{status}
				</div>
			</div>
			<div className="col-span-1 text-primary py-3 text-left flex items-center justify-between">
				<div className="relative">
					<button className="rounded-full hover:bg-slate-200 p-1" onClick={() => setActiveColumn((prev: number | null) => (prev === index ? null : index))}>
						{status.toLowerCase() !== "delivered" && <Icon icon="bi:three-dots" />}
					</button>
					{activeColumn == index && (
						<div
							className={`absolute ${isLast ? "bottom-[100%]" : "top-[100%]"}  right-0 h-auto ${
								status.toLowerCase() === "accepted" ? "w-[180px]" : "w-[130px]"
							} bg-white selectedStock z-[3] rounded-[5px] card`}>
							{status.toLowerCase() === "pending" && (
								<>
									<button
										disabled={deleting}
										className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2"
										onClick={() => {
											setShowAddOrEditRequest(true);
										}}>
										<Icon icon="hugeicons:file-edit" className="text-lg" />
										Edit
									</button>

									<button
										onClick={() => deleteADrugRequest({ requestId: id })}
										disabled={deleting}
										className="px-3 gap-[6px] hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-start text-sm w-full py-2">
										<Icon icon="solar:trash-bin-minimalistic-line-duotone" className="text-lg" />
										{deleting && activeColumn === index ? "Deleting..." : "Cancel"}
									</button>
								</>
							)}
							{status.toLowerCase() === "accepted" && (
								<>
									<button disabled={deleting} className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2">
										<Icon icon="ic:sharp-check" className="text-lg" />
										Mark as delivered
									</button>
								</>
							)}

							{/* {status.toLowerCase() === "cancelled" && (
								<>
									<button disabled={deleting} className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2">
										<Icon icon="hugeicons:file-edit" className="text-lg" />
										Edit
									</button>
								</>
							)} */}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TableColumn;
