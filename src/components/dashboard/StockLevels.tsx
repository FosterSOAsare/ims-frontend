"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useState } from "react";

const StockLevels = () => {
	const [selectedStock, setSelectedStock] = useState("low");
	return (
		<section className="w-[35%] bg-white shadow-md card rounded-[10px] p-4">
			<h3 className="uppercase text-sm font-medium text-gray-400">Drug Stock Level</h3>
			<div className="">
				<div className="flex mt-2 gap-2 items-center justify-start">
					<div>
						<h3 className="text-5xl font-bold">450</h3>
						<p className="-mt-[3px] font-normal">Total Stock</p>
					</div>
					<div className={`${true ? "text-error-500 bg-error-50" : "bg-green-50 text-green-500"} gap-1 text-sm flex items-center justify-center px-1 py-[2px] -mt-2 rounded-[10px]`}>
						<span className={`${true ? "bg-red-600 rounded-full" : ""} text-white`}>
							<Icon icon={true ? "ph:arrow-down-right-bold" : "ph:arrow-up-right-bold"} />
						</span>
						1.25%
					</div>
				</div>
			</div>

			<div className="mt-4">
				<div className="w-full gap-[3px] h-4 flex rounded-[10px] overflow-hidden">
					<div className="h-full rounded-[5px] bg-[#0DCACA]" style={{ width: "70%" }}></div>
					<div className="h-full rounded-[5px] bg-[#E36D6A]" style={{ width: "20%" }}></div>
					<div className="h-full rounded-[5px] bg-[#E2E8F0]" style={{ width: "20%" }}></div>
				</div>

				<div className="flex mt-2 items-center justify-between">
					<div className="flex items-center justify-start gap-1">
						<span className="w-3 rounded-[5px] inline-block h-3 bg-[#0DCACA]"></span>
						<p className="text-sm">High stock</p>
					</div>
					<div className="flex items-center justify-start gap-1">
						<span className="w-3 rounded-[5px] inline-block h-3 bg-[#E36D6A]"></span>
						<p className="text-sm">Low stock</p>
					</div>
					<div className="flex items-center justify-start gap-1">
						<span className="w-3 rounded-[5px] inline-block h-3 bg-[#E2E8F0]"></span>
						<p className="text-sm">Out of stock</p>
					</div>
				</div>
			</div>

			{/* Low Stock and Out of stock */}
			<div className="mt-8">
				<div className="flex items-center justify-between">
					<div className="p-[3px] bg-gray-100 rounded-[10px]">
						<button
							onClick={() => setSelectedStock("low")}
							className={`px-2 py-1 rounded-[5px] text-sm ${selectedStock === "low" ? "bg-white selectedStocktext-primary" : "text-gray-400"}`}>
							Low stock
						</button>
						<button
							onClick={() => setSelectedStock("out")}
							className={`px-2 py-1 rounded-[5px] text-sm ${selectedStock === "out" ? "bg-white selectedStocktext-primary" : "text-gray-400"}`}>
							Out of stock
						</button>
					</div>
					<Link href="/stock" className="underline text-sm">
						See all
					</Link>
				</div>

				{/* List */}

				{[
					{ name: "Paracetamol 16mg", value: 16 },
					{ name: "Cough Mixture bottle", value: 48 },
					{ name: "Cough Mixture bottle", value: 48 },
				].map(({ name, value }, index) => (
					<div className="flex items-center justify-between my-3" key={index}>
						<div className="flex items-stretch justify-start gap-1">
							<span className={`w-2 rounded-[4px] ${selectedStock === "low" ? "bg-[#E36D6A]" : "bg-slate-300"} block`}></span>
							<p>{name}</p>
						</div>
						<p className="text-black font-medium">{selectedStock === "low" ? value : 0}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default StockLevels;
