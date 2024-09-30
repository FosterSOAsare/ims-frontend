import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { IDrugOrder } from "./page";

interface ITableColumn extends IDrugOrder {
	isLast: boolean;
	selectedDrugOrder: number | null;
	setSelectedDrugOrder: React.Dispatch<React.SetStateAction<number | null>>;
	index: number;
	viewStockAdjustment?: () => void;
	setShowAddOrEditStock: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableColumn = ({
	date,
	id,
	name,
	orderNumber,
	supplier,
	quantity,
	delivery,
	status,
	isLast,
	selectedDrugOrder,
	setSelectedDrugOrder,
	index,
	viewStockAdjustment,
	setShowAddOrEditStock,
}: ITableColumn) => {
	return (
		<div className="bg-white drugs-table gap-4 border-gray-200 items-center mt-6 rounded-[10px] px-3 border-[1px] grid grid-cols-12">
			<div className="col-span-4 text-primary py-3 text-left">{name.length > 17 ? name.substring(0, 17) + "..." : name}</div>
			<div className="col-span-3 text-primary py-3 text-left">{orderNumber}</div>

			<div className="col-span-4 text-primary py-3 text-left flex items-center justify-start gap-1">
				<Icon icon="solar:documents-linear" />
				{supplier.length > 12 ? supplier.substring(0, 12) + "..." : supplier}
			</div>
			<div className="col-span-3 text-primary py-3 text-left">{date}</div>
			<div className="col-span-3 text-primary py-3 text-left">{quantity}</div>
			<div className="col-span-3">{delivery}</div>
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
							{status.toLowerCase() === "requested" && (
								<>
									<button
										className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2"
										onClick={() => {
											setShowAddOrEditStock(true);
											setSelectedDrugOrder(index);
										}}>
										<Icon icon="hugeicons:file-edit" className="text-lg" />
										Edit
									</button>
									<button className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2">
										<Icon icon="hugeicons:view" className="text-lg" />
										Mark As delivering
									</button>
								</>
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
