import Button from "@/components/Button";
import Input from "@/components/Input";
import React from "react";

const Reset = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) => {
	return (
		<>
			<form className="mt-20">
				<div className="">
					<h3 className="text-3xl  font-bold">Forgot password</h3>
					<p className="">Enter your email and a verification code will be sent to your mail</p>
					<div className="mt-4">
						<Input label="Email" name="email" placeholder="Eg. iammensahmichael@gmail.com" />

						<Button text="Continue" sx="mt-12" handleClick={() => setStep((prev) => ++prev)} />
					</div>
				</div>
			</form>
		</>
	);
};

export default Reset;
