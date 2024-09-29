"use client";
import React, { useState } from "react";

import CustomSelect from "@/components/Select";
import { Icon } from "@iconify/react/dist/iconify.js";

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
	sort: { label: string; value: string };
	dateAdded: { label: string; value: string };
	alert: { label: string; value: string };
	categories: string[];
	supplier: { label: string; value: string };
}

const initial: IFilter = { sort: { label: "", value: "" }, dateAdded: { label: "", value: "" }, alert: { label: "", value: "" }, categories: [], supplier: { label: "", value: "" } };

const Filters = ({ setShowFilters }: { setShowFilters: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const [filters, setFilters] = useState<IFilter>(initial);

	const toggleCategory = (category: string) => {
		setFilters((prev) => ({ ...prev, categories: prev.categories.includes(category) ? prev.categories.filter((cat) => cat !== category) : [...prev.categories, category] }));
	};

	const setValue = (name: string, value: string) => {
		setFilters((prev) => ({ ...prev, [name]: value }));
	};
	return (
		<div className="h-screen bg-black bg-opacity-50 flex items-center justify-end px-3 w-full fixed top-0 left-0 z-[5]">
			<aside className="w-1/4 flex flex-col gap-4 h-[calc(100%-20px)] p-4 overflow-y-auto bg-white rounded-[5px]">
				<div className="flex items-center justify-between w-full">
					<h3 className="text-xl">Filters</h3>

					<button className="rounded-full bg-gray-100 p-[6px] hover:bg-gray-200" onClick={() => setShowFilters(false)}>
						<Icon icon="ic:round-close" className="text-xl" />
					</button>
				</div>
				<CustomSelect options={sortOptions} label="Sort By" placeholder="Select option" value={filters.sort} handleChange={(value) => setValue("sort", value)} />
				<CustomSelect options={addedDateOptions} label="Date Added" placeholder="Select option" value={filters.dateAdded} handleChange={(value) => setValue("dateAdded", value)} />
				<CustomSelect options={stockAlertOptions} label="Stock Alert" placeholder="Select option" value={filters.alert} handleChange={(value) => setValue("alert", value)} />

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
				<CustomSelect options={stockAlertOptions} label="Supplier" placeholder="Select option" value={filters.supplier} handleChange={(value) => setValue("supplier", value)} />

				<div className="w-full  mt-auto flex gap-3 justify-between items-stretch">
					<button className="w-[30%] text-sm rounded-[10px]  py-2 bg-gray-100 hover:bg-gray-200" onClick={() => setFilters(initial)}>
						Clear Filters
					</button>
					<button className="w-[65%] bg-sec py-2 rounded-[10px] text-white">Save</button>
				</div>
			</aside>
		</div>
	);
};

export default Filters;
