import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			{children}
			<ToastContainer />
		</div>
	);
};

export default layout;
