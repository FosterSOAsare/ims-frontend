import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { ISale } from "./page";

interface ITableColumn extends ISale {
	isLast: boolean;
	selectedSale: number | null;
	setSelectedSale: React.Dispatch<React.SetStateAction<number | null>>;
	index: number;
	viewStockAdjustment?: () => void;
	setShowAddOrEditDrugOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableColumn = ({
	date,
	id,
	patientName,
	saleNumber,
	item,
	quantity,
	amount,
	status,
	isLast,
	selectedSale,
	setSelectedSale,
	index,
	viewStockAdjustment,
	setShowAddOrEditDrugOrder,
}: ITableColumn) => {
	return (
		<div className="bg-white drugs-table gap-4 border-gray-200 items-center mt-6 rounded-[10px] px-3 border-[1px] grid grid-cols-12">
			<div className="col-span-4 text-primary py-3 text-left">{patientName.length > 17 ? patientName.substring(0, 17) + "..." : patientName}</div>
			<div className="col-span-3 text-primary py-3 text-left">{saleNumber}</div>

			<div className="col-span-4 text-primary py-3 text-left flex items-center justify-start gap-1">
				<Icon icon="solar:documents-linear" />
				{item.length > 12 ? item.substring(0, 12) + "..." : item}
			</div>
			<div className="col-span-3 text-primary py-3 text-left">{quantity}</div>
			<div className="col-span-3">{amount}</div>
			<div className="col-span-3 text-primary py-3 text-left">{date}</div>
			<div className="col-span-3 text-sm text-gray-500 py-3 text-left">
				<div className={`${status.toLowerCase() === "not paid" ? "text-red-500 bg-red-100" : "bg-green-100 text-green-500"} capitalize inline-flex rounded-full px-2 py-1 items-center gap-1`}>
					<span className={`inline-block w-[6px] h-[6px] rounded-full ${status.toLowerCase() === "not paid" ? " bg-red-500" : "bg-green-500"}`}></span>
					{status}
				</div>
			</div>
			<div className="col-span-1 text-primary py-3 text-left flex items-center justify-between">
				<div className="relative">
					<button className="rounded-full hover:bg-slate-200 p-1" onClick={() => setSelectedSale((prev: number | null) => (prev === index ? null : index))}>
						<Icon icon="bi:three-dots" />
					</button>
					{selectedSale == index && status.toLowerCase() === "not paid" && (
						<div className={`absolute ${isLast ? "bottom-[100%]" : "top-[100%]"}  right-0 h-auto w-[180px] bg-white selectedSale z-[3] rounded-[5px] card`}>
							<button
								className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2"
								onClick={() => {
									setShowAddOrEditDrugOrder(true);
									setSelectedSale(index);
								}}>
								<Icon icon="hugeicons:file-edit" className="text-lg" />
								Edit
							</button>
							<button className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2">
								<Icon icon="hugeicons:view" className="text-lg" />
								Mark As paid
							</button>

							<button className="px-3 gap-[6px] hover:bg-red-500 flex hover:text-white items-center justify-start text-sm text-red-500 w-full py-2">
								<Icon icon="solar:trash-bin-trash-line-duotone" className="text-lg" />
								Delete
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TableColumn;
