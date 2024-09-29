"use client";
import React from "react";
import Link from "next/link";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedvaluesFromHookForm";
import { loginSchema } from "@/libs/hookform";

import Button from "@/components/Button";
import Input from "@/components/Input";

const page = () => {
	const { register, handleSubmit } = useSelectedValuesFromHookForm(loginSchema);
	const loginUser = (data: any) => {
		console.log(data);
	};

	return (
		<div className="w-full h-screen flex items-center justify-between overflow-hidden">
			<div className="w-2/5 p-4 flex flex-col  overflow-y-auto h-full px-12">
				<div className="w-full mb-6 flex items-center justify-between">
					<Link href="/" className="font-bold text-xl flex gap-2 items-center">
						Stealth <span className="uppercase text-xs font-normal bg-red-500 text-white py-[2px] px-2 rounded-full">Beta</span>
					</Link>
					<Link href="/auth/sign-up" className="text-black font-medium bg-gray-100 px-4 rounded-[5px] p-2 hover:bg-gray-400">
						Create Account
					</Link>
				</div>

				<form className="my-auto" onClick={handleSubmit(loginUser)}>
					<div className="">
						<h3 className="text-3xl  font-bold">Welcome back</h3>
						<p className="">Provide this information from your healthcare facility to get started.</p>
						<div className="mt-4 ">
							<div className="space-y-4">
								<Input label="Email" name="email" register={register} placeholder="Eg. iammensahmichael@gmail.com" />

								<Input label="Password" type="password" register={register} name="password" placeholder="Enter password" />
							</div>
							<Button type="submit" text="Log in" sx="mt-12" />
							<div className="flex items-center mt-2 justify-center">
								<Link className="underline" href={"/auth/reset-password"}>
									Forgot password
								</Link>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div className="w-3/5 h-[calc(100%-20px)] shadow-md bg-white"></div>
		</div>
	);
};

export default page;
