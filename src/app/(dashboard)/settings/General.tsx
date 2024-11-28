import Image from "next/image";
import React, { useState } from "react";

import ProfileImage from "@/assets/images/profile.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "@/components/Input";

const General = () => {
	const [showEditGeneral, setShowEditGeneral] = useState(false);
	return (
		<div className="w-full">
			<div className="pb-6 border-b-[1px]">
				<h3 className="text-xl font-bold">General</h3>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, rerum!</p>

				<div className="flex mt-4 gap-2">
					<div className="w-14 h-14 rounded-full relative">
						<Image src={ProfileImage} alt="Profile" fill />
					</div>
					<div>
						<h3 className="text-lg flex items-center gap-1 font-bold">
							Michael Mensah <span className="uppercase text-[10px] bg-[#D97706] text-white px-2  rounded-full">Central Admin</span>
						</h3>
						<p className="text-sm">michael@gmail.com</p>
					</div>
				</div>
			</div>
			{!showEditGeneral && (
				<div className="w-full py-4">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold">Account</h3>
						<button className="border-[1px] rounded-[8px] px-3 py-2 hover:bg-slate-100" onClick={() => setShowEditGeneral(true)}>
							<Icon icon="hugeicons:edit-01" className="inline mr-2" />
							Edit
						</button>
					</div>

					<div className="mt-4">
						<div className="w-full mb-4">
							<p>Name</p>
							<h3>Michael Mensah</h3>
						</div>
						<div className="flex items-center justify-between">
							<div className="w-full mb-4">
								<p>Email</p>
								<h3>michael@gmail.com</h3>
							</div>
							<div className="w-full mb-4">
								<p>Phone number</p>
								<h3>+ 233 555567457</h3>
							</div>
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

			{showEditGeneral && (
				<div className="w-full py-4">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold">Account</h3>
						<div className="flex gap-2">
							<button className="border-[1px] rounded-[8px] px-6 py-2 bg-[#FEF2F2] text-[#DC2626] hover:bg-[#DC2626] hover:text-white" onClick={() => setShowEditGeneral(false)}>
								Discard
							</button>
							<button className="border-[1px] rounded-[8px] px-6 py-2 hover:opacity-80 bg-sec text-white">Save</button>
						</div>
					</div>

					<div className="mt-4">
						<div className="w-1/2 mb-4">
							<Input name="name" inputSx="text-sm" label="Fullname" placeholder="Eg. iamderez" />
						</div>
						<div className="flex items-center gap-4 justify-between">
							<div className="w-full mb-4">
								<Input name="email" inputSx="text-sm" label="Email" placeholder="eg: michael@gmail.com" />
							</div>
							<div className="w-full mb-4">
								<Input name="phone" inputSx="text-sm" label="Phone" placeholder="eg: 0555534689" />
							</div>
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
