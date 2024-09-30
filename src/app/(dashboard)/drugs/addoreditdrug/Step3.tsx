import React, { Dispatch, SetStateAction, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { IDrugDetails } from ".";
import suppliers from "@/data/suppliers";

import CustomSelect from "@/components/Select";
import { toast } from "react-toastify";

const supplierOptions = suppliers.map((supplier) => supplier.name + " " + supplier.id);

const Step3 = ({ drugDetails, setValues, step, setStep }: { drugDetails: IDrugDetails; setValues: (data: any) => void; step: number; setStep: Dispatch<SetStateAction<number>> }) => {
	const [supplier, setStupplier] = useState(drugDetails.supplier);
	const step3Data = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!supplier) return toast.error("Please select a supplier", { autoClose: 1500 });
		setValues({ supplier });

		// Send request here
	};
	return (
		<form className="flex items-start flex-col h-full gap-2" onSubmit={step3Data}>
			<div className="px-4 h-[calc(100%-100px)] overflow-y-auto pb-12 w-full">
				<h3 className="mb-3 text-lg font-bold">Supplier details</h3>

				<CustomSelect options={supplierOptions} label="Supplier" placeholder="Select option" value={supplier} handleChange={(value) => setStupplier(value)} />

				{!supplier && (
					<div className="w-full bg-gray-100 h-[60vh] flex items-center flex-col justify-center mt-6 rounded-[10px]">
						<p className="text-sm">Select supplier to see their informations</p>
					</div>
				)}

				{supplier && (
					<div className="w-full bg-gray-100 h-auto p-4 mt-6 rounded-[10px]">
						<h3 className="text-2xl font-bold flex items-center gap-2">
							<Icon icon="solar:buildings-3-line-duotone" className="text-xl text-gray-400" />
							Earnest Chemist
						</h3>
						<h3 className="text-xl mt-4 font-bold">Supplier Details</h3>

						<div className="mt-4 w-full bg-[#F8F9FB] border-[1px] card p-4 rounded-[12px]">
							<h3 className="uppercase text-sm font-medium text-gray-400">Contact Person</h3>
							<div className="flex mt-2 gap-2 items-center justify-start">
								<p className="font-normal text-primary">Michael Mensah</p>
								<span className="px-2 py-[4px] rounded-full bg-[#D9FDFD] text-[#087878] text-sm">Sales Manager</span>
							</div>
						</div>

						<div className="mt-4 w-full bg-[#F8F9FB] border-[1px] card p-4 rounded-[12px]">
							<h3 className="uppercase text-sm font-medium text-gray-400">Contact</h3>
							<div className="flex mt-2 gap-2 items-center justify-start">
								<p className="text-primary font-medium flex items-center gap-2">
									<Icon icon="solar:outgoing-call-outline" className="text-xl" />
									+233 55677835
								</p>
							</div>
						</div>

						<div className="mt-4 w-full bg-[#F8F9FB] border-[1px] card p-4 rounded-[12px]">
							<h3 className="uppercase text-sm font-medium text-gray-400">TYPE</h3>
							<div className="flex mt-4 gap-2  items-center justify-start">
								<p className="p-1 px-3 rounded-full font-medium text-sm text-sec bg-blue-200 flex items-center gap-2">Pharmaceuticals and Medical Supplies</p>
							</div>
						</div>

						<div className="mt-4 w-full bg-[#F8F9FB] border-[1px] card p-4 rounded-[12px]">
							<h3 className="uppercase text-sm font-medium text-gray-400">General Info</h3>
							<div className="flex mt-4 gap-2 font-light items-center justify-start">
								Lorem ipsum dolor sit amet consectetur. Morbi amet ultrices a egestas lectus. Sed aliquet felis tellus gravida nibh risus amet a tincidunt. Amet ornare amet iaculis a
								habitant. Id amet arcu lobortis tempus eget pharetra maecenas.
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="w-full h-[90px] bg-white px-4 py-4 mt-auto gap-3">
				<div className="w-full mb-3 flex items-center justify-between gap-3">
					{[1, 2, 3].map((item) => (
						<div key={item} className={`w-full ${step >= item - 1 ? "bg-sec" : "bg-gray-100"} rounded-full h-2`}></div>
					))}
				</div>

				<div className="flex items-center justify-center gap-2">
					<button className="w-full hover:bg-gray-200 border-[1px] py-2 rounded-[10px]" onClick={() => setStep((prev) => --prev)}>
						Go back
					</button>

					<button className="w-full bg-sec py-2 border-[1px] hover:opacity-70 rounded-[10px] text-white" type="submit">
						Add drug
					</button>
				</div>
			</div>
		</form>
	);
};

export default Step3;
