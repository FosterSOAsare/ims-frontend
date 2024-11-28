import Input from "@/components/Input";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
interface IAddOrEditDepartment {
	setShowAddOrEditDepartment: React.Dispatch<React.SetStateAction<boolean>>;
	departmentId: string;
	departmentName: string;
	setSelectedDepartment: React.Dispatch<React.SetStateAction<number | null>>;
}

const AddOrEditDepartment = ({ setShowAddOrEditDepartment, departmentId, departmentName, setSelectedDepartment }: IAddOrEditDepartment) => {
	const [value, setValue] = useState(departmentName);

	const addorEdit = () => {};
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-center px-3 w-full fixed top-0 left-0 z-[5]">
			<div className="w-auto rounded-[12px] h-auto py-6 px-4 bg-white">
				<div className="flex items-center mb-4 justify-between w-[400px] px-4">
					<h3 className="text-lg">{departmentId ? "Edit a " : "Add new"} Department </h3>

					<button
						className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200"
						onClick={() => {
							setShowAddOrEditDepartment(false);
							setSelectedDepartment(null);
						}}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>
				<form action="" className="px-4 w-full">
					<Input name="name" value={value} setValue={(value) => setValue(value)} label="Department Name" placeholder="Paracetamol" labelSx="text-sm" inputSx="text-sm" />

					<button className="w-full bg-sec mt-4 py-2 hover:opacity-70 rounded-[10px] text-white" type="button" onClick={addorEdit}>
						{departmentId ? "Update" : "Add"} Department
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddOrEditDepartment;
