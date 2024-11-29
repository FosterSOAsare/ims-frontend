import AddOrEditUser from "@/components/settings/AddOrEditUser";
import User from "@/components/settings/User";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useMemo, useState } from "react";
// import AddOrEditUser from "./AddOrEditUser";

export interface IUser {
	name: string;
	role: string;
	status: "active" | "deactivated" | "pending";
	id: string;
}

const users: IUser[] = [
	{ id: "1", name: "Grace Ashley", role: "Central Admin", status: "pending" },
	{ id: "2", name: "Bright Tod", role: "Admin", status: "active" },
	{ id: "3", name: "Judith Bill", role: "Pharmacist", status: "active" },
	{ id: "4", name: "Judith Bill", role: "Admin", status: "deactivated" },
	{ id: "5", name: "Judith Bill", role: "Admin", status: "active" },
];

const Users = () => {
	const [selectedUser, setSelectedUser] = useState<null | number>(null);
	const [showAddOrEditUser, setShowAddOrEditUser] = useState<boolean>(false);

	const department = useMemo(() => (selectedUser !== null ? users[selectedUser] : ({} as IUser)), [selectedUser]);
	return (
		<div>
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-lg flex items-center gap-1 font-bold">Users and Roles</h3>
					<p className="text-sm">Add, delete users and manage roles </p>
				</div>

				<button className="text-white bg-sec rounded-[6px] px-4 py-2 hover:opacity-70" onClick={() => setShowAddOrEditUser(true)}>
					Add new user
				</button>
			</div>

			<div className="py-4">
				<div className="mt-4 grid-cols-12 uppercase border-[1px] bg-[#FAFAFA] rounded-[12px] grid py-2 px-3">
					<div className="col-span-5 text-gray-500 text-sm py-2"> User</div>
					<div className="col-span-3 text-gray-500 text-sm py-2"> Role</div>
					<div className="col-span-2 text-gray-500 text-sm py-2"> Status</div>
					<div className="col-span-3"></div>
				</div>

				<div>
					{users.map((user: IUser, index) => (
						<User
							{...user}
							key={index}
							index={index}
							selectedUser={selectedUser}
							setSelectedUser={setSelectedUser}
							setShowAddOrEditUser={setShowAddOrEditUser}
							isLast={index >= users.length - 2}
						/>
					))}
				</div>
			</div>

			{showAddOrEditUser && <AddOrEditUser setSelectedUser={setSelectedUser} userId={department?.id as string} setShowAddOrEditUser={setShowAddOrEditUser} />}
		</div>
	);
};

export default Users;
