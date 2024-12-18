import { useDeleteADrugRequestMutation } from "@/apis/drugsApi";
import Loading from "@/components/Loading";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface ITableColumn {
	name: string;
	category: string;
	stock: string;
	supplier: string;
	status: string;
	reorderPoint: number;
	isLast: boolean;
	activeColumn: number | null;
	setActiveColumn: React.Dispatch<React.SetStateAction<number | null>>;
	index: number;
	viewDrug: () => void;
	editDrug: () => void;
	id: string;
}

const TableColumn = ({ name, category, stock, supplier, status, reorderPoint, isLast, activeColumn, setActiveColumn, index, viewDrug, editDrug, id }: ITableColumn) => {
	const [deleteADrugRequest, { isLoading: deleting, error: deleteError }] = useDeleteADrugRequestMutation();

	useCreateErrorFromApiRequest(deleteError);
	return (
		<div className="bg-white drugs-table gap-2 border-gray-200 items-center mt-6 rounded-[10px] px-3 border-[1px] grid grid-cols-12">
			<div className="col-span-5 text-primary py-3 text-left">{name}</div>
			<div className="col-span-4 text-gray-500 py-3 text-left">
				<div className="inline-block text-sm bg-gray-200 rounded-full px-3 py-1" title={category}>
					{category.length > 10 ? category.substring(0, 10) + "..." : category}
				</div>
			</div>
			<div className="col-span-4 text-primary py-3 text-left">{stock}</div>
			<div className="col-span-5 text-primary py-3 flex items-center gap-1 text-left">
				<Icon icon="solar:buildings-3-line-duotone" /> {supplier}
			</div>
			<div className="col-span-3 text-sm text-gray-500 py-3 text-left">
				<div
					className={`${
						status.toLowerCase() === "low" || status.toLowerCase() === "out_of_stock"
							? "text-red-500 bg-red-100"
							: status.toLowerCase() === "stocked"
							? "bg-green-100 text-green-500"
							: "bg-gray-100 text-[#344054]"
					} inline-flex rounded-full px-2 py-1 items-center gap-1`}>
					<span
						className={`inline-block w-[6px] h-[6px] rounded-full ${
							status.toLowerCase() === "low" || status.toLowerCase() === "out_of_stock" ? " bg-red-500" : status.toLowerCase() === "stocked" ? "bg-green-500" : " bg-[#344054]"
						}`}></span>
					{status}
				</div>
			</div>
			<div className="col-span-3 text-primary py-3 text-left flex items-center justify-between">
				{reorderPoint}
				<div className="relative">
					<button className="rounded-full hover:bg-slate-200 p-1" onClick={() => setActiveColumn((prev: number | null) => (prev === index ? null : index))}>
						<Icon icon="bi:three-dots" />
					</button>
					{activeColumn == index && (
						<div className={`absolute ${isLast ? "bottom-[100%]" : "top-[100%]"}  right-0 h-auto w-[130px] bg-white selectedStock z-[3] rounded-[5px] card`}>
							<button disabled={deleting} className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2" onClick={() => viewDrug()}>
								<Icon icon="hugeicons:view" className="text-lg" />
								View details
							</button>
							<button disabled={deleting} className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2">
								<Icon icon="solar:box-line-duotone" className="text-lg" />
								Restock
							</button>
							<button disabled={deleting} className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2" onClick={() => editDrug()}>
								<Icon icon="hugeicons:file-edit" className="text-lg" />
								Edit
							</button>
							<button
								onClick={() => deleteADrugRequest({ drugId: id })}
								disabled={deleting}
								className="px-3 gap-[6px] hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-start text-sm w-full py-2">
								<Icon icon="solar:trash-bin-minimalistic-line-duotone" className="text-lg" />
								{activeColumn === index && deleting ? <Loading /> : "Delete"}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TableColumn;
