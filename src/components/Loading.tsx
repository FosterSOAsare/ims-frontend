import React from "react";

const Spinner = ({ sx = "" }: { sx?: string }) => {
	return (
		<div className="flex items-center justify-center">
			<div className={`${sx} animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent`}></div>
		</div>
	);
};

export default Spinner;
