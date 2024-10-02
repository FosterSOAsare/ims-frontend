import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const departments = ["Child Health", "Central Lab", "Surgical", "Obst& Gynae"];

const Departments = () => {
	return (
		<div>
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-lg flex items-center gap-1 font-bold">Department</h3>
					<p className="text-sm">Create or delete department in your facility</p>
				</div>

				<button className="text-white bg-sec rounded-[6px] px-4 py-2 hover:opacity-70">Add department</button>
			</div>

			{/* Current Sessions */}
			<div className="py-4">
				<div>
					<h3 className="text-lg flex items-center gap-1 font-bold">Current sessions</h3>
					<p className="text-sm">These devices are curently signed in to your account</p>
				</div>

				<div className="mt-4 grid-cols-12 uppercase border-[1px] bg-[#FAFAFA] rounded-[12px] grid py-2 px-3">
					<div className="col-span-10 text-gray-500 text-sm py-2">Department name</div>

					<div className="col-span-2"></div>
				</div>

				<div>
					{departments.map((department, index) => (
						<div className="mt-4 grid-cols-12 border-[1px] border-[#E2E8F0] rounded-[12px] grid px-3" key={index}>
							<div className="col-span-10 py-3">{department}</div>

							<div className="col-span-2 text-left flex items-center justify-end">
								<button className="p-1 rounded-full hover:bg-slate-100">
									<Icon icon="mdi:dots-horizontal" className="text-xl " />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Departments;
