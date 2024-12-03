import React from "react";

const NoData = ({ text = "There is currently no data here" }: { text?: string }) => {
	return <div className="flex items-center justify-center text-primary py-24">{text}</div>;
};

export default NoData;
