"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { useChangePasswordMutation, useFetchLoggedInUserRequestQuery } from "@/apis/authApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import authApi from "@/apis/authApi";

import Input from "@/components/Input";
import Button from "@/components/Button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";

const page = () => {
	const { data: user } = useFetchLoggedInUserRequestQuery();
	const [password, setPassword] = useState("");
	const [activateAccountRequest, { data, isLoading, error }] = useChangePasswordMutation();
	const dispatch = useDispatch();
	const router = useRouter();

	// Redirect to account page if user's status is not pending
	useEffect(() => {
		if (!user?.data) return;
		if (user?.data?.status?.toLowerCase() !== "pending") {
			// Redirect to dashboard
			router.replace("/");
		}
	}, [user]);

	const verifyAccount = (e: any) => {
		e.preventDefault();
		if (!password) return toast.error("Enter your password to proceed", { autoClose: 1500 });
		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$^&*()_-])[a-zA-Z\d.,!@#$^&*()_-]{8,32}$/.test(password)) {
			return toast.error("Password must be at least 8 characters long , and contain a special character", { autoClose: 1500 });
		}
		activateAccountRequest({ newPassword: password });
	};

	// Check for verification and invalidate user
	useEffect(() => {
		if (!data) return;
		toast.success("Account successfully verified...", { autoClose: 1500 });

		// Refetch user
		dispatch(authApi.util.invalidateTags(["USER"])); // Invalidate the tag
		dispatch(authApi.util.resetApiState());

		// Redirect
	}, [data]);

	useCreateErrorFromApiRequest(error);
	return (
		<ProtectedRoute loginRequired={true}>
			<div className="w-full h-screen flex items-center justify-between overflow-hidden">
				<div className="w-2/5 p-4 overflow-y-auto flex flex-col h-full px-12">
					<div className="w-full mb-6 flex items-center justify-between">
						<Link href="/" className="font-bold text-xl flex gap-2 items-center">
							Stealth <span className="uppercase text-xs font-normal bg-red-500 text-white py-[2px] px-2 rounded-full">Beta</span>
						</Link>
					</div>

					<form className="mt-4 overflow-y-hidden h-auto" onSubmit={verifyAccount}>
						<div className="h-[calc(100%-120px)] overflow-y-auto pb-12">
							<h3 className="text-3xl  font-bold">Activate Account</h3>
							<p className="">Activate your account by updating your password</p>
							<div className="space-y-4">
								<Input label="Password" value={password} setValue={(value) => setPassword(value)} type="password" name="password" placeholder="Enter password" />
							</div>
						</div>

						<div className="bg-bg py-2 border-t-[1px] h-[120px]">
							<Button text="Activate account" type="submit" isLoading={isLoading} />

							<p className="mt-3 text-sm">
								By activating an account, you agree to Stealth{" "}
								<Link href="" className="text-black font-normal hover:underline">
									Terms of Service
								</Link>{" "}
								&{" "}
								<Link href="" className="text-black font-normal hover:underline">
									{" "}
									Privacy Policy
								</Link>
							</p>
						</div>
					</form>
				</div>
				<div className="w-3/5 h-[calc(100%-20px)] shadow-md bg-white"> </div>
			</div>
		</ProtectedRoute>
	);
};

export default page;
