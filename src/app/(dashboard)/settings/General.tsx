import Image from "next/image";
import React, { useState } from "react";

import AvatarImage from "@/assets/images/avatar.webp";
import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "@/components/Input";
import { useFetchLoggedInUserRequestQuery } from "@/apis/authApi";
import EditGeneralInfo from "@/components/settings/EditGeneralInfo";

const General = () => {
	const [showEditGeneral, setShowEditGeneral] = useState(false);
	const [showEditEmail, setShowEditEmail] = useState(false);

	const { data: user } = useFetchLoggedInUserRequestQuery();
	return (
		<div className="w-full">
			<div className="pb-6 border-b-[1px]">
				<h3 className="text-xl font-bold">General</h3>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, rerum!</p>

				<div className="flex mt-4 gap-2">
					<div className="w-14 h-14 rounded-full shadow-md border-[1px] relative">
						<Image src={user?.data?.imageUrl ? user?.data?.imageUrl : AvatarImage} alt="Profile" fill className="rounded-full" />
						<label
							htmlFor="file"
							className="w-6 flex items-center justify-center hover:cursor-pointer h-6 rounded-full bg-white border-[1px] shadow-md absolute -right-1 -bottom-1 z-[100]">
							<Icon icon="hugeicons:edit-01" className="text-sm" />
						</label>
						<input type="file" id="file" accept="images/*" className="w-0 h-0" />
					</div>
					<div>
						<h3 className="text-lg flex items-center gap-1 font-bold">
							{user?.data?.fullName} <span className="uppercase text-[10px] bg-[#D97706] text-white px-2  rounded-full">{user?.data?.role}</span>
						</h3>
						<p className="text-sm">{user?.data?.email}</p>
					</div>
				</div>
			</div>
			{!showEditGeneral && !showEditEmail && (
				<>
					<div className="w-full py-4">
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-bold">Account</h3>
							<div className="flex items-center gap-3">
								{/* <button className="border-[1px] bg-warning-50 rounded-[8px] px-3 py-2" onClick={() => setShowEditGeneral(true)}>
								<Icon icon="hugeicons:edit-01" className="inline mr-2" />
								Edit Email
							</button> */}
								<button className="border-[1px] rounded-[8px] px-3 py-2 hover:bg-slate-100" onClick={() => setShowEditGeneral(true)}>
									<Icon icon="hugeicons:edit-01" className="inline mr-2" />
									Edit Account Details
								</button>
							</div>
						</div>

						<div className="mt-4">
							<div className="w-full mb-4">
								<p>Name</p>
								<h3>{user?.data?.fullName} </h3>
							</div>

							<div className="w-full mb-4">
								<p>Phone number</p>
								<h3>{user?.data?.phoneNumber || "-"} </h3>
							</div>
						</div>
					</div>
					<div className="w-full py-4">
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-bold">Email</h3>
							<div className="flex items-center gap-3">
								<button className="border-[1px] bg-warning-50 rounded-[8px] px-3 py-2" onClick={() => setShowEditEmail(true)}>
									<Icon icon="hugeicons:edit-01" className="inline mr-2" />
									Edit Email
								</button>
							</div>
						</div>

						<div className="mt-4">
							<div className="w-full mb-4">
								<p>Email</p>
								<h3>{user?.data?.email} </h3>
							</div>
						</div>
						<div className="bg-warning-50 mt-2 rounded-[5px] p-2 flex items-center justify-start gap-2">
							<span className="w-8 h-8 ">
								<Icon icon="ph:warning-octagon-fill" className="text-warning-500 text-2xl" />
							</span>
							<p className="text-primary font-light">Changing your email will require verification—an OTP will be sent to your new email for confirmation.</p>
						</div>
					</div>
				</>
			)}

			{showEditGeneral && <EditGeneralInfo setShowEditGeneral={setShowEditGeneral} />}

			{showEditEmail && (
				<div className="w-full py-4">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold">Email</h3>
						<div className="flex gap-2">
							<button className="border-[1px] rounded-[8px] px-6 py-2 bg-[#FEF2F2] text-[#DC2626] hover:bg-[#DC2626] hover:text-white" onClick={() => setShowEditEmail(false)}>
								Discard
							</button>
							<button className="border-[1px] rounded-[8px] px-6 py-2 hover:opacity-80 bg-sec text-white">Save</button>
						</div>
					</div>

					<div className="mt-4">
						<div className="w-full mb-4">
							<Input name="email" inputSx="text-sm" label="Email" placeholder="eg: michael@gmail.com" />
						</div>
					</div>
					<div className="bg-warning-50 mt-2 rounded-[5px] p-2 flex items-center justify-start gap-2">
						<span className="w-8 h-8 ">
							<Icon icon="ph:warning-octagon-fill" className="text-warning-500 text-2xl" />
						</span>
						<p className="text-primary font-light">Changing your email will require verification—an OTP will be sent to your new email for confirmation.</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default General;
