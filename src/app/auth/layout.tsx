import ProtectedRoute from "@/components/ProtectedRoute";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<ProtectedRoute loginRequired={false}>{children}</ProtectedRoute>
		</div>
	);
};

export default layout;
