import React from "react";

const Loading = ({ sx = "" }: { sx?: string }) => {
	return (
		<div className="flex items-center justify-center">
			<div className={`${sx} animate-spin rounded-full h-6 w-6 border-4 border-white !border-t-transparent`}></div>
		</div>
	);
};

export const PageLoading = ({ sx = "" }: { sx?: string }) => {
	return (
		<div className="py-24">
			<Loading sx={`${sx} !h-8 !w-8 !border-sec`} />
		</div>
	);
};
export default Loading;
