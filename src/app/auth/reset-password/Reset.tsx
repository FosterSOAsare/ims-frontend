import Button from "@/components/Button";
import Input from "@/components/Input";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedvaluesFromHookForm";
import { resetPasswordSchema } from "@/libs/hookform";
import React from "react";

const Reset = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) => {
	const { register, handleSubmit } = useSelectedValuesFromHookForm(resetPasswordSchema);

	const findAccount = (data: any) => {
		console.log(data);
		setStep((prev) => ++prev);
	};
	return (
		<>
			<form className="mt-20" onSubmit={handleSubmit(findAccount)}>
				<div className="">
					<h3 className="text-3xl  font-bold">Forgot password</h3>
					<p className="">Enter your email and a verification code will be sent to your mail</p>
					<div className="mt-4">
						<Input label="Email" register={register} name="email" placeholder="Eg. iammensahmichael@gmail.com" />

						<Button text="Continue" type="submit" sx="mt-12" />
					</div>
				</div>
			</form>
		</>
	);
};

export default Reset;
