import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface ITableColumn {
	date: string;
	reason: string;
	status: "Submitted" | "Adjusted" | "Rejected";
	type: "Reduction";
	createdBy: "Michael Mensah";
	currentStock: number;
	actualStock: number;
	isLast: boolean;
	activeColumn: number | null;
	setActiveColumn: React.Dispatch<React.SetStateAction<number | null>>;
	index: number;
	viewDrug?: () => void;
}

const TableColumn = ({ date, reason, type, createdBy, currentStock, status, actualStock, isLast, activeColumn, setActiveColumn, index, viewDrug }: ITableColumn) => {
	return (
		<div className="bg-white drugs-table gap-4 border-gray-200 items-center mt-6 rounded-[10px] px-3 border-[1px] grid grid-cols-12">
			<div className="col-span-3 text-primary py-3 text-left">{date}</div>
			<div className="col-span-2 text-primary py-3 text-left">{reason}</div>
			<div className="col-span-2"></div>
			<div className="col-span-3 text-sm text-gray-500 py-3 text-left">
				<div
					className={`${
						status.toLowerCase() === "rejected" ? "text-red-500 bg-red-100" : status.toLowerCase() === "adjusted" ? "bg-green-100 text-green-500" : "bg-[#FFFAEB] text-[#B54708]"
					} inline-flex rounded-full px-2 py-1 items-center gap-1`}>
					<span
						className={`inline-block w-[6px] h-[6px] rounded-full ${
							status.toLowerCase() === "rejected" ? " bg-red-500" : status.toLowerCase() === "adjusted" ? "bg-green-500" : " bg-[#B54708]"
						}`}></span>
					{status}
				</div>
			</div>

			<div className="col-span-3 text-primary py-3 text-left">{type}</div>
			<div className="col-span-4 text-primary py-3 text-left">{createdBy}</div>
			<div className="col-span-3 text-primary py-3 text-left">{currentStock}</div>
			<div className="col-span-3">{actualStock}</div>
			<div className="col-span-1 text-primary py-3 text-left flex items-center justify-between">
				<div className="relative">
					<button className="rounded-full hover:bg-slate-200 p-1" onClick={() => setActiveColumn((prev: number | null) => (prev === index ? null : index))}>
						<Icon icon="bi:three-dots" />
					</button>
					{activeColumn == index && (
						<div className={`absolute ${isLast ? "bottom-[100%]" : "top-[100%]"}  right-0 h-auto w-[130px] bg-white selectedStock z-[3] rounded-[5px] card`}>
							<button className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2" onClick={() => viewDrug && viewDrug()}>
								<Icon icon="hugeicons:view" className="text-lg" />
								View details
							</button>

							<button className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2">
								<Icon icon="hugeicons:edit-01" className="text-lg" />
								Edit
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TableColumn;
