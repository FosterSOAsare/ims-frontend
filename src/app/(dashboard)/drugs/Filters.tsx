"use client";
import React from "react";

import CustomSelect from "@/components/Select";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IFilter, initialFilter } from "./page";

const sortOptions = ["A-Z", "Z-A"];

const addedDateOptions = ["This week", "This month", "Past 3 months", "This year"];
const stockAlertOptions = ["A-Z", "Z-A"];

interface IFiltersComponent {
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
	filters: IFilter;
	setFilters: React.Dispatch<React.SetStateAction<IFilter>>;
}

const Filters = ({ setShowFilters, filters, setFilters }: IFiltersComponent) => {
	const toggleCategory = (category: string) => {
		setFilters((prev) => ({ ...prev, categories: prev.categories.includes(category) ? prev.categories.filter((cat) => cat !== category) : [...prev.categories, category] }));
	};

	const setValue = (name: string, value: string) => {
		setFilters((prev) => ({ ...prev, [name]: value }));
	};

	const filterDrugs = () => {
		console.log(filters);
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
					<button className="w-[30%] text-sm rounded-[10px]  py-2 bg-gray-100 hover:bg-gray-200" onClick={() => setFilters(initialFilter)}>
						Clear Filters
					</button>
					<button className="w-[65%] bg-sec py-2 rounded-[10px] text-white" onClick={filterDrugs}>
						Save
					</button>
				</div>
			</aside>
		</div>
	);
};

export default Filters;
