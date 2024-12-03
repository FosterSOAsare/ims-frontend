"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { drugOrderSchema } from "@/libs/hookform";
import drugs from "@/data/drugs";

import Input from "@/components/Input";
import CustomSelect from "@/components/Select";
import { permission } from "process";

export interface IUserDetails {
	role: string;
	department: string;
	permissions: { value: string; accessLevel: "READ" | "READ_WRITE" | "READ_WRITE_DELETE" | "" }[];
}

const initial: IUserDetails = {
	role: "",
	department: "",
	permissions: [
		{ value: "ITEMS", accessLevel: "" },
		{ value: "ITEMS_CATEGORIES", accessLevel: "" },
		{ value: "STOCK_ADJUSTMENT", accessLevel: "" },
		{ value: "DRUG_ORDERS", accessLevel: "" },
		{ value: "REPORTS", accessLevel: "" },
		{ value: "SUPPLIERS", accessLevel: "" },
		{ value: "SALES", accessLevel: "" },
		{ value: "DEPARTMENT_REQUESTS", accessLevel: "" },
		{ value: "DEPARTMENTS", accessLevel: "" },
		{ value: "USERS", accessLevel: "" },
	],
};

const roles = ["Central Admin", "Department Admin", "Pharmacist"];

interface IAddOrEditUser {
	setSelectedUser: React.Dispatch<React.SetStateAction<null | number>>;
	setShowAddOrEditUser: React.Dispatch<React.SetStateAction<boolean>>;
	userId: string;
}

const accessLevels = ["READ", "READ_WRITE", "READ_WRITE_DELETE"];
const permissions = [
	{ value: "ITEMS", desc: "Items" },
	{ value: "ITEMS_CATEGORIES", desc: "Item Categories" },
	{ value: "STOCK_ADJUSTMENT", desc: "Stock Adjustment" },
	{ value: "DRUG_ORDERS", desc: "Item Orders" },
	{ value: "REPORTS", desc: "Reports" },
	{ value: "SUPPLIERS", desc: "Suppliers" },
	{ value: "SALES", desc: "Sales" },
	{ value: "DEPARTMENT_REQUESTS", desc: "Department Requests" },
	{ value: "DEPARTMENTS", desc: "Departments" },
	{ value: "USERS", desc: "Users" },
];

const AddOrEditUser = ({ setShowAddOrEditUser, userId, setSelectedUser }: IAddOrEditUser) => {
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

	const changePermission = (value: string, accessLevel: "READ" | "READ_WRITE" | "READ_WRITE_DELETE") => {
		console.log(value, accessLevel);
		setUser((prev) => ({ ...prev, permissions: prev.permissions.map((p) => (p.value === value ? { ...p, accessLevel } : p)) }));
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

				<form className="h-[calc(100%-60px)] flex items-start flex-col gap-2" onSubmit={handleSubmit(addOrder)}>
					<div className="px-4 space-y-3 overflow-y-auto h-[calc(100%-30px)] w-full">
						<div className="w-full">
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
						<div className="mt-6">
							<h3 className="mb-4">Permission</h3>

							<div>
								{permissions.map(({ value, desc }: { value: string; desc: string }, index: number) => {
									const permission = user.permissions.find((p) => p.value === value);
									console.log(permission);
									return (
										<div className="w-full flex mb-4 items-center justify-between" key={index}>
											<p className="text-sm font-medium">{desc}</p>
											<div>
												<select
													name=""
													value={permission?.accessLevel}
													onChange={(e) => changePermission(value, e.target.value as "READ" | "READ_WRITE" | "READ_WRITE_DELETE")}
													className="w-auto text-xs border-[1px] p-3 py-2 rounded-[8px]"
													id="">
													<option value="">Select permission</option>

													{accessLevels.map((accessLevel, index) => (
														<option value={accessLevel} className="text-xs">
															{accessLevel}
														</option>
													))}
												</select>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className="w-full flex items-center justify-between gap-4 h-auto white px-4 py-4 mt-auto">
						<button className="w-full bg-sec py-2 rounded-[10px] hover:opacity-70 text-white" type="submit">
							Add user
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddOrEditUser;
