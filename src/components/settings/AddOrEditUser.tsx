"use client";
import React, { use, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { drugOrderSchema, newUserSchema } from "@/libs/hookform";
import drugs from "@/data/drugs";

import Input from "@/components/Input";
import CustomSelect from "@/components/Select";
import { permission } from "process";
import { FieldValues } from "react-hook-form";
import { useCreateANewUserRequestMutation, useGetUserRolesRequestQuery } from "@/apis/usersApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import Loading, { PageLoading } from "../Loading";
import { useCreateADepartmentRequestMutation, useGetDepartmentsQuery } from "@/apis/departmentsApi";

export interface IUserDetails {
	role: string;
	department: string;
	permissions: string[];
}

const initial: IUserDetails = {
	role: "",
	department: "",
	permissions: [],
};

const roles = ["Central Admin", "Department Admin", "Pharmacist"];

interface IAddOrEditUser {
	setSelectedUser: React.Dispatch<React.SetStateAction<null | number>>;
	setShowAddOrEditUser: React.Dispatch<React.SetStateAction<boolean>>;
	userId: string;
}

const accessLevels = ["READ", "READ_WRITE", "READ_WRITE_DELETE"];
const permissions = [
	{ value: "items", desc: "Items" },
	{ value: "item_categories", desc: "Item Categories" },
	{ value: "stock_adjustment", desc: "Stock Adjustment" },
	{ value: "item_orders", desc: "Item Orders" },
	{ value: "reports", desc: "Reports" },
	{ value: "suppliers", desc: "Suppliers" },
	{ value: "sales", desc: "Sales" },
	{ value: "department_requests", desc: "Department Requests" },
	{ value: "departments", desc: "Departments" },
	{ value: "users", desc: "Users" },
];

const AddOrEditUser = ({ setShowAddOrEditUser, userId, setSelectedUser }: IAddOrEditUser) => {
	const [user, setUser] = useState<IUserDetails>(initial);
	// Select fields will change the details directly while inputs will use a hookform for validation
	const { register, handleSubmit } = useSelectedValuesFromHookForm(newUserSchema);
	const { data: roles, isLoading: gettingRoles, error: rolesError } = useGetUserRolesRequestQuery();
	const { data: departments, isLoading: gettingDepartments, error: departmentsError } = useGetDepartmentsQuery();

	const [createUserRequest, { data: created, isLoading: creatingUser, error: userError }] = useCreateANewUserRequestMutation();

	// Fetch user if it is an edit request

	const setValue = (name: string, value: string) => {
		setUser((prev) => ({ ...prev, [name]: value }));
	};

	const addNewUser = (data: any) => {
		const { name, email } = data;

		let { role, department, permissions } = user;
		if (!role) return toast.error("Please select the drug you want to order", { autoClose: 1500 });
		if (!department) return toast.error("Please select a department", { autoClose: 1500 });

		// Filter permissions
		permissions = permissions.filter((p) => p.split(":")[1]);
		const departmentId = departments?.data?.rows?.find((d: { name: string }) => d.name === department)?.id;

		if (!departmentId) return toast.error("Please select a valid department", { autoClose: 1500 });
		console.log(JSON.stringify({ fullName: name, email, permissions, departmentId, role, password: "XT(v2EiTqQZ" }));
		createUserRequest({ fullName: name, email, permissions, departmentId, role, password: "XT(v2EiTqQZ" });
	};

	const changePermission = (value: string, accessLevel: "READ" | "READ_WRITE" | "READ_WRITE_DELETE") => {
		setUser((prev) => {
			const permissionExists = prev.permissions.find((p) => p.split(":")[0] === value);
			return {
				...prev,
				permissions: !permissionExists
					? [...prev.permissions, `${value}:${accessLevel}`]
					: prev.permissions.map((p) => (p.split(":")[0].toLowerCase() === value.toLowerCase() ? `${p.split(":")[0]}:${accessLevel}` : p)),
			};
		});
	};

	// Change permissions based on selected role
	useEffect(() => {
		if (!user.role) return;
		const selectedRole = roles?.data?.find((role: { role: string }) => role.role == user.role);
		// Set permissions to one associated with role
		setUser((prev) => ({ ...prev, permissions: selectedRole.permissions }));
	}, [user.role]);

	// Creating user check
	useEffect(() => {
		console.log(created);
		if (!created) return;
		toast.success("User created successfully", { autoClose: 1500 });

		setShowAddOrEditUser(false);
	}, [created]);

	useCreateErrorFromApiRequest(rolesError);
	useCreateErrorFromApiRequest(departmentsError);
	useCreateErrorFromApiRequest(userError);
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<div className="w-[28%] flex flex-col gap-4 h-[calc(100%-20px)]  bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full px-4 pt-4">
					<h3 className="text-lg font-bold">{userId ? "Edit a " : "Add new"} user </h3>
					<button
						type="button"
						disabled={creatingUser}
						className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200"
						onClick={() => {
							setShowAddOrEditUser(false);
							setSelectedUser(null);
						}}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>

				{!gettingRoles && roles && (
					<form className="h-[calc(100%-60px)] flex items-start flex-col gap-2" onSubmit={handleSubmit(addNewUser)}>
						<div className="px-4 space-y-3 overflow-y-auto h-[calc(100%-30px)] w-full">
							<div className="w-full">
								<CustomSelect
									options={roles?.data?.map(({ role }: { role: string }) => role) || []}
									value={user.role}
									label="Assign role"
									placeholder="Select option"
									handleChange={(value) => setValue("role", value)}
								/>
								{!userId && (
									<>
										<Input name="name" register={register} label="Name" placeholder="eg: Michael Mensah" labelSx="text-sm" inputSx="text-sm" />
										<CustomSelect
											options={departments?.data?.rows?.map((dep: { name: string }) => dep.name) || []}
											value={user.department}
											label="Department"
											placeholder="Select option"
											handleChange={(value) => setValue("department", value)}
										/>
										<Input name="email" register={register} label="Email" placeholder="eg: username@example.com" labelSx="text-sm" inputSx="text-sm" />
									</>
								)}
							</div>
							<div className="mt-6">
								<h3 className="mb-4">Permission</h3>

								<div>
									{permissions.map(({ value, desc }: { value: string; desc: string }, index: number) => {
										const permission = user.permissions
											.map((permission) => {
												const arr = permission.split(":");
												return { key: arr[0], accessLevel: arr[1] };
											})
											.find(({ key }: { key: string }) => {
												// Key should match the value. Since key in user.permission was deliberated made to overlap value in all permissions
												return key.toLowerCase() === value.toLowerCase();
											}) || { accessLevel: "" };

										return (
											<div className="w-full flex mb-4 items-center justify-between" key={index}>
												<p className="text-sm font-medium">{desc}</p>
												<div>
													<select
														name=""
														value={permission?.accessLevel as string}
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
							<button disabled={creatingUser} className="w-full bg-sec py-2 rounded-[10px] hover:opacity-70 text-white" type="submit">
								{creatingUser ? <Loading /> : "Add user"}
							</button>
						</div>
					</form>
				)}

				{gettingRoles && <PageLoading />}
			</div>
		</div>
	);
};

export default AddOrEditUser;
