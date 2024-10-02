import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const sessions = [
	{ browser: "Chrome - Mac OS X", location: "Accra, GH", activity: "Current Session" },
	{ browser: "Chrome - Windows 11", location: "Accra, GH", activity: "Two weeks ago" },
	{ browser: "Edge - Windows 11", location: "Accra, GH", activity: "One month ago" },
];

const Security = () => {
	return (
		<div>
			<h3 className="text-xl font-bold">Security</h3>{" "}
			<div className="flex py-4 border-b-[1px] justify-between items-center gap-2">
				<div>
					<h3 className="text-lg flex items-center gap-1 font-bold">Password</h3>
					<p className="text-sm">Change your password</p>
				</div>

				<div className="flex items-center gap-3">
					<div className="flex gap-[4px] items-center">
						{Array.from({ length: 11 }, (_i, i) => i).map((_i, index) => (
							<span className="w-2 h-2 rounded-full bg-primary block"></span>
						))}
					</div>
					<div className="flex gap-[2px] items-center text-[#15803D]">
						<Icon icon="prime:check-circle" />
						Very secured
					</div>
				</div>
				<button className="border-[1px] rounded-[6px] px-3 py-2 hover:bg-slate-100">
					<Icon icon="hugeicons:edit-01" className="inline mr-2" />
					Edit
				</button>
			</div>
			{/* Current Sessions */}
			<div className="py-4">
				<div>
					<h3 className="text-lg flex items-center gap-1 font-bold">Current sessions</h3>
					<p className="text-sm">These devices are curently signed in to your account</p>
				</div>

				<div className="mt-4 grid-cols-12 bg-[#E2E8F0] uppercase rounded-[12px] grid px-3">
					<div className="col-span-4 text-sm text-gray-500 py-2">Browser</div>
					<div className="col-span-3 text-sm text-gray-500 py-2">Location</div>
					<div className="col-span-4 text-sm text-gray-500 py-2">Recent Activity</div>
					<div className="col-span-1"></div>
				</div>

				<div>
					{sessions.map(({ browser, activity, location }, index) => (
						<div className="mt-4 grid-cols-12 border-[1px] border-[#E2E8F0] rounded-[12px] grid px-3" key={index}>
							<div className="col-span-4 py-3">{browser}</div>
							<div className="col-span-3 py-3">{location}</div>
							<div className="col-span-4 py-3">{activity}</div>
							<div className="col-span-1 text-left flex items-center justify-end">
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

export default Security;
