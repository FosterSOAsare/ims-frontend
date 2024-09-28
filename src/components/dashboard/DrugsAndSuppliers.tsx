import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const DrugsAndSuppliers = () => {
	return (
		<section className="w-[30%] flex flex-col gap-4">
			{/* total Drugs */}
			<div className="h-1/2  w-full bg-white shadow-md card rounded-[10px] p-4">
				<h3 className="uppercase text-sm font-medium text-gray-400">Total Drugs</h3>
				<div className="">
					<div className="flex mt-2 gap-2 items-center justify-start">
						<h3 className="text-3xl font-bold">1200</h3>
						<div className={`${false ? "text-error-500 bg-error-50" : "bg-green-50 text-green-500"} gap-1 text-sm flex items-center justify-center px-1 py-[2px] -mt-2 rounded-[10px]`}>
							<span className={`${false ? "bg-red-600" : "bg-green-600"}  rounded-full text-white`}>
								<Icon icon={false ? "ph:arrow-down-right-bold" : "ph:arrow-up-right-bold"} />
							</span>
							6.25%
						</div>
					</div>
				</div>

				<div className="w-full h-20 bg-slate-200"></div>
			</div>
			<div className="h-1/2 w-full bg-white shadow-md card rounded-[10px] p-4">
				<h3 className="uppercase text-sm font-medium text-gray-400">Total Suppliers</h3>
				<div className="">
					<div className="flex mt-2 gap-2 items-center justify-start">
						<h3 className="text-3xl font-bold">05</h3>
						<div className={`${true ? "text-error-500 bg-error-50" : "bg-green-50 text-green-500"} gap-1 text-sm flex items-center justify-center px-1 py-[2px] -mt-2 rounded-[10px]`}>
							<span className={`${true ? "bg-red-600" : "bg-green-600"}  rounded-full text-white`}>
								<Icon icon={true ? "ph:arrow-down-right-bold" : "ph:arrow-up-right-bold"} />
							</span>
							1.25%
						</div>
					</div>
				</div>

				<div className="w-full h-20 bg-slate-200"></div>
			</div>
		</section>
	);
};

export default DrugsAndSuppliers;
