import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

import { PageLoading } from "@/components/Loading";
import { useGetAnItemRequestRequestQuery } from "@/apis/itemRequestsApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import Button from "@/components/Button";

export interface INewOrEditRequestDetails {
	item: string;
	quantity: string;
	additionalNotes: string;
}

interface IAddOrEditRequest {
	setShowViewRequest: React.Dispatch<React.SetStateAction<boolean>>;
	requestId: string;
	setSelectedRequest: React.Dispatch<React.SetStateAction<number | null>>;
	setShowAddOrEditRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewRequestDetails = ({ setShowViewRequest, requestId, setSelectedRequest, setShowAddOrEditRequest }: IAddOrEditRequest) => {
	const { data: request, isLoading: gettingRequest, error: requestError } = useGetAnItemRequestRequestQuery({ requestId });
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
							<div className="px-4 space-y-2">
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
									<div>
										<span className="font-bold text-black">Additional Notes </span>
										<p>{request?.data?.additionalNotes}</p>
									</div>
								</div>
								<Button
									text="Edit Request"
									sx="!mt-24"
									handleClick={() => {
										setShowViewRequest(false);
										setShowAddOrEditRequest(true);
									}}
								/>
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
