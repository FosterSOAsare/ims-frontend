"use client";
import React, { ReactNode, Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

import { generalTabs, helpTabs } from "@/data/navLinks";

import Notification from "./Notification";

import ProfileImage from "@/assets/images/profile.svg";

const layout = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname();
	const [openedTab, setOpenedTab] = useState<null | number>(null);
	const [mode, setMode] = useState("light");
	const [showAccountPopup, setShowAccountPopup] = useState(false);
	const [showNotifications, setShowNotifications] = useState(false);

	// Open tab based on pathname
	useEffect(() => {
		if (["/drugs", "/categories", "/stock-adjustment"].includes(pathname)) setOpenedTab(1);
		if (["/drug-orders", "/suppliers"].includes(pathname)) setOpenedTab(2);
	}, [pathname]);

	return (
		<div className="flex bg-white items-stretch  justify-between h-screen overflow-hidden">
			<div className={`w-1/5 ${openedTab !== null ? "pb-12" : ""} h-full overflow-y-auto`}>
				<Link href="/" className="text-2xl px-4 py-2 bg-bg sticky top-0 left-0 z-[2] flex gap-2 items-center">
					Stealth<span className="uppercase text-xs font-normal bg-red-500 text-white py-[2px] px-2 rounded-full">Beta</span>
				</Link>

				<div className="px-4">
					<div className="mt-3 bg-gray-50 company p-2 shadow-md rounded-[6px] flex items-center gap-2">
						<Image src={ProfileImage} alt="Company Image" width={30} height={30} className="rounded-[10px]s" />
						<h3 className="text-sm font-bold">Madina Hospital - Admin</h3>
					</div>

					{/* Navigations */}
					<div className="mt-4 font-medium">
						{/* General */}
						<div className="w-full">
							<p className="text-sm">GENERAL</p>
							<nav className="mt-2">
								{generalTabs.map((tab, index) => (
									<Fragment key={index}>
										{!tab?.subs && (
											<Link
												className={`flex px-2 py-2 mb-1 font-medium rounded-[10px] items-center justify-start gap-2 ${
													(tab.link !== "/" && pathname.startsWith(tab.link)) || tab.link === pathname ? "text-primary bg-blue-100" : "text-gray-500 hover:bg-gray-100"
												} `}
												href={tab.link}>
												<span>
													<Icon icon={tab.icon} className={`text-xl ${pathname.startsWith(tab.link) ? "text-sec" : "text-gray-400"}`} />
												</span>
												{tab.name}
											</Link>
										)}

										{tab?.subs && (
											<div className={`${openedTab === index && "pb-2"} w-full mb-1 px-2  overflow-hidden rounded-[10px]`}>
												<button
													className={`flex w-full items-center justify-start py-2 gap-2  text-gray-500`}
													onClick={() => setOpenedTab((prev) => (prev === index ? null : index))}>
													<span>
														<Icon icon={tab.icon} className="text-xl text-gray-400" />
													</span>
													{tab.name}
													<span className="block ml-auto text-xl p-1 rounded-full hover:bg-gray-100">
														<Icon icon={`${openedTab === index ? "lucide:chevron-up" : "lucide:chevron-down"}`} />
													</span>
												</button>
												<div className={`ml-4 ${openedTab === index ? "h-auto" : "h-0"} transition-all duration-150`}>
													{tab.subs.map((sub, index) => (
														<Link
															className={`flex px-2 py-2 mb-1 rounded-[10px] items-center justify-start gap-2 ${
																pathname.startsWith(sub.link) ? "text-primary bg-blue-100" : "text-gray-500 hover:bg-gray-100"
															}`}
															href={sub.link}
															key={index}>
															<span>
																<Icon icon={sub.icon} className={`text-xl ${pathname.startsWith(sub.link) ? "text-sec" : "text-gray-400"}`} />
															</span>
															{sub.name}
														</Link>
													))}
												</div>
											</div>
										)}
									</Fragment>
								))}
							</nav>
						</div>

						{/* Help and support */}

						<div className="w-full mt-6">
							<p className="text-sm uppercase">Help & Support</p>
							<nav className="mt-2">
								{helpTabs.map((tab, index) => (
									<Link
										key={index}
										className={`flex px-2 py-2 mb-1 font-medium rounded-[10px] items-center justify-start gap-2 ${
											(tab.link !== "/" && pathname.startsWith(tab.link)) || tab.link === pathname ? "text-primary bg-blue-100" : "text-gray-500 hover:bg-gray-100"
										} `}
										href={tab.link}>
										<span>
											<Icon icon={tab.icon} className={`text-xl ${pathname.startsWith(tab.link) ? "text-sec" : "text-gray-400"}`} />
										</span>
										{tab.name}
									</Link>
								))}
							</nav>
						</div>
					</div>

					{/* Mode */}
					<div className="inline-flex mt-2 items-center gap-1 justify-between p-1 bg-[#F2F2F2] shadow-md overflow-hidden rounded-full">
						<button onClick={() => setMode("light")} className={`w-8 h-8 ${mode === "light" ? "bg-white" : "hover:bg-white"} rounded-full flex items-center justify-center`}>
							<Icon icon="solar:sun-linear" />
						</button>
						<button onClick={() => setMode("dark")} className={`w-8 h-8 ${mode === "dark" ? "bg-white" : "hover:bg-white"} rounded-full flex items-center justify-center`}>
							<Icon icon="solar:moon-stars-outline" />
						</button>
					</div>

					<div className="mt-4">
						<h3 className="text-gray-400 text-2xl font-bold">Stealth</h3>
						<p className="text-sm">Stealth 2024 - All rights reserved </p>
					</div>
				</div>
			</div>
			<div className="w-4/5 ml-5 pl-5 pb-12 h-screen overflow-y-auto">
				<div className="w-full h-20 bg-bg stickty top-0 z-[5] left-0 flex items-center justify-between">
					<div className="w-2/5 relative">
						<span className="absolute left-3 top-0 bottom-0 flex items-center justify-center">
							<Icon icon="iconoir:search" className="text-xl text-gray-400" />
						</span>
						<input type="text" className="bg-gray-300 w-full p-2 focus:border-[2px] rounded-[10px] pl-10" placeholder="Search" />
					</div>
					<div className="flex items-center gap-8 justify-between pr-4">
						<Link href="/" className="flex items-center gap-3 px-4 text-warning-600 rounded-[8px] hover:bg-warning-600 hover:text-white py-2 bg-warning-300 ">
							Report an incident
							<span className="">
								<Icon icon="ph:headset-bold" />
							</span>
						</Link>
						<div className="relative">
							<button className="bg-gray-100 rounded-full hover:text-white hover:bg-gray-400 p-2" onClick={() => setShowNotifications((prev) => !prev)}>
								<Icon icon="ph:bell" className="text-2xl" />
							</button>
							{showNotifications && (
								<div className={`absolute top-[100%] right-2 h-auto w-[470px] bg-white selectedStock z-[3] rounded-[12px] card`}>
									<Notification />
								</div>
							)}
						</div>
						<div className="flex gap-2 relative items-center justify-between">
							<div className="flex gap-2 relative items-center justify-between">
								<span className="rounded-full">
									<Image src={ProfileImage} alt="Profile Image" width={35} height={35} />
								</span>
								<p className="text-primary font-medium"> Michael Mensah</p>
								<button className="p-1 hover:bg-gray-200 rounded-full" onClick={() => setShowAccountPopup((prev) => !prev)}>
									<Icon icon="mdi-light:dots-vertical" className="text-2xl" />
								</button>
							</div>

							{showAccountPopup && (
								<div className={`absolute top-[100%] right-2 h-auto w-[200px] bg-white selectedStock z-[3] rounded-[12px] card`}>
									<Link href="/settings" className="px-3 gap-[6px] hover:bg-gray-100 flex items-center justify-start text-sm w-full py-3">
										<Icon icon="solar:settings-minimalistic-linear" className="text-lg" />
										Settings
									</Link>
									<button className="px-3 gap-[6px] hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-start text-sm w-full py-3">
										<Icon icon="solar:logout-2-outline" className="text-lg" />
										Logout
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="bg-gray-700 border-[1px] border-[#E2EBF3] p-4 mt-2 rounded-[10px] w-full min-h-[80vh]">{children}</div>
			</div>
		</div>
	);
};

export default layout;
