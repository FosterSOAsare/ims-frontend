import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useMemo, useState } from "react";
import AddOrEditDepartment from "./AddOrEditDepartment";
import { useDeleteADepartmentRequestMutation, useGetDepartmentsQuery } from "@/apis/departmentsApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import Loading, { PageLoading } from "@/components/Loading";
import { formatDate } from "@/utils/date";
import NoData from "@/components/NoData";
import { useFetchLoggedInUserRequestQuery } from "@/apis/authApi";
import userHasPermission from "@/utils/userHasPermission";

interface IDepartment {
	name: string;
	createdAt: Date;
	createdBy: { name: string };
	id: string;
}

const Departments = ({ setActiveTab }: { setActiveTab: React.Dispatch<React.SetStateAction<number>> }) => {
	const { data: user } = useFetchLoggedInUserRequestQuery();

	const [selectedDepartment, setSelectedDepartment] = useState<null | number>(null);
	const [showAddOrEditDepartment, setShowAddOrEditDepartment] = useState<boolean>(false);

	const { data, isLoading, error } = useGetDepartmentsQuery();
	const [deleteDepartmentRequest, { isLoading: deleting, error: deleteError }] = useDeleteADepartmentRequestMutation();

	// Redirect if user doesn't have permission to view
	useEffect(() => {
		if (!userHasPermission(user?.data?.permissions, "departments", "READ")) {
			// Return to general
			setActiveTab(0);
		}
	}, []);

	const department = useMemo(() => {
		if (!data || selectedDepartment === null) return {} as IDepartment;
		return data?.data?.rows[selectedDepartment];
	}, [selectedDepartment, data]);

	const deleteDepartment = (index: number) => {
		setSelectedDepartment(index);
		const d = data?.data?.rows[index];
		deleteDepartmentRequest({ departmentId: d.id });
	};

	useCreateErrorFromApiRequest(error);
	useCreateErrorFromApiRequest(deleteError);
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
				<div className="mt-4 grid-cols-12 uppercase border-[1px] gap-3 bg-[#FAFAFA] rounded-[12px] grid py-2 px-3">
					<div className="col-span-3 text-gray-500 text-sm py-2"> Name</div>
					<div className="col-span-5 text-gray-500 text-sm py-2"> Created By</div>
					<div className="col-span-2 text-gray-500 text-sm py-2"> Date Created</div>
					<div className="col-span-2"></div>
				</div>

				{!isLoading && data && (
					<div>
						{data?.data?.rows?.length > 0 && (
							<>
								{data.data.rows.map(({ name, createdAt, createdBy }: IDepartment, index: number) => (
									<div className="mt-4 grid-cols-12 border-[1px] border-[#E2E8F0] items-center rounded-[12px] gap-3 grid px-3" key={index}>
										<div className="col-span-3 line-clamp-1 text-[13px] py-2">{name}</div>
										<div className={`col-span-5 text-gray-500 text-[13px] py-2`}>{createdBy?.name}</div>
										<div className="col-span-2 text-gray-500 text-[13px] py-2">{formatDate(createdAt)}</div>

										{/* Actions */}
										<div className="col-span-2 text-primary py-3 gap-2 text-left flex items-center justify-end">
											<button disabled={deleting} className="p-2 rounded-full hover:bg-gray-200" onClick={() => deleteDepartment(index)}>
												{deleting && selectedDepartment === index ? <Loading sx="!w-5 !h-5 !border-sec" /> : <Icon icon="ph:trash" />}
											</button>
											<button
												disabled={deleting}
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
							</>
						)}

						{data?.data?.rows?.length === 0 && <NoData />}
					</div>
				)}

				{isLoading && <PageLoading />}
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
