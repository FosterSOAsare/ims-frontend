import React, { useEffect, useState } from "react";
import Input from "../Input";
import { useChangeUserGeneralDetailsRequestMutation, useFetchLoggedInUserRequestQuery } from "@/apis/authApi";
import { toast } from "react-toastify";
import useCreateErrorFromApiRequest from "@/hooks/useCreateErrorFromApiReaquest";
import Loading from "../Loading";

const EditGeneralInfo = ({ setShowEditGeneral }: { setShowEditGeneral: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const { data: user } = useFetchLoggedInUserRequestQuery();
	const [details, setDetails] = useState({ fullName: user?.data?.fullName, phoneNumber: user?.data?.phone || "" });
	const [changeUserDetailsRequest, { data: updated, isLoading: updating, error: updateError }] = useChangeUserGeneralDetailsRequestMutation();

	const editUserDetails = () => {
		const { fullName, phoneNumber } = details;
		if (!fullName) return toast.error("Enter your full name", { autoClose: 1500 });
		if (!phoneNumber) return toast.error("Enter your phone number", { autoClose: 1500 });

		changeUserDetailsRequest({ phoneNumber, fullName });
	};

	useEffect(() => {
		if (!updated) return;
		setShowEditGeneral(false);
	}, [updated]);

	useCreateErrorFromApiRequest(updateError);

	return (
		<div className="w-full py-4">
			<div className="flex items-center justify-between">
				<h3 className="text-xl font-bold">Account</h3>
				<div className="flex gap-2">
					<button
						disabled={updating}
						className="border-[1px] rounded-[8px] px-6 py-2 bg-[#FEF2F2] text-[#DC2626] hover:bg-[#DC2626] hover:text-white"
						onClick={() => setShowEditGeneral(false)}>
						Discard
					</button>
					<button disabled={updating} className="border-[1px] rounded-[8px] px-6 py-2 hover:opacity-80 bg-sec text-white" onClick={editUserDetails}>
						{updating ? <Loading /> : "Save"}
					</button>
				</div>
			</div>

			<div className="mt-4">
				<div className="w-1/2 mb-4">
					<Input
						name="name"
						value={details.fullName}
						setValue={(value) => setDetails((prev) => ({ ...prev, fullName: value }))}
						inputSx="text-sm"
						label="Fullname"
						placeholder="Eg. iamderez"
					/>
				</div>
				<div className="flex items-center gap-4 justify-between">
					<div className="w-full mb-4">
						<Input
							name="phone"
							value={details.phoneNumber}
							setValue={(value) => setDetails((prev) => ({ ...prev, phoneNumber: value }))}
							inputSx="text-sm"
							label="Phone"
							placeholder="eg: 0555534689"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditGeneralInfo;
