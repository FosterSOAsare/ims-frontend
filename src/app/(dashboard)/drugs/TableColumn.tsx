import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface ITableColumn {
	name: string;
	batch: string;
	category: string;
	stock: string;
	supplier: string;
	status: string;
	reorderPoint: number;
}

const TableColumn = ({ name, batch, category, stock, supplier, status, reorderPoint }: ITableColumn) => {
	return (
		<div className="bg-white drugs-table gap-2 border-gray-200 items-center mt-6 rounded-[10px] px-3 border-[1px] grid grid-cols-12">
			<div className="col-span-4 text-primary py-3 text-left">{name}</div>
			<div className="col-span-3 text-primary py-3 text-left">{batch}</div>
			<div className="col-span-3 text-gray-500 py-3 text-left">
				<div className="inline-block text-sm bg-gray-200 rounded-full px-3 py-1" title={category}>
					{category.length > 10 ? category.substring(0, 10) + "..." : category}
				</div>
			</div>
			<div className="col-span-3 text-primary py-3 text-left">{stock}</div>
			<div className="col-span-5 text-primary py-3 flex items-center gap-1 text-left">
				<Icon icon="solar:buildings-3-line-duotone" /> {supplier}
			</div>
			<div className="col-span-3 text-gray-500 py-3 text-left">{status}</div>
			<div className="col-span-3 text-primary py-3 text-left flex items-center justify-between">
				{reorderPoint}
				<button className="rounded-full hover:bg-slate-200 p-1">
					<Icon icon="bi:three-dots" />
				</button>
			</div>
		</div>
	);
};

export default TableColumn;
