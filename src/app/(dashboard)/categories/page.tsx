"use client";
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import AddOrEditCategory from "./AddOrEditCategory";

interface ICategory {
	id: string;
	name: string;
	dateCreated: string;
	status: "Deactivated" | "Active";
	itemsCount: number;
}

const categories: ICategory[] = [
	{ id: "1", name: "Laxatives", dateCreated: "Jun 25, 24", status: "Deactivated", itemsCount: 40 },
	{ id: "2", name: "Corticosteroids", dateCreated: "Jun 25, 24", status: "Active", itemsCount: 70 },
	{ id: "3", name: "Cough Suppressants", dateCreated: "Jun 25, 24", status: "Active", itemsCount: 2 },
	{ id: "4", name: "Cytotoxics", dateCreated: "Jun 25, 24", status: "Active", itemsCount: 45 },
	{ id: "5", name: "Decongestants", dateCreated: "Jun 25, 24", status: "Active", itemsCount: 0 },
	{ id: "6", name: "Diuretics", dateCreated: "Jun 25, 24", status: "Active", itemsCount: 100 },
	{ id: "7", name: "Immunosuppressives", dateCreated: "Jun 25, 24", status: "Active", itemsCount: 70 },
];

const page = () => {
	const [selectedCategory, setSelectedCategory] = useState<null | number>(null);
	const [showAddOrEditDrug, setShowAddOrEditCategory] = useState<boolean>(false);

	const category = useMemo(() => (selectedCategory !== null ? categories[selectedCategory] : ({} as ICategory)), [selectedCategory]);
	return (
		<div className="relative">
			<h3 className="text-2xl mb-3 font-bold">Categories</h3>

			{/* Categories Data  */}
			<div className="w-full bg-white  mt-6 rounded-[10px] p-4 ">
				<div className="w-full flex items-center justify-between">
					<div className="w-2/5 relative">
						<span className="absolute left-3 top-0 bottom-0 flex items-center justify-center">
							<Icon icon="iconoir:search" className="text-xl text-gray-400" />
						</span>
						<input type="text" className="bg-gray-300 w-full p-2 border-[2px] border-transparent focus:border-gray-200 rounded-[10px] pl-10" placeholder="Search category" />
					</div>

					<div className="flex gap-2 items-center justify-between">
						<button
							className="px-3 flex items-center justify-center gap-2 py-3 hover:opacity-60 bg-sec text-white rounded-[12px] border-[1px]"
							onClick={() => setShowAddOrEditCategory(true)}>
							<Icon icon="solar:pills-bold-duotone" className="text-2xl" />
							Add new category
						</button>
					</div>
				</div>

				{/* Table title */}
				<div className="bg-gray-700 drugs-table gap-4 mt-6 items-center rounded-[10px] border-[1px] grid grid-cols-12 px-3">
					<div className="col-span-6 text-gray-500 uppercase text-sm py-3">Category</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Date Created</div>
					<div className="col-span-4 text-gray-500 uppercase text-sm py-3">Status</div>
					<div className="col-span-6 text-gray-500 uppercase text-sm py-3">Items In Category</div>
					{/* <div className="col-span-4 text-gray-500 uppercase text-xs py-3"></div> */}
				</div>

				<div>
					{/* Last two on the table will have isLast so the drop down shows at the top instead */}
					{categories.map(({ name, dateCreated, status, itemsCount }, index) => (
						<div className="bg-white drugs-table gap-2 border-gray-200 items-center mt-6 rounded-[10px] px-3 border-[1px] grid grid-cols-12">
							<div className="col-span-6 text-primary py-3 text-left">{name}</div>
							<div className="col-span-4 text-primary py-3 text-left">{dateCreated}</div>
							<div className="col-span-4 text-sm text-gray-500 py-3 text-left">
								<div
									className={`${
										status.toLowerCase() === "deactivated" ? "text-red-500 bg-red-100" : "bg-green-100 text-green-500"
									} inline-flex rounded-full px-2 py-1 items-center gap-1`}>
									<span className={`inline-block w-[6px] h-[6px] rounded-full ${status.toLowerCase() === "deactivated" ? " bg-red-500" : "bg-green-500"}`}></span>
									{status}
								</div>
							</div>
							<div className="col-span-6 text-primary py-3 flex items-center gap-1 text-left">{itemsCount}</div>

							{/* Actions */}
							<div className="col-span-4 text-primary py-3 gap-2 text-left flex items-center justify-end">
								<button className="p-2 rounded-full hover:bg-gray-200">
									<Icon icon="ph:trash" />
								</button>
								<button
									className="p-2 rounded-full hover:bg-red-500 hover:text-white"
									onClick={() => {
										setSelectedCategory(index);
										setShowAddOrEditCategory(true);
									}}>
									<Icon icon="lucide:edit-2" />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{showAddOrEditDrug && (
				<AddOrEditCategory
					setSelectedCategory={setSelectedCategory}
					categoryId={category?.id as string}
					categoryName={category?.name as string}
					setShowAddOrEditCategory={setShowAddOrEditCategory}
				/>
			)}
		</div>
	);
};

export default page;
