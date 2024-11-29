"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast, ToastContainer } from "react-toastify";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { drugOrderSchema } from "@/libs/hookform";
import drugs from "@/data/drugs";

import Input from "@/components/Input";
import CustomSelect from "@/components/Select";

export interface IUserDetails {
	role: string;
	department: string;
}

const initial: IUserDetails = {
	role: "",
	department: "",
};

const roles = ["Central Admin", "Admin", "Pharmacist"];

interface IAddOrEditStock {
	setSelectedUser: React.Dispatch<React.SetStateAction<null | number>>;
	setShowAddOrEditUser: React.Dispatch<React.SetStateAction<boolean>>;
	userId: string;
}

const AddOrEditUser = ({ setShowAddOrEditUser, userId, setSelectedUser }: IAddOrEditStock) => {
	const [user, setUser] = useState<IUserDetails>(initial);

	// Fetch order if it is an edit request

	// Select fields will change the details directly while inputs will use a hookform for vaidation
	const { register, handleSubmit } = useSelectedValuesFromHookForm(drugOrderSchema);
	const setValue = (name: string, value: string) => {
		setUser((prev) => ({ ...prev, [name]: value }));
	};

	const addOrder = (data: any) => {
		const { quantity, deliveryDate, address } = data;

		const { role, department } = user;
		if (!role) return toast.error("Please select the drug you want to order", { autoClose: 1500 });
		if (!department) return toast.error("Please select a department", { autoClose: 1500 });

		const allData = { quantity, deliveryDate, address, role, department };
		console.log(allData);
	};

	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<div className="w-[28%] flex flex-col gap-4 h-[calc(100%-20px)]  bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full px-4 pt-4">
					<h3 className="text-lg font-bold">{userId ? "Edit a " : "Add new"} user </h3>
					<button
						type="button"
						className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200"
						onClick={() => {
							setShowAddOrEditUser(false);
							setSelectedUser(null);
						}}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>

				<form className="h-[calc(100%-60px)] flex items-start flex-col  gap-2" onSubmit={handleSubmit(addOrder)}>
					<div className="px-4 overflow-y-auto space-y-3 w-full">
						<CustomSelect options={roles} value={user.role} label="Assign role" placeholder="Select option" handleChange={(value) => setValue("role", value)} />
						{!userId && (
							<>
								<Input name="name" register={register} label="Name" placeholder="eg: Michael Mensah" labelSx="text-sm" inputSx="text-sm" />
								<CustomSelect
									options={Array.from({ length: 20 }, (_i, i) => `Department ${i + 1}`)}
									value={user.department}
									label="Department"
									placeholder="Select option"
									handleChange={(value) => setValue("department", value)}
								/>
								<Input name="email" register={register} label="Email" placeholder="eg: username@example.com" labelSx="text-sm" inputSx="text-sm" />
								<Input name="password" register={register} label="Password" placeholder="Generate password" labelSx="text-sm" inputSx="text-sm" />
							</>
						)}
					</div>

					<div className="px-4 mt-4">
						<h3>Permission</h3>

						<div></div>
					</div>

					<div className="w-full flex items-center justify-between gap-4 h-auto white px-4 py-4 mt-auto">
						<button className="w-full bg-sec py-2 rounded-[10px] hover:opacity-70 text-white" type="submit">
							Add user
						</button>
					</div>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
};

export default AddOrEditUser;
