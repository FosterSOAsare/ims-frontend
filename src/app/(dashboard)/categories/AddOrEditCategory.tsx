import { useCreateAnItemCategoryRequestMutation, useEditAnItemCategoryRequestMutation } from "@/apis/itemCategories";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface IAddOrEditCategory {
	setShowAddOrEditCategory: React.Dispatch<React.SetStateAction<boolean>>;
	categoryId: string;
	categoryName: string;
	setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
}

const AddOrEditCategory = ({ setShowAddOrEditCategory, categoryId, categoryName, setSelectedCategory }: IAddOrEditCategory) => {
	const [value, setValue] = useState(categoryName);

	const [createItemCategoryRequest, { data: created, isLoading: creating, error: createError }] = useCreateAnItemCategoryRequestMutation();
	const [updateItemCategoryRequest, { data: updated, isLoading: updating, error: updateError }] = useEditAnItemCategoryRequestMutation();
	const addorEdit = () => {
		if (!value) return toast.error("Enter a department name", { autoClose: 1500 });
		if (value.length < 3) return toast.error("Department name should not be less than 3 characters", { autoClose: 1500 });

		// Check create or edit
		categoryId ? updateItemCategoryRequest({ categoryId, name: value }) : createItemCategoryRequest({ name: value });
	};

	useEffect(() => {
		if (!created && !updated) return;
		toast.success(`Category ${created ? "created" : "updated"} successfully`, { autoClose: 1500 });

		setShowAddOrEditCategory(false);
	}, [created, updated]);

	useCreateErrorFromApiRequest(updateError);
	useCreateErrorFromApiRequest(createError);
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-center px-3 w-full fixed top-0 left-0 z-[5]">
			<div className="w-auto rounded-[12px] h-auto py-6 px-4 bg-white">
				<div className="flex items-center mb-4 justify-between w-[400px] px-4">
					<h3 className="text-lg">{categoryId ? "Edit a " : "Add new"} Category </h3>

					<button
						className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200"
						onClick={() => {
							setShowAddOrEditCategory(false);
							setSelectedCategory(null);
						}}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>
				<form action="" className="px-4 w-full">
					<Input name="name" value={value} setValue={(value) => setValue(value)} label="Category Name" placeholder="Paracetamol" labelSx="text-sm" />

					<button className="w-full bg-sec mt-4 py-2 hover:opacity-70 rounded-[10px] text-white" type="button" onClick={addorEdit}>
						{creating || updating ? <Loading /> : <>{categoryId ? "Update" : "Add"} Category</>}
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddOrEditCategory;
