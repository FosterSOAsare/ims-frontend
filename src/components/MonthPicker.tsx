import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const MonthPicker = ({ handleMonthChange }: { handleMonthChange: (month: number) => void }) => {
	const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		handleMonthChange(activeMonth);
	}, [activeMonth]);
	return (
		<div className="flex items-center relative">
			<button className="w-auto flex gap-1 items-center justify-between p-2 bg-[#F1F5F9] rounded-full" onClick={() => setShowPopup(true)}>
				<div className="relative">
					<Icon icon="solar:calendar-minimalistic-linear" className="text-lgl" />
				</div>
				<span className="text-sm">{months[activeMonth]}</span>
				<Icon icon={!showPopup ? "tabler:chevron-down" : "tabler:chevron-up"} className="inline text-xl ml-2" />
			</button>
			{showPopup && (
				<div className="w-[200px] bg-white card absolute top-[110%] left-0 h-[200px] overflow-y-auto">
					{months.map((month, index) => (
						<button
							onClick={() => {
								setActiveMonth(index);
								setShowPopup(false);
							}}
							className="hover:bg-slate-100 flex items-center justify-start w-full px-2 py-1 text-sm">
							{month}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default MonthPicker;
