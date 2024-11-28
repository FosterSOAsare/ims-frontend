import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useMemo, useState } from "react";
import AddOrEditDepartment from "./AddOrEditDepartment";

interface IDepartment {
	name: string;
	date: string;
	status: "active" | "deactivated";
	id: string;
}

const departments: IDepartment[] = [
	{ id: "1", name: "Trauma & Orthpaedics", date: "Jun 25, 24", status: "deactivated" },
	{ id: "2", name: "Surgical", date: "Jun 25, 24", status: "active" },
	{ id: "3", name: "Eyes", date: "Jun 25, 24", status: "active" },
	{ id: "4", name: "Obst& Gynae", date: "Jun 25, 24", status: "active" },
];

const Departments = () => {
	const [selectedDepartment, setSelectedDepartment] = useState<null | number>(null);
	const [showAddOrEditDepartment, setShowAddOrEditDepartment] = useState<boolean>(false);

	const department = useMemo(() => (selectedDepartment !== null ? departments[selectedDepartment] : ({} as IDepartment)), [selectedDepartment]);
	return (
		<div>
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-lg flex items-center gap-1 font-bold">Department</h3>
					<p className="text-sm">Create or delete department in your facility</p>
				</div>

				<button className="text-white bg-sec rounded-[6px] px-4 py-2 hover:opacity-70" onClick={() => setShowAddOrEditDepartment(true)}>
					Add department
				</button>
			</div>

			<div className="py-4">
				<div className="mt-4 grid-cols-12 uppercase border-[1px] bg-[#FAFAFA] rounded-[12px] grid py-2 px-3">
					<div className="col-span-5 text-gray-500 text-sm py-2"> Name</div>
					<div className="col-span-3 text-gray-500 text-sm py-2"> Date Created</div>
					<div className="col-span-2 text-gray-500 text-sm py-2"> Status</div>
					<div className="col-span-3"></div>
				</div>

				<div>
					{departments.map(({ name, date, status }: IDepartment, index) => (
						<div className="mt-4 grid-cols-12 border-[1px] border-[#E2E8F0] items-center rounded-[12px] grid px-3" key={index}>
							<div className="col-span-5 text-sm py-2">{name}</div>
							<div className="col-span-3 text-gray-500 text-sm py-2">{date}</div>
							<div className={`"col-span-2 text-gray-500 text-sm py-2`}>
								<div
									className={`${
										status.toLowerCase() === "deactivated" ? "text-red-500 bg-red-100" : "bg-green-100 text-green-500"
									} capitalize inline-flex rounded-full px-2 py-1 items-center gap-1 `}>
									<span className={`inline-block w-[6px] h-[6px] rounded-full ${status.toLowerCase() === "deactivated" ? " bg-red-500" : "bg-green-500"}`}></span>
									{status}
								</div>
							</div>

							{/* Actions */}
							<div className="col-span-3 text-primary py-3 gap-2 text-left flex items-center justify-end">
								<button className="p-2 rounded-full hover:bg-gray-200">
									<Icon icon="ph:trash" />
								</button>
								<button
									className="p-2 rounded-full hover:bg-red-500 hover:text-white"
									onClick={() => {
										setSelectedDepartment(index);
										setShowAddOrEditDepartment(true);
									}}>
									<Icon icon="lucide:edit-2" />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{showAddOrEditDepartment && (
				<AddOrEditDepartment
					setSelectedDepartment={setSelectedDepartment}
					departmentId={department?.id as string}
					departmentName={department?.name as string}
					setShowAddOrEditDepartment={setShowAddOrEditDepartment}
				/>
			)}
		</div>
	);
};

export default Departments;
