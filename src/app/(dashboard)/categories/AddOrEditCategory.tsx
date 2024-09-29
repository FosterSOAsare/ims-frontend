import Input from "@/components/Input";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
interface IAddOrEditCategory {
	setShowAddOrEditCategory: React.Dispatch<React.SetStateAction<boolean>>;
	categoryId: string;
	categoryName: string;
}

const AddOrEditCategory = ({ setShowAddOrEditCategory, categoryId, categoryName }: IAddOrEditCategory) => {
	const [value, setValue] = useState(categoryName);
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-center px-3 w-full fixed top-0 left-0 z-[5]">
			<div className="w-auto rounded-[12px] h-auto py-8 px-4 bg-white">
				<div className="flex items-center justify-between w-[400px] px-4">
					<h3 className="text-lg">{categoryId ? "Edit a " : "Add new"} Category </h3>

					<button className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200" onClick={() => setShowAddOrEditCategory(false)}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>
				<form action="" className="px-4 w-full">
					<Input name="name" label="Category Name" placeholder="Paracetamol" labelSx="text-sm" />

					<button className="w-full bg-sec mt-4 py-2 hover:opacity-70 rounded-[10px] text-white" onClick={() => setShowAddOrEditCategory(false)}>
						{categoryId ? "Update" : "Add"} Category
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddOrEditCategory;
