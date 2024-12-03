import { IUser } from "@/app/(dashboard)/settings/UsersAndRoles";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface IUserCard extends IUser {
	isLast: boolean;
	selectedUser: number | null;
	setSelectedUser: React.Dispatch<React.SetStateAction<number | null>>;
	index: number;
	viewStockAdjustment?: () => void;
	setShowAddOrEditUser: React.Dispatch<React.SetStateAction<boolean>>;
}
const User = ({ fullName, role, selectedUser, index, isLast, setShowAddOrEditUser, setSelectedUser, status }: IUserCard) => {
	return (
		<div className="mt-4 grid-cols-12 border-[1px] border-[#E2E8F0] items-center rounded-[12px] grid px-3" key={index}>
			<div className="col-span-5 text-sm py-2">{fullName}</div>
			<div className="col-span-3 text-gray-500 text-sm py-2">{role}</div>
			<div className={`"col-span-2 text-gray-500 text-sm py-2`}>
				<div
					className={`${
						status.toLowerCase() === "deactivated" ? "text-red-500 bg-red-100" : status === "active" ? "bg-green-100 text-green-500" : "bg-[#FFFAEB] text-[#B54708]"
					} capitalize inline-flex rounded-full px-2 py-1 items-center gap-1 `}>
					<span
						className={`inline-block w-[6px] h-[6px] rounded-full ${
							status.toLowerCase() === "deactivated" ? " bg-red-500" : status == "active" ? " bg-green-500" : " bg-[#B54708]"
						}`}></span>
					{status}
				</div>
			</div>

			{/* Actions */}
			<div className="col-span-3 text-primary py-3 gap-2 text-left flex items-center justify-end">
				<div className="relative">
					{status !== "pending" && (
						<button className="rounded-full hover:bg-slate-200 p-1" onClick={() => setSelectedUser((prev: number | null) => (prev === index ? null : index))}>
							<Icon icon="bi:three-dots" />
						</button>
					)}
					{selectedUser === index && (
						<div className={`absolute ${isLast ? "bottom-[100%]" : "top-[100%]"}  right-0 h-auto w-[180px] bg-white selectedDrugOrder z-[3] rounded-[5px] card`}>
							<>
								<button
									className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-2"
									onClick={() => {
										setShowAddOrEditUser(true);
										setSelectedUser(index);
									}}>
									Change Role
								</button>
							</>
							{status?.toLowerCase() === "active" && (
								<button className="px-3 gap-[6px] hover:bg-red-500 flex hover:text-white items-center justify-start text-sm text-red-500 w-full py-2">Deactivate User</button>
							)}
							{status?.toLowerCase() === "deactivated" && (
								<button className="px-3 gap-[6px] hover:bg-green-500 flex hover:text-white items-center justify-start text-sm text-green-500 w-full py-2">Re-activate User</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default User;
