import { useLazyGetUsersQuery } from "@/apis/usersApi";
import { PageLoading } from "@/components/Loading";
import NoData from "@/components/NoData";
import AddOrEditUser from "@/components/settings/AddOrEditUser";
import User from "@/components/settings/User";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useMemo, useState } from "react";
// import AddOrEditUser from "./AddOrEditUser";

export interface IUser {
	fullName: string;
	role: string;
	status: "active" | "deactivated" | "pending";
	id: string;
}

const Users = () => {
	const [selectedUser, setSelectedUser] = useState<null | number>(null);
	const [showAddOrEditUser, setShowAddOrEditUser] = useState<boolean>(false);

	const [page] = useState(0);

	const [getUsersRequest, { data, isLoading, error }] = useLazyGetUsersQuery();

	useEffect(() => {
		getUsersRequest({ page: page + 1 });
	}, [page]);

	const user = useMemo(() => {
		if (!data || selectedUser === null) return {} as IUser;
		return data?.data?.rows[selectedUser];
	}, [selectedUser, data]);
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

				{!isLoading && data && (
					<div>
						{data?.data?.rows?.length > 0 && (
							<>
								{data?.data?.rows.map((user: IUser, index: number) => (
									<User
										{...user}
										key={index}
										index={index}
										selectedUser={selectedUser}
										setSelectedUser={setSelectedUser}
										setShowAddOrEditUser={setShowAddOrEditUser}
										isLast={data?.data?.rows > 5 && index >= data?.data?.rows.length - 2}
									/>
								))}
							</>
						)}
						{data?.data?.rows?.length === 0 && <NoData />}
					</div>
				)}

				{isLoading && <PageLoading />}
			</div>

			{showAddOrEditUser && <AddOrEditUser setSelectedUser={setSelectedUser} userId={user?.id as string} setShowAddOrEditUser={setShowAddOrEditUser} />}
		</div>
	);
};

export default Users;
