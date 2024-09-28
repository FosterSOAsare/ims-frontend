import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

import Input from "@/components/Input";
import Button from "@/components/Button";

const page = () => {
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

				<form className="mt-4 overflow-y-hidden h-[calc(100vh-100px)]">
					<div className="h-[calc(100%-120px)] overflow-y-auto pb-12">
						<h3 className="text-3xl  font-bold">Get Started</h3>
						<p className="">Provide this information from your healthcare facility to get started.</p>
						<div className="">
							<Input label="Full name" name="name" placeholder="Eg. iamderez" />
							<Input label="Email" name="email" placeholder="Eg. iammensahmichael@gmail.com" />
							<Input label="Phone" name="phone" placeholder="0555534689" />

							<div className="w-full mb-4">
								<label htmlFor="">Facility</label>
								<select name="" id="" className="w-full p-2 border-[1px] rounded-[10px]">
									<option value="">Select option</option>
									<option value="">Facility 1</option>
									<option value="">Facility 2</option>
									<option value="">Facility 3</option>
								</select>
							</div>

							<div className="w-full mb-4">
								<label htmlFor="">Department</label>
								<select name="" id="" className="w-full p-2 border-[1px] rounded-[10px]">
									<option value="">Select option</option>
									<option value="">Department 1</option>
									<option value="">Department 2</option>
									<option value="">Department 3</option>
								</select>

								<div className="bg-warning-50 mt-2 rounded-[5px] p-2 flex items-center justify-start gap-2">
									<span className="w-8 h-8 ">
										<Icon icon="ph:warning-octagon-fill" className="text-warning-500 text-2xl" />
									</span>
									<p className="text-sm">Please ensure that your listed department is the correct one you are currently in</p>
								</div>
							</div>
							<div className="w-full mb-4">
								<label htmlFor="">Role</label>
								<select name="" id="" className="w-full p-2 border-[1px] rounded-[10px]">
									<option value="">Select option</option>
									<option value="">Role 1</option>
									<option value="">Role 2</option>
									<option value="">Role 3</option>
								</select>
							</div>

							<Input label="Password" type="password" name="password" placeholder="Enter password" />
						</div>
					</div>

					<div className="bg-bg py-2 border-t-[1px] h-[120px]">
						<Button text="Create account" />

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
