import ProtectedRoute from "@/components/ProtectedRoute";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<ProtectedRoute loginRequired={false}>
				{children}
				<ToastContainer />
			</ProtectedRoute>
		</div>
	);
};

export default layout;
