"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

import Input from "@/components/Input";
import Button from "@/components/Button";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { registerSchema } from "@/libs/hookform";
import CustomSelect from "@/components/Select";
import { toast } from "react-toastify";

const facilitiesOptions = [
	{ value: "1", label: "Facility 1" },
	{ value: "2", label: "Facility 2" },
	{ value: "3", label: "Facility 3" },
];

const departmentOptions = [
	{ value: "1", label: "Department 1" },
	{ value: "2", label: "Department 2" },
	{ value: "3", label: "Department 3" },
];

const roleOptions = [
	{ value: "1", label: "Role 1" },
	{ value: "2", label: "Role 2" },
	{ value: "3", label: "Role 3" },
];

const page = () => {
	const { register, handleSubmit } = useSelectedValuesFromHookForm(registerSchema);

	const [facility, setFacility] = useState({ value: "", label: "" });
	const [department, setDepartment] = useState({ value: "", label: "" });
	const [role, setRole] = useState({ value: "", label: "" });

	const registerUser = (data: any) => {
		// Check for the selects
		if (!facility.value) return toast.error("Please select your facility", { autoClose: 1500 });
		if (!department.value) return toast.error("Please select your department", { autoClose: 1500 });
		if (!role.value) return toast.error("Please select your role", { autoClose: 1500 });

		// Continue
		// Create data
		const allData = { ...data, facility: facility.value, role: role.value, department: department.value };
		console.log(allData);
	};
	return (
		<div className="w-full h-screen flex items-center justify-between overflow-hidden">
			<div className="w-2/5 p-4 overflow-y-auto h-full px-12">
				<div className="w-full mb-6 flex items-center justify-between">
					<Link href="/" className="font-bold text-xl flex gap-2 items-center">
						Stealth <span className="uppercase text-xs font-normal bg-red-500 text-white py-[2px] px-2 rounded-full">Beta</span>
					</Link>
					<Link href="/auth/login" className="text-black font-medium bg-gray-100 px-4 rounded-[5px] p-2 hover:bg-gray-400">
						Login
					</Link>
				</div>

				<form className="mt-4 overflow-y-hidden h-[calc(100vh-100px)]" onSubmit={handleSubmit(registerUser)}>
					<div className="h-[calc(100%-120px)] overflow-y-auto pb-12">
						<h3 className="text-3xl  font-bold">Get Started</h3>
						<p className="">Provide this information from your healthcare facility to get started.</p>
						<div className="space-y-4">
							<Input register={register} label="Full name" name="name" placeholder="Eg. iamderez" />
							<Input register={register} label="Email" name="email" placeholder="Eg. iammensahmichael@gmail.com" />
							<Input register={register} label="Phone" name="phone" placeholder="0555534689" />

							<CustomSelect label="Facility" options={facilitiesOptions} value={facility} handleChange={(selected) => setFacility(selected)} />
							<div className="w-full">
								<CustomSelect label="Department" options={departmentOptions} value={department} handleChange={(selected) => setDepartment(selected)} />

								<div className="bg-warning-50 mt-2 rounded-[5px] p-2 flex items-center justify-start gap-2">
									<span className="w-8 h-8 ">
										<Icon icon="ph:warning-octagon-fill" className="text-warning-500 text-2xl" />
									</span>
									<p className="text-sm">Please ensure that your listed department is the correct one you are currently in</p>
								</div>
							</div>

							<CustomSelect label="Role" options={roleOptions} value={role} handleChange={(selected) => setRole(selected)} />
							<Input label="Password" register={register} type="password" name="password" placeholder="Enter password" />
						</div>
					</div>

					<div className="bg-bg py-2 border-t-[1px] h-[120px]">
						<Button text="Create account" type="submit" />

						<p className="mt-3 text-sm">
							By creating an account, you agree to Stealth{" "}
							<Link href="" className="text-black font-normal hover:underline">
								Terms of Service
							</Link>{" "}
							&{" "}
							<Link href="" className="text-black font-normal hover:underline">
								{" "}
								Privacy Policy
							</Link>
						</p>
					</div>
				</form>
			</div>
			<div className="w-3/5 h-[calc(100%-20px)] shadow-md bg-white"> </div>
		</div>
	);
};

export default page;
