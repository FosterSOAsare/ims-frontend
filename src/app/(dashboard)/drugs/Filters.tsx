"use client";
import React, { useState } from "react";

import CustomSelect from "@/components/Select";

const sortOptions = [
	{ label: "A-Z", value: "a-z" },
	{ label: "Z-A", value: "z-a" },
];

const addedDateOptions = [
	{ label: "This week", value: "week" },
	{ label: "This month", value: "month" },
	{ label: "Past 3 months", value: "3_months" },
	{ label: "This year", value: "year" },
];
const stockAlertOptions = [
	{ label: "A-Z", value: "a-z" },
	{ label: "Z-A", value: "z-a" },
];

interface IFilter {
	sort: string;
	dateAdded: string;
	alert: string;
	categories: string[];
}

const Filters = ({ setShowFilters }: { setShowFilters: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const [filters, setFilters] = useState<IFilter>({ sort: "", dateAdded: "", alert: "", categories: [] });

	const toggleCategory = (category: string) => {
		setFilters((prev) => ({ ...prev, categories: prev.categories.includes(category) ? prev.categories.filter((cat) => cat !== category) : [...prev.categories, category] }));
	};
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<aside className="w-1/4 flex flex-col gap-4 h-[calc(100%-20px)] p-4 overflow-y-auto bg-white rounded-[5px]">
				<CustomSelect options={sortOptions} label="Sort By" placeholder="Select option" />
				<CustomSelect options={addedDateOptions} label="Date Added" placeholder="Select option" />
				<CustomSelect options={stockAlertOptions} label="Stock Alert" placeholder="Select option" />

				<div className="-mb-4">
					<p className="text-primary font-medium">Category</p>

					<div className="mt-2">
						{["Laxatives", "Corticosteroids", "Cytotoxics", "Diuretics", "Immunosuppressives", "Cough Suppressants", "Decongestants"].map((category, index) => (
							<button
								key={index}
								className={`${filters.categories.includes(category) ? "bg-sec text-white" : "bg-gray-100"} mb-2 text-sm font-light mr-2 inline-block py-1 px-2 rounded-full`}
								onClick={() => toggleCategory(category)}>
								{category}
							</button>
						))}
					</div>
				</div>
				<CustomSelect options={stockAlertOptions} label="Supplier" placeholder="Select option" />

				<div className="w-full  mt-auto flex gap-3 justify-between items-stretch">
					<button className="w-[30%] text-sm rounded-[10px]  py-2 bg-gray-100 hover:bg-gray-200" onClick={() => setShowFilters(false)}>
						Clear Filters
					</button>
					<button className="w-[65%] bg-sec py-2 rounded-[10px] text-white">Save</button>
				</div>
			</aside>
		</div>
	);
};

export default Filters;
