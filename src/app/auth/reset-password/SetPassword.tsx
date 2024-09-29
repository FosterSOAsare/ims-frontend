"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import React from "react";
import { useRouter } from "next/navigation";
import useSelectedValuesFromHookForm from "@/hooks/useSelectedvaluesFromHookForm";
import { setPasswordSchema } from "@/libs/hookform";

const SetPassword = () => {
	const router = useRouter();
	const { register, handleSubmit } = useSelectedValuesFromHookForm(setPasswordSchema);

	const setPassword = (data: any) => {
		console.log(data);
		router.push("/auth/login");
	};
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

						<Button text="Reset password" type="submit" sx="mt-12" />
					</div>
				</div>
			</form>
		</>
	);
};

export default SetPassword;
