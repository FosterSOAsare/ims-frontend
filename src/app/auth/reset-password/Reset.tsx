import React, { useEffect } from "react";

import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { resetPasswordSchema } from "@/libs/hookform";
import { useRequestPasswordResetRequestMutation } from "@/apis/authApi";

import Button from "@/components/Button";
import Input from "@/components/Input";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import { toast } from "react-toastify";

const Reset = ({ setStep, setEmail }: { setStep: React.Dispatch<React.SetStateAction<number>>; setEmail: React.Dispatch<React.SetStateAction<string>> }) => {
	const { register, handleSubmit, getValues } = useSelectedValuesFromHookForm(resetPasswordSchema);
	const [requestEmail, { data, isLoading, error }] = useRequestPasswordResetRequestMutation();

	const findAccount = (data: any) => {
		const { email } = data;
		requestEmail({ email });
	};

	useEffect(() => {
		if (!data) return;
		setEmail(getValues().email as string);
		toast.success("An email was sent to your email address. Enter code to proceed", { autoClose: 2500 });
		setStep((prev) => ++prev);
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<>
			<form className="mt-20" onSubmit={handleSubmit(findAccount)}>
				<div className="">
					<h3 className="text-3xl  font-bold">Forgot password</h3>
					<p className="">Enter your email and a verification code will be sent to your mail</p>
					<div className="mt-4">
						<Input label="Email" register={register} name="email" placeholder="Eg. iammensahmichael@gmail.com" />

						<Button text="Continue" type="submit" sx="mt-12" isLoading={isLoading} />
					</div>
				</div>
			</form>
		</>
	);
};

export default Reset;
