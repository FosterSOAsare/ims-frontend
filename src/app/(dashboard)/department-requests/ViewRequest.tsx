import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

import { PageLoading } from "@/components/Loading";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import { useGetADepartmentRequestRequestQuery } from "@/apis/departmentRequestsApi";

export interface INewOrEditRequestDetails {
	item: string;
	quantity: string;
	additionalNotes: string;
}

interface IAddOrEditRequest {
	setShowViewRequest: React.Dispatch<React.SetStateAction<boolean>>;
	requestId: string;
	setSelectedRequest: React.Dispatch<React.SetStateAction<number | null>>;
}

const ViewRequestDetails = ({ setShowViewRequest, requestId, setSelectedRequest }: IAddOrEditRequest) => {
	const { data: request, isLoading: gettingRequest, error: requestError } = useGetADepartmentRequestRequestQuery({ requestId });
	useCreateErrorFromApiRequest(requestError);

	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<div className="w-[28%] flex flex-col gap-4 h-[calc(100%-20px)]  bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full px-4 pt-4">
					<h3 className="text-lg font-bold">Request Details</h3>
					<button
						type="button"
						className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200"
						onClick={() => {
							setShowViewRequest(false);
							setSelectedRequest(null);
						}}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>

				{!gettingRequest && request && (
					<>
						<div>
							<div className="px-4 space-y-4">
								<div>
									<p className="flex gap-2 items-center">
										<span className="font-bold text-black">Request Id:</span>
										<span>{request?.data?.id}</span>
									</p>
								</div>
								<div>
									<p className="flex gap-2 items-center">
										<span className="font-bold text-black">Item Name:</span>
										<span>{request?.data?.item?.name}</span>
									</p>
								</div>
								<div>
									<p className="flex gap-2 items-center">
										<span className="font-bold text-black">Quantity:</span>
										<span>{request?.data?.quantity}</span>
									</p>
								</div>
								<div>
									<p className="flex gap-2 items-center">
										<span className="font-bold text-black">Status:</span>
										<span
											className={`${
												request?.data?.status.toLowerCase() === "cancelled"
													? "text-red-500 bg-red-100"
													: request?.data?.status.toLowerCase() === "accepted"
													? "text-sec bg-blue-100"
													: request?.data?.status.toLowerCase() === "delivered"
													? "bg-green-100 text-green-500"
													: "bg-[#FFFAEB] text-[#B54708]"
											}`}>
											{request?.data?.status}
										</span>
									</p>
								</div>
								<div>
									<div>
										<span className="font-bold text-black">Additional Notes </span>
										<p>{request?.data?.additionalNotes}</p>
									</div>
								</div>
							</div>
						</div>
					</>
				)}

				{gettingRequest && <PageLoading />}
			</div>
		</div>
	);
};

export default ViewRequestDetails;
