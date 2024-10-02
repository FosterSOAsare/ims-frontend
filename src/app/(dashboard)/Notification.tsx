import Link from "next/link";
import React from "react";

const notifications = [
	{
		text: "Paracetamol is almost out of stock. 56 pieces left",
		time: "Now",
		status: "unread",
	},
	{
		text: "Paracetamol has been restocked",
		time: "5 mins ago",
		status: "read",
	},
	{
		text: "Peniciline is out of stock. Restock now",
		time: "An hour ago",
		status: "unread",
	},
];

const Notification = () => {
	return (
		<div className="py-4">
			<h3 className="text-xl font-bold px-4">Notification</h3>
			<div className="flex items-center py-2 px-4 border-b-[1px] justify-between">
				<p className="text-black flex items-center gap-2 font-medium">
					All <span className="text-xs py-1 bg-[#F0FAF6] rounded-full px-2">2</span>
				</p>
				<div className="flex gap-4 items-center">
					<button className="underline">Mark all as read</button>
					<Link href="/" className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-[5px]">
						View all
					</Link>
				</div>
			</div>

			<div>
				{notifications.map(({ status, time, text }, index) => (
					<div key={index} className={`${status == "unread" ? "bg-[#F6F7FE]" : "bg-white"} flex items-start p-4 justify-start gap-3`}>
						<div className="w-12 h-12 bg-white relative rounded-full">
							{status === "unread" && <span className="bg-[#F59E0B] w-3 h-3 rounded-full absolute top-[2px] left-[2px]"></span>}
						</div>
						<div className="flex-1">
							<p className="text-primary text-sm">{text}</p>
							<p className="text-xs">{time}</p>

							{status === "unread" && <button className="bg-sec text-sm font-light rounded-[6px] text-white px-2 py-1 mt-2">Restock</button>}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Notification;
