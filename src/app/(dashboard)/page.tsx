import React from "react";

import Activities from "@/components/dashboard/Activities";
import DrugsAndSuppliers from "@/components/dashboard/DrugsAndSuppliers";
import StockLevels from "@/components/dashboard/StockLevels";

const page = () => {
	return (
		<div>
			<div>
				<h3 className="text-2xl font-bold">Welcome Michael</h3>
				<p className="flex items-center gap-2">
					Monday, May 20, 2024 <span className="w-6 h-6 bg-gray-200 rounded-full block"></span>
				</p>
			</div>

			<div className="w-full flex mt-4 gap-8 justify-between items-stretch">
				{/* Drugs stock level */}
				<StockLevels />

				{/* Total Drugs and suppliers */}
				<DrugsAndSuppliers />

				{/* Activities */}
				<Activities />
			</div>
		</div>
	);
};

export default page;
