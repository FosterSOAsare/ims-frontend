import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
import Input from "../Input";
import { useChangeUserEmailRequestMutation, useConfirmChangeUserEmailCodeRequestMutation, useFetchLoggedInUserRequestQuery } from "@/apis/authApi";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import { toast } from "react-toastify";
import Loading from "../Loading";

const EditUserEmail = ({ setShowEditEmail }: { setShowEditEmail: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const [step, setStep] = useState(0);
	const { data: user } = useFetchLoggedInUserRequestQuery();
	const inputRef = useRef<any>(null);

	const [email, setEmail] = useState(user?.data?.email || "");
	const [otp, setOtp] = useState("");
	const [changeUserDetailsRequest, { data: requestSent, isLoading: sendingRequest, error: requestError }] = useChangeUserEmailRequestMutation();
	const [confirmChangeUserDetailsRequest, { data: updated, isLoading: updating, error: updateError }] = useConfirmChangeUserEmailCodeRequestMutation();

	const editUserDetails = () => {
		if (!email) return toast.error("Enter your email address", { autoClose: 1500 });
		if (
			!/^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/.test(
				email
			)
		)
			return toast.error("Enter a valid email address", { autoClose: 1500 });

		changeUserDetailsRequest({ email });
	};

	const confirmOtpCode = () => {
		if (!otp) return toast.error("Enter the otp code", { autoClose: 1500 });
		if (otp.length !== 5) return toast.error("Enter a valid otp code", { autoClose: 1500 });

		confirmChangeUserDetailsRequest({ email, code: +otp });
	};

	useEffect(() => {
		if (!requestSent) return;
		toast.success("An otp was sent to your new email address . Please confirm otp", { autoClose: 1500 });
		setStep((prev) => ++prev);
	}, [requestSent]);

	useEffect(() => {
		if (!updated) return;
		toast.success("Your email was changed succesfully. It should be used on your next login", { autoClose: 1500 });
		setShowEditEmail(false);
	}, [updated]);

	useCreateErrorFromApiRequest(updateError);
	useCreateErrorFromApiRequest(requestError);
	return (
		<div className="w-full py-4">
			<div className="flex items-center justify-between">
				<h3 className="text-xl font-bold">Email</h3>
				<div className="flex gap-2">
					<button
						disabled={updating || sendingRequest}
						className="border-[1px] rounded-[8px] px-6 py-2 bg-[#FEF2F2] text-[#DC2626] hover:bg-[#DC2626] hover:text-white"
						onClick={() => (step === 0 ? setShowEditEmail(false) : setStep((prev) => --prev))}>
						{step === 0 ? "Discard" : "Go Back"}
					</button>
					<button
						disabled={updating || sendingRequest}
						className="border-[1px] rounded-[8px] px-6 py-2 hover:opacity-80 bg-sec text-white"
						onClick={() => (step === 0 ? editUserDetails() : confirmOtpCode())}>
						{updating || sendingRequest ? <Loading /> : <>{step === 1 ? "Change" : "Confirm"}</>}
					</button>
				</div>
			</div>

			{step === 0 && (
				<>
					<div className="mt-4">
						<div className="w-full mb-4">
							<Input name="email" value={email} setValue={(value) => setEmail(value)} inputSx="text-sm" label="Email" placeholder="eg: michael@gmail.com" />
						</div>
					</div>
					<div className="bg-warning-50 mt-2 rounded-[5px] p-2 flex items-center justify-start gap-2">
						<span className="w-8 h-8 ">
							<Icon icon="ph:warning-octagon-fill" className="text-warning-500 text-2xl" />
						</span>
						<p className="text-primary font-light">Changing your email will require verification—an OTP will be sent to your new email for confirmation.</p>
					</div>
				</>
			)}

			{step === 1 && (
				<>
					<h3>Enter code to proceed. If code doesn't show, click on any of the boxes to continue</h3>
					<div className="mt-4 w-2/5">
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
					</div>
				</>
			)}
		</div>
	);
};

export default EditUserEmail;
