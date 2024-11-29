import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useMemo, useState } from "react";

const notificationsTypes: { key: "requests" | "stockOut" | "lowStocks"; heading: string; desc: string }[] = [
	{
		key: "requests",
		heading: "Department Requests",
		desc: "Stay informed about department requests",
	},
	{
		key: "lowStocks",
		heading: "Low Stocks",
		desc: "Stay informed about items low on stock",
	},
	{
		key: "stockOut",
		heading: "Items out of stocks",
		desc: "Stay informed about items out of stock",
	},
];
const Notifications = () => {
	const [emailNotifications, setEmailNotifications] = useState({
		requests: false,
		lowStocks: true,
		stockOut: true,
	});
	const [smsNotifications, setSMSNotifications] = useState({
		requests: true,
		lowStocks: true,
		stockOut: true,
	});

	const allEmailNotifs = useMemo(() => {
		return emailNotifications.requests && emailNotifications.stockOut && emailNotifications.lowStocks;
	}, [emailNotifications]);

	const allSmsNotifs = useMemo(() => {
		return smsNotifications.requests && smsNotifications.stockOut && smsNotifications.lowStocks;
	}, [smsNotifications]);

	const handleChange = (type: "email" | "sms", property: "requests" | "stockOut" | "lowStocks", value: boolean) => {
		type === "email" ? setEmailNotifications((prev) => ({ ...prev, [property]: value })) : setSMSNotifications((prev) => ({ ...prev, [property]: value }));
	};
	return (
		<div>
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-xl flex items-center gap-1 font-bold">Notification</h3>
					<p className="text-sm">Manage your notification settings</p>
				</div>
			</div>

			{/* Email Notifications */}
			<div className="w-full flex items-stretch justify-between mt-6 gap-8">
				<div className="w-1/2">
					<h3 className="text-md flex items-center gap-1 font-bold">Email Notifications</h3>
					<p className="text-sm">Manage your preferences anytime to tailor your email experience."</p>
				</div>

				<div className="w-1/2">
					<div className="flex gap-2 items-center ">
						<div className={`w-12 ${allEmailNotifs ? "bg-sec" : "bg-slate-300"} h-6 relative rounded-full p-[2px]`}>
							<button
								className="w-[20px] h-full rounded-full transition-all duration-300 relative bg-white"
								style={{ left: !allEmailNotifs ? "0px" : "24px" }}
								onClick={() =>
									setEmailNotifications(() => (allEmailNotifs ? { requests: false, lowStocks: false, stockOut: false } : { requests: true, lowStocks: true, stockOut: true }))
								}></button>
						</div>
						<p className="font-bold">{allEmailNotifs ? "On" : "Off"}</p>
					</div>

					{notificationsTypes.map(({ key, heading, desc }: { key: "requests" | "stockOut" | "lowStocks"; heading: string; desc: string }, index: number) => (
						<div className="flex mt-6 items-start gap-4" key={index}>
							<div className="">
								<button
									id="email-request"
									onClick={() => handleChange("email", key, !emailNotifications[key])}
									className={`${emailNotifications[key] ? "bg-sec" : "border-[1px]"} w-6 h-6 rounded-[5px] flex items-center justify-center`}>
									{emailNotifications[key] && <Icon icon="ic:round-check" className="text-white" />}
								</button>
							</div>
							<div className="w-[calc(100%-24px)]">
								<h3 className="mb-[2px] text-xl -mt-[5px]">{heading}</h3>
								<p className="w-4/5">{desc}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* SMS Notifications */}
			<div className="w-full flex items-stretch justify-between mt-10 gap-8">
				<div className="w-1/2">
					<h3 className="text-md flex items-center gap-1 font-bold">SMS Notifications</h3>
					<p className="text-sm">Manage your preferences anytime to tailor your sms experience."</p>
				</div>

				<div className="w-1/2">
					<div className="flex gap-2 items-center ">
						<div className={`w-12 ${allSmsNotifs ? "bg-sec" : "bg-slate-300"} h-6 relative rounded-full p-[2px]`}>
							<button
								className="w-[20px] h-full rounded-full transition-all duration-300 relative bg-white"
								style={{ left: !allSmsNotifs ? "0px" : "24px" }}
								onClick={() =>
									setSMSNotifications(() => (allSmsNotifs ? { requests: false, lowStocks: false, stockOut: false } : { requests: true, lowStocks: true, stockOut: true }))
								}></button>
						</div>
						<p className="font-bold">{allSmsNotifs ? "On" : "Off"}</p>
					</div>

					{notificationsTypes.map(({ key, heading, desc }: { key: "requests" | "stockOut" | "lowStocks"; heading: string; desc: string }, index: number) => (
						<div className="flex mt-6 items-start gap-4" key={index}>
							<div className="">
								<button
									id="email-request"
									onClick={() => handleChange("sms", key, !smsNotifications[key])}
									className={`${smsNotifications[key] ? "bg-sec" : "border-[1px]"} w-6 h-6 rounded-[5px] flex items-center justify-center`}>
									{smsNotifications[key] && <Icon icon="ic:round-check" className="text-white" />}
								</button>
							</div>
							<div className="w-[calc(100%-24px)]">
								<h3 className="mb-[2px] text-xl -mt-[5px]">{heading}</h3>
								<p className="w-4/5">{desc}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Notifications;
