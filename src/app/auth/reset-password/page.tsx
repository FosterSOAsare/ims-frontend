"use client";
import React, { useState } from "react";
import Link from "next/link";

import Reset from "./Reset";
import Otp from "./OTP";
import SetPassword from "./SetPassword";

const page = () => {
	const [step, setStep] = useState(1);
	const [email, setEmail] = useState("");

	const steps = [<Reset key={0} setStep={setStep} setEmail={setEmail} />, <Otp key={1} setStep={setStep} email={email} />, <SetPassword key={2} email={email} />];
	return (
		<div className="w-full h-screen flex items-center justify-between overflow-hidden">
			<div className="w-2/5 p-4 flex flex-col  overflow-y-auto h-full px-12">
				<div className="w-full mb-6 flex items-center justify-between">
					<Link href="/" className="font-bold text-xl flex gap-2 items-center">
						Stealth <span className="uppercase text-xs font-normal bg-red-500 text-white py-[2px] px-2 rounded-full">Beta</span>
					</Link>
				</div>

				{steps[step]}
			</div>
			<div className="w-3/5 h-[calc(100%-20px)] shadow-md bg-white"> </div>
		</div>
	);
};

export default page;
