import { useCreateADepartmentRequestMutation, useEditADepartmentRequestMutation } from "@/apis/departmentsApi";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface IAddOrEditDepartment {
	setShowAddOrEditDepartment: React.Dispatch<React.SetStateAction<boolean>>;
	departmentId: string;
	departmentName: string;
	setSelectedDepartment: React.Dispatch<React.SetStateAction<number | null>>;
}

const AddOrEditDepartment = ({ setShowAddOrEditDepartment, departmentId, departmentName, setSelectedDepartment }: IAddOrEditDepartment) => {
	const [value, setValue] = useState(departmentName);

	const [createDepartmentRequest, { data: created, isLoading: creating, error: createError }] = useCreateADepartmentRequestMutation();
	const [updateDepartmentRequest, { data: updated, isLoading: updating, error: updateError }] = useEditADepartmentRequestMutation();

	const addorEdit = () => {
		if (!value) return toast.error("Enter a department name", { autoClose: 1500 });
		if (value.length < 3) return toast.error("Department name should not be less than 3 characters", { autoClose: 1500 });

		// Check create or edit
		departmentId ? updateDepartmentRequest({ departmentId, name: value }) : createDepartmentRequest({ name: value });
	};

	useEffect(() => {
		if (!created && !updated) return;
		toast.success(`Department ${created ? "created" : "updated"} successfully`, { autoClose: 1500 });

		setSelectedDepartment(null);
		setShowAddOrEditDepartment(false);
	}, [created, updated]);

	useCreateErrorFromApiRequest(createError);
	useCreateErrorFromApiRequest(updateError);

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

					<button disabled={creating || updating} className="w-full bg-sec mt-4 py-3 hover:opacity-70 rounded-[10px] text-white" type="button" onClick={addorEdit}>
						{creating || updating ? <Loading /> : <>{departmentId ? "Update" : "Add"} Department</>}
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddOrEditDepartment;
