"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import General from "./General";
import Security from "./Security";

const tabs = [
	{
		name: "General",
		icon: "solar:user-plus-rounded-bold",
	},
	{
		name: "Security",
		icon: "solar:key-minimalistic-square-2-bold",
	},
	{
		name: "Manage Departments",
		icon: "solar:buildings-bold-duotone",
	},
	{
		name: "Manage Roles",
		icon: "solar:users-group-rounded-bold-duotone",
	},
	{
		name: "Notification",
		icon: "solar:bell-bing-bold",
	},
];

const page = () => {
	const [activeTab, setActiveTab] = useState(1);

	const pages = [<General key={0} />, <Security key={1} />];
	return (
		<div className="w-full h-full">
			<h3 className="text-2xl mb-3 font-bold">Settings</h3>
			<div className="flex items-start justify-between gap-8 ">
				<div className="w-1/4 h-[80vh] bg-white rounded-[12px] card p-4">
					{tabs.map(({ name, icon }, index) => (
						<button
							className={`${
								activeTab === index ? "bg-[#EBF2FF] text-primary" : "hover:bg-slate-200 text-[#64748B]"
							} rounded-[12px] gap-2 w-full flex text-sm items-center p-3 mb-2 justify-start `}
							key={index}
							onClick={() => setActiveTab(index)}>
							<Icon icon={icon} className={`${activeTab === index ? "text-sec" : "text-[#64748B]"} text-xl`} />
							{name}
						</button>
					))}
				</div>
				<div className="w-3/4 h-full rounded-[12px] bg-white card p-6">{pages[activeTab]}</div>
			</div>
		</div>
	);
};

export default page;
