"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedValuesFromHookForm";
import { setPasswordSchema } from "@/libs/hookform";
import { useSetNewPasswordResetRequestMutation } from "@/apis/authApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import { toast } from "react-toastify";

const SetPassword = ({ email }: { email: string }) => {
	const router = useRouter();
	const { register, handleSubmit } = useSelectedValuesFromHookForm(setPasswordSchema);
	const [setNewPasswordRequest, { data, isLoading, error }] = useSetNewPasswordResetRequestMutation();

	const setPassword = (data: any) => {
		const { password, confirmpassword } = data;
		if (password !== confirmpassword) return toast.error("Passwords do not match", { autoClose: 1500 });

		// Set password
		setNewPasswordRequest({ newPassword: password, email });
	};

	useEffect(() => {
		if (!data) return;
		toast.success("Password was successfully changed, proceed to login", { autoClose: 1500 });
		router.replace("/auth/login");
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<>
			<form className="mt-20" onSubmit={handleSubmit(setPassword)}>
				<div className="">
					<h3 className="text-3xl  font-bold">Reset your password</h3>
					<p className="">Create a new password and confirm your password</p>
					<div className="mt-4">
						<div className="space-y-4">
							<Input label="New password" register={register} type="password" name="password" placeholder="Enter new password" />
							<Input label="Confirm password" register={register} type="password" name="confirmpassword" placeholder="Confirm password" />
						</div>

						<Button text="Reset password" type="submit" sx="mt-12" isLoading={isLoading} />
					</div>
				</div>
			</form>
		</>
	);
};

export default SetPassword;
