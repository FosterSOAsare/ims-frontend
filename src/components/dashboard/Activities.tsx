"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import padNumber from "@/services/padNumber";
import MonthPicker from "../MonthPicker";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Activities = () => {
	const [date, setDate] = useState(new Date());
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const [direction, setDirection] = useState("right");

	const lastDay = useMemo(() => {
		const currentMonth = date.getMonth() + 1;
		let newMonth = new Date(`${currentMonth + 1}-01-${date.getFullYear()}`);

		newMonth = new Date(newMonth.getTime() - 1);
		return newMonth.getDate();
	}, [date]);

	const setNextDate = () => {
		setDirection("right");
		setDate((prev) => new Date(`${prev.getMonth() + 1}-${prev.getDate() + 1}-${prev.getFullYear()}`));
	};

	const setPrevDate = () => {
		setDirection("left");
		setDate((prev) => new Date(`${prev.getMonth() + 1}-${prev.getDate() - 1}-${prev.getFullYear()}`));
	};

	const handleMonthChange = (month: number) => {
		setDate((prev) => new Date(`${month + 1}-${1}-${prev.getFullYear()}`));
	};

	// Scroll accordingly
	useEffect(() => {
		// if user is moving using next
		if (direction === "right" && (date.getDate() - 1) % 5 === 0) {
			if (scrollRef.current) scrollRef.current.style.marginLeft = `-${((date.getDate() - 1) / 5) * 100}%`;
		}

		// if user is moving with prev
		if (direction === "left" && date.getDate() % 5 === 0) {
			if (scrollRef.current) scrollRef.current.style.marginLeft = `-${((date.getDate() - 5) / 5) * 100}%`;
		}
	}, [date.getDate()]);

	// set the place of the user on start
	useEffect(() => {
		// get the date
		const side = Math.floor(date.getDate() / 5);
		if (scrollRef.current) scrollRef.current.style.marginLeft = `-${side * 100}%`;
	}, [scrollRef.current]);
	return (
		<section className="w-[35%] p-4 bg-white shadow-md card rounded-[10px]">
			<h3 className="uppercase text-sm font-medium text-gray-400">Activities</h3>

			<div className="w-full flex items-center justify-between">
				<div className="w-[100px] h-auto">
					<MonthPicker handleMonthChange={(month: number) => handleMonthChange(month)} />
				</div>
				<div className="flex items-center gap-1">
					<button
						className={`border-[1px] ${date.getDate() === 1 ? "bg-gray-200" : "hover:bg-sec hover:text-white bg-white"} rounded-[5px]  p-1`}
						disabled={date.getDate() === 1}
						onClick={setPrevDate}>
						<Icon icon="material-symbols:chevron-left" className="text-xl" />
					</button>
					<button
						className={`border-[1px] ${date.getDate() === lastDay ? "bg-gray-200" : "hover:bg-sec hover:text-white bg-white"} rounded-[5px] p-1`}
						disabled={date.getDate() === lastDay}
						onClick={setNextDate}>
						<Icon icon="material-symbols:chevron-right" className="text-xl" />
					</button>
				</div>
			</div>

			<div className="w-full mt-2  overflow-x-hidden">
				<div className={`${lastDay === 31 ? "w-[700%]" : "w-[600%]"}  days gap-2 flex items-center justify-between h-auto`} ref={scrollRef}>
					{Array.from({ length: lastDay === 31 ? 35 : 30 }, (_i, i) => i + 1).map((item, index) => (
						<button
							onClick={() => setDate((prev) => new Date(`${prev.getMonth() + 1}-${item}-${prev.getFullYear()}`))}
							className={`w-full flex text-sm rounded-[5px] flex-col  items-center ${date.getDate() === item ? "bg-sec text-white" : "bg-gray-200"} h-12 flex-col justify-center`}
							key={index}>
							{padNumber(item)}
							<span className="text-xs">{days[new Date(`${date.getMonth() + 1}-${item}-${date.getFullYear()}`).getDay()]}</span>
						</button>
					))}
				</div>
			</div>

			{/* activities */}
			<section className="mt-6 space-y-4">
				{[1, 2, 3].map(() => (
					<div className={"bg-[#F1F5F9] h-14 rounded-[12px]"}></div>
				))}
			</section>
		</section>
	);
};

export default Activities;
