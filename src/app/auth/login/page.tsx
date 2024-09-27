import React from "react";
import Link from "next/link";

import Input from "@/components/Input";
import Button from "@/components/Button";

const page = () => {
	return (
		<div className="w-full h-screen flex items-center justify-between overflow-hidden">
			<div className="w-2/5 p-4 overflow-y-auto h-full px-12">
				<div className="w-full mb-6 flex items-center justify-between">
					<h3 className="font-bold text-xl flex gap-2 items-center">
						IMS <span className="uppercase text-xs font-normal bg-red-500 text-white py-[2px] px-2 rounded-full">Beta</span>
					</h3>
					<Link href="/auth/sign-up" className="text-black font-medium bg-gray-100 px-4 rounded-[5px] p-2 hover:bg-gray-400">
						Create Account
					</Link>
				</div>

				<form className="mt-6">
					<div className="h-[calc(100%-120px)] overflow-y-auto pb-12">
						<h3 className="text-3xl  font-bold">Welcome back</h3>
						<p className="">Provide this information from your healthcare facility to get started.</p>
						<div className="mt-4">
							<Input label="Email" name="email" placeholder="Eg. iammensahmichael@gmail.com" />

							<Input label="Password" type="password" name="password" placeholder="Enter password" />
							<Button text="Log in" sx="mt-12" />
							<div className="flex items-center mt-2 justify-center">
								<Link className="underline" href={"/"}>
									Forgot password
								</Link>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div className="w-3/5 h-[calc(100%-20px)] shadow-md bg-white"> </div>
		</div>
	);
};

export default page;
