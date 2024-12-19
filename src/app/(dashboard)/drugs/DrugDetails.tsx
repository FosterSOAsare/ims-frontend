"use client";
import React, { useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import DrugDetailsChart from "./DrugDetailsChart";
import { useGetADrugRequestQuery } from "@/apis/drugsApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import { PageLoading } from "@/components/Loading";

const durations = ["1W", "1M", "3M", "1Y", "All"];

const DrugDetails = ({ setShowDrugDetails, drugId }: { setShowDrugDetails: React.Dispatch<React.SetStateAction<boolean>>; drugId: string }) => {
	const [graphDuration, setGraphDuration] = useState(0);

	// Get drug details
	const { data: drugDetails, error, isLoading } = useGetADrugRequestQuery({ drugId });

	const details = [
		{ name: "Price", value: "$23,000" },
		{ name: "Dosage Form", value: "Solids" },
		{ name: "Drug code", value: "MED-PH-7890" },
		{ name: "Validity", value: "Expires 31st December, 2024" },
		{ name: "ISO 9001", value: "Quality Management Certified" },
		{ name: "FDA Approval", value: "FDA-GH-2023-7890" },
	];

	console.log(drugDetails);
	useCreateErrorFromApiRequest(error);
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<aside className="w-[32%] flex flex-col gap-4 h-[calc(100%-20px)] p-4 overflow-y-auto bg-white rounded-[5px]">
				<div className="flex items-center justify-end w-full">
					<button className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200" onClick={() => setShowDrugDetails(false)}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>
				{!isLoading && drugDetails && (
					<>
						<div className="flex items-center gap-1 justify-start">
							<span>
								<Icon icon="solar:jar-of-pills-bold-duotone" className="text-gray-400 text-xl" />
							</span>
							<h3 className="text-xl font-bold text-primary">{drugDetails?.data?.name}</h3>
							<p className="text-[13px] bg-warning-50 px-2 py-1 rounded-[10px] font-bold text-warning-700 ">Expiration : 23-09-24</p>
						</div>

						<div className="flex items-stretch gap-2 justify-between">
							<div className="w-1/2 bg-gray-100 rounded-[12px] p-4">
								<h3 className="uppercase text-sm font-medium text-gray-500">Stock Level</h3>

								<div className="flex mt-4 justify-start gap-2 items-center">
									<h3 className="text-xl font-bold ">25,000</h3>
									<span
										className={`rounded-full px-2 py-1 ${
											drugDetails?.data?.status !== "STOCKED" ? "text-red-500 bg-red-100" : true ? "bg-[#D9FDFD] text-[#087878]" : "bg-gray-100 text-[#344054]"
										} text-xs`}>
										{drugDetails?.data?.status === "STOCKED" ? "In Stocked" : "Out Of Stock"}
									</span>
								</div>
							</div>
							<div className="w-1/2 bg-gray-100 rounded-[12px] p-4">
								<h3 className="uppercase text-sm font-medium text-gray-500">Supplier</h3>

								<div className="flex mt-4 justify-start gap-2 items-center">
									<span>
										<Icon icon="solar:buildings-3-line-duotone" className="text-primary text-xl" />
									</span>
									<h3 className="font-bold">Barone LLC.</h3>
								</div>
							</div>
						</div>

						<div className="mt-4">
							<h3 className="uppercase text-sm font-medium text-gray-500">Consumption</h3>
							<div className="inline-flex mt-2 items-center gap-1 justify-between p-1 bg-[#F2F4F8] shadow-md w-[200px] overflow-hidden rounded-full">
								{durations.map((duration, index) => (
									<button
										onClick={() => setGraphDuration(index)}
										className={`text-sm w-10 h-8 ${graphDuration === index ? "bg-white" : "hover:bg-white"} rounded-full flex items-center justify-center`}>
										{duration}
									</button>
								))}
							</div>

							<DrugDetailsChart />
						</div>
						<div className="mt-4 mb-12">
							<h3 className="text-lg mb-4 font-medium text-black">Additional Information</h3>

							<div className="bg-gray-100 py-6 px-4 flex flex-col">
								<button className="text-sm mb-2 inline-block ml-auto underline">Hide</button>
								{details.map(({ name, value }, index) => (
									<p className="w-full text-sm mb-2" key={index}>
										{name}: <span className="text-primary font-medium"> {value}</span>
									</p>
								))}
							</div>
						</div>

						<div className="w-full  mt-auto">
							<button className="w-full bg-sec py-2 rounded-[10px] text-white">Restock</button>
						</div>
					</>
				)}

				{isLoading && <PageLoading />}
			</aside>
		</div>
	);
};

export default DrugDetails;
