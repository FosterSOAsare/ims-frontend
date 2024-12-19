import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { IDrugOrder } from "./page";
import { formatDate } from "@/utils/date";

interface ITableColumn extends IDrugOrder {
	isLast: boolean;
	selectedDrugOrder: number | null;
	setSelectedDrugOrder: React.Dispatch<React.SetStateAction<number | null>>;
	index: number;
	viewStockAdjustment?: () => void;
	setShowAddOrEditDrugOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableColumn = ({
	date,
	id,
	drugName,
	orderNumber,
	supplierName,
	quantity,
	expectedDeliveryDate,
	status,
	isLast,
	selectedDrugOrder,
	setSelectedDrugOrder,
	index,
	viewStockAdjustment,
	setShowAddOrEditDrugOrder,
}: ITableColumn) => {
	return (
		<div className="bg-white drugs-table gap-4 border-gray-200 items-center mt-6 rounded-[10px] px-3 border-[1px] grid grid-cols-12">
			<div className="col-span-4 text-primary py-3 text-left">{drugName.length > 17 ? drugName.substring(0, 17) + "..." : drugName}</div>
			<div className="col-span-3 text-primary py-3 text-left">{orderNumber}</div>

			<div className="col-span-4 text-primary py-3 text-left flex items-center justify-start gap-1">
				<Icon icon="solar:documents-linear" />
				{supplierName.length > 12 ? supplierName.substring(0, 12) + "..." : supplierName}
			</div>
			<div className="col-span-3 text-primary py-3 text-left">{formatDate(date)}</div>
			<div className="col-span-3 text-primary py-3 text-left">{quantity}</div>
			<div className="col-span-3">{formatDate(expectedDeliveryDate)}</div>
			<div className="col-span-3 text-sm text-gray-500 py-3 text-left">
				<div
					className={`${
						status.toLowerCase() === "cancelled"
							? "text-red-500 bg-red-100"
							: status.toLowerCase() === "requested"
							? "bg-[#EFF8FF] text-sec"
							: status.toLowerCase() === "received"
							? "bg-green-100 text-green-500"
							: "bg-[#FFFAEB] text-[#B54708]"
					} inline-flex rounded-full px-2 py-1 items-center gap-1`}>
					<span
						className={`inline-block w-[6px] h-[6px] rounded-full ${
							status.toLowerCase() === "cancelled"
								? " bg-red-500"
								: status.toLowerCase() === "requested"
								? "bg-sec"
								: status.toLowerCase() === "received"
								? "bg-green-500"
								: " bg-[#B54708]"
						}`}></span>
					{status}
				</div>
			</div>
			<div className="col-span-1 text-primary py-3 text-left flex items-center justify-between">
				<div className="relative">
					<button className="rounded-full hover:bg-slate-200 p-1" onClick={() => setSelectedDrugOrder((prev: number | null) => (prev === index ? null : index))}>
						<Icon icon="bi:three-dots" />
					</button>
					{selectedDrugOrder == index && (
						<div className={`absolute ${isLast ? "bottom-[100%]" : "top-[100%]"}  right-0 h-auto w-[180px] bg-white selectedDrugOrder z-[3] rounded-[5px] card`}>
							{(status.toLowerCase() === "requested" || status.toLowerCase() === "draft") && (
								<>
									<button
										className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2"
										onClick={() => {
											setShowAddOrEditDrugOrder(true);
											setSelectedDrugOrder(index);
										}}>
										<Icon icon="hugeicons:file-edit" className="text-lg" />
										Edit
									</button>
									{status.toLowerCase() === "requested" && (
										<button className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2">
											<Icon icon="hugeicons:view" className="text-lg" />
											Mark As delivering
										</button>
									)}

									{status.toLowerCase() === "draft" && (
										<button className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2">
											<Icon icon="hugeicons:view" className="text-lg" />
											Mark As requested
										</button>
									)}
								</>
							)}
							{status.toLowerCase() === "delivering" && (
								<button className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2">
									<Icon icon="hugeicons:view" className="text-lg" />
									Mark As received
								</button>
							)}
							<button className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2" onClick={() => viewStockAdjustment && viewStockAdjustment()}>
								<Icon icon="solar:printer-2-outline" className="text-lg" />
								Print PDF
							</button>
							{["requested", "delivering"].includes(status.toLowerCase()) && (
								<button className="px-3 gap-[6px] hover:bg-red-500 flex hover:text-white items-center justify-start text-sm text-red-500 w-full py-2">
									<Icon icon="solar:trash-bin-trash-line-duotone" className="text-lg" />
									Cancel order
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TableColumn;
