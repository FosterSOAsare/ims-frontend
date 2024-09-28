import Button from "@/components/Button";
import React, { useRef, useState } from "react";

const Otp = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) => {
	const [otp, setOtp] = useState("");
	const inputRef = useRef<any>(null);
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
									className={`${otp.length > index ? "text-black " : "text-gray-400"} w-16 h-16 text-3xl rounded-[12px] bg-white  flex items-center justify-center border-[1px]`}>
									{otp[index] ? otp[index] : 0}
								</span>
							))}
						</label>
						<input type="number" autoFocus={true} value={otp} onChange={(e) => e.target.value?.length < 6 && setOtp(e.target.value)} id="otp" className="w-0 h-0" ref={inputRef} />

						<Button text="Verify Code" sx={`${otp.length < 5 && "opacity-60"} mt-12`} handleClick={() => setStep((prev) => ++prev)} disabled={otp?.length < 5} />
						<p className="text-center mt-3">
							Resend code in <span>1:00</span>
						</p>
					</div>
				</div>
			</form>
		</>
	);
};

export default Otp;
