import { useValidatePasswordResetCodeRequestMutation } from "@/apis/authApi";
import Button from "@/components/Button";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Otp = ({ setStep, email }: { setStep: React.Dispatch<React.SetStateAction<number>>; email: string }) => {
	const [otp, setOtp] = useState("");
	const inputRef = useRef<any>(null);
	const [validateCodeRequest, { data, isLoading, error }] = useValidatePasswordResetCodeRequestMutation();

	const validateCode = () => {
		if (!otp) return toast.error("Enter OTP code", { autoClose: 1500 });
		if (otp.length < 5) return toast.error("Provided code is less than 5 characters", { autoClose: 1500 });

		validateCodeRequest({ email, code: +otp });
	};

	useEffect(() => {
		if (!data) return;
		toast.success("Code was verifed successfully.Proceed to change password", { autoClose: 1500 });
		setStep((prev) => ++prev);
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<>
			<form className="mt-20">
				<div className="">
					<h3 className="text-3xl  font-bold">Enter verification code</h3>
					<p className="">
						A verification code has been sent to <span className="text-black font-medium">iammensah..@gmail.com</span>{" "}
					</p>
					<div className="mt-4">
						<label htmlFor="otp" className="flex items-center justify-between" onClick={() => inputRef?.current?.focus()}>
							{[1, 2, 3, 4, 5].map((item, index) => (
								<span
									key={index}
									className={`${
										otp.length > index ? "text-black border-sec" : "text-gray-400"
									} w-16 h-16 text-3xl rounded-[12px] bg-white  flex items-center justify-center border-[1px]`}>
									{otp[index] ? otp[index] : 0}
								</span>
							))}
						</label>
						<input type="number" autoFocus={true} value={otp} onChange={(e) => e.target.value?.length < 6 && setOtp(e.target.value)} id="otp" className="w-0 h-0" ref={inputRef} />

						<Button text="Verify Code" isLoading={isLoading} sx={`${otp.length < 5 && "opacity-60"} mt-12`} handleClick={validateCode} disabled={otp?.length < 5} />
						<Link href="/auth/login" className="text-center block hover:underline mt-8">
							Back to Login
						</Link>
					</div>
				</div>
			</form>
		</>
	);
};

export default Otp;
