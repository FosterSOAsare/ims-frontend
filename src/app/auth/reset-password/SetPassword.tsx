"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import React from "react";
import { useRouter } from "next/navigation";

const SetPassword = () => {
	const router = useRouter();
	return (
		<>
			<form className="mt-20">
				<div className="">
					<h3 className="text-3xl  font-bold">Reset your password</h3>
					<p className="">Create a new password and confirm your password</p>
					<div className="mt-4">
						<div className="space-y-4">
							<Input label="New password" type="password" name="password" placeholder="Enter new password" />
							<Input label="Confirm password" type="password" name="confirmpassword" placeholder="Confirm password" />
						</div>

						<Button text="Reset password" sx="mt-12" handleClick={() => router.push("/auth/login")} />
					</div>
				</div>
			</form>
		</>
	);
};

export default SetPassword;
