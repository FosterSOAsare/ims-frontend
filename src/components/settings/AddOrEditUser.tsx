"use client";
import React, { use, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { newUserSchema } from "@/libs/hookform";

import Input from "@/components/Input";
import CustomSelect from "@/components/Select";
import { useCreateANewUserRequestMutation, useGetAllRolesRequestQuery, useLazyGetAUserRequestQuery, useUpdateUserRoleRequestMutation } from "@/apis/usersApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import Loading, { PageLoading } from "../Loading";
import { useGetDepartmentsQuery } from "@/apis/departmentsApi";

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
	const [pageLoaded, setPageLoaded] = useState(true);
	// Select fields will change the details directly while inputs will use a hookform for validation
	const { register, handleSubmit } = useSelectedValuesFromHookForm(newUserSchema);
	const { data: roles, isLoading: gettingRoles, error: rolesError } = useGetAllRolesRequestQuery();
	const { data: departments, isLoading: gettingDepartments, error: departmentsError } = useGetDepartmentsQuery();
	const [getUserDetailsRequest, { data: userDetails, isLoading: gettingUserDetails, error: userDetailsError }] = useLazyGetAUserRequestQuery();

	const [createUserRequest, { data: created, isLoading: creatingUser, error: userError }] = useCreateANewUserRequestMutation();
	const [updateUserRoleRequest, { data: updated, isLoading: updatingUserRole, error: userRoleError }] = useUpdateUserRoleRequestMutation();

	// Fetch user if it is an edit request
	useEffect(() => {
		setPageLoaded(false);
		if (!userId) return;
		getUserDetailsRequest({ userId });
	}, [userId]);

	// Wait for user detals and set role and permissions accordingly
	useEffect(() => {
		if (!userDetails?.data) return;
		// // Set user role and permissions
		setUser((prev) => ({ ...prev, role: userDetails?.data?.role || "", permissions: userDetails?.data?.permissions || [] }));
		setPageLoaded(true);
	}, [userDetails]);

	// This function handles a change in the role select field
	const handleUserRoleChange = (value: string) => {
		const selectedRole = roles?.data?.find((role: { role: string }) => role.role == value);
		// 	// Set permissions to one associated with role
		setUser((prev) => ({ ...prev, permissions: selectedRole.permissions }));
	};

	const addNewUser = (data: any) => {
		const { name, email } = data;

		let { role, department, permissions } = user;
		if (!role) return toast.error("Please select the role of users", { autoClose: 1500 });
		if (!department) return toast.error("Please select a department", { autoClose: 1500 });

		// Filter permissions and find departmentId
		permissions = permissions.filter((p) => p.split(":")[1]);
		const departmentId = departments?.data?.rows?.find((d: { name: string }) => d.name === department)?.id;

		if (!departmentId) return toast.error("Please select a valid department", { autoClose: 1500 });
		// console.log(JSON.stringify({ fullName: name, email, permissions, departmentId, role, password: "XT(v2EiTqQZ" }));
		createUserRequest({ fullName: name, email, permissions, departmentId, role, password: "XT(v2EiTqQZ" });
	};

	const updateUserRole = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Get role ams permissions from user and filter permissions
		let { role, permissions } = user;
		if (!role) return toast.error("Please select the role of user", { autoClose: 1500 });
		permissions = permissions.filter((p: string) => p.split(":")[1]);
		updateUserRoleRequest({ role, permissions, userId });
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

	// // Change permissions based on selected role
	// useEffect(() => {
	// 	if (!user.role) return;
	//
	// }, [user.role]);

	// Creating user check
	useEffect(() => {
		if (!created && !updated) return;
		toast.success(`User ${created ? "created" : "roles updated"} successfully`, { autoClose: 1500 });
		setShowAddOrEditUser(false);
	}, [created, updated]);

	useCreateErrorFromApiRequest(rolesError);
	useCreateErrorFromApiRequest(departmentsError);
	useCreateErrorFromApiRequest(userError);
	useCreateErrorFromApiRequest(userDetailsError);
	useCreateErrorFromApiRequest(userRoleError);
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<div className="w-[28%] flex flex-col gap-4 h-[calc(100%-20px)]  bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full px-4 pt-4">
					<h3 className="text-lg font-bold">{userId ? "Edit a " : "Add new"} user </h3>
					<button
						type="button"
						disabled={creatingUser || updatingUserRole}
						className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200"
						onClick={() => {
							setShowAddOrEditUser(false);
							setSelectedUser(null);
						}}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>

				{!gettingRoles && !gettingUserDetails && roles && !gettingDepartments && departments && userDetails && (
					<form className="h-[calc(100%-60px)] flex items-start flex-col gap-2" onSubmit={(e) => (userId ? updateUserRole(e) : handleSubmit(addNewUser))}>
						<div className="px-4 space-y-3 overflow-y-auto h-[calc(100%-30px)] w-full">
							<div className="w-full">
								<CustomSelect
									options={roles?.data?.map(({ role }: { role: string }) => role) || []}
									value={user.role}
									label="Assign role"
									placeholder="Select option"
									handleChange={(value) => handleUserRoleChange(value)}
								/>
								{!userId && (
									<>
										<Input name="name" register={register} label="Name" placeholder="eg: Michael Mensah" labelSx="text-sm" inputSx="text-sm" />
										<CustomSelect
											options={departments?.data?.rows?.map((dep: { name: string }) => dep.name) || []}
											value={user.department}
											label="Department"
											placeholder="Select option"
											handleChange={(value) => setUser((prev) => ({ ...prev, department: value }))}
										/>
										<Input name="email" register={register} label="Email" placeholder="eg: username@example.com" labelSx="text-sm" inputSx="text-sm" />
									</>
								)}
							</div>
							<div className="mt-6">
								<h3 className="mb-4">Permission</h3>

								<div>
									{permissions.map(({ value, desc }: { value: string; desc: string }, index: number) => {
										const permission = user?.permissions
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
															<option value={accessLevel} className="text-xs" key={index}>
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
							<button disabled={creatingUser || updatingUserRole} className="w-full bg-sec py-2 rounded-[10px] hover:opacity-70 text-white" type="submit">
								{creatingUser || updatingUserRole ? <Loading /> : userId ? "Edit user" : "Add user"}
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
