import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "@/components/Input";
import React, { useState } from "react";

const sessions = [
	{ browser: "Chrome - Mac OS X", location: "Accra, GH", activity: "Current Session" },
	{ browser: "Chrome - Windows 11", location: "Accra, GH", activity: "Two weeks ago" },
	{ browser: "Edge - Windows 11", location: "Accra, GH", activity: "One month ago" },
];

const Security = () => {
	const [showEditPassword, setShowEditPassword] = useState(false);
	const [password, setPassword] = useState("");
	return (
		<div className="relative">
			<h3 className="text-xl font-bold">Security</h3>
			<p className="w-3/5">Manage your password and see the devices you are currently signed in </p>
			<div className="flex py-4 border-b-[1px] justify-between items-center gap-2">
				<div>
					<h3 className="text-lg flex items-center gap-1 font-bold">Password</h3>
					<p className="text-sm">Change your password</p>
				</div>

				{!showEditPassword && (
					<>
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
						<button className="border-[1px] rounded-[6px] px-3 py-2 hover:bg-slate-100" onClick={() => setShowEditPassword(true)}>
							<Icon icon="hugeicons:edit-01" className="inline mr-2" />
							Edit
						</button>
					</>
				)}

				{showEditPassword && (
					<div className="w-1/2">
						<Input value={password} setValue={(value) => setPassword(value)} name="password" type="password" placeholder="Enter new password" />
					</div>
				)}

				{showEditPassword && (
					<div className="absolute top-0 z-[8] flex gap-2 right-0">
						<button className="border-[1px] rounded-[8px] px-6 py-2 bg-[#FEF2F2] text-[#DC2626] hover:bg-[#DC2626] hover:text-white" onClick={() => setShowEditPassword(false)}>
							Discard
						</button>
						<button className="border-[1px] rounded-[8px] px-6 py-2 hover:opacity-80 bg-sec text-white">Save</button>
					</div>
				)}
			</div>
			{/* Current Sessions */}
			<div className="py-4">
				<div>
					<h3 className="text-lg flex items-center gap-1 font-bold">Current sessions</h3>
					<p className="text-sm">These devices are curently signed in to your account</p>
				</div>

				<div className="mt-4 grid-cols-12 bg-[#FAFAFA] border-[1px] uppercase rounded-[12px] grid px-3">
					<div className="col-span-4 text-sm text-gray-500 py-3">Browser</div>
					<div className="col-span-3 text-sm text-gray-500 py-3">Location</div>
					<div className="col-span-4 text-sm text-gray-500 py-3">Recent Activity</div>
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
