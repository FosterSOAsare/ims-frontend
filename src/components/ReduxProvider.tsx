"use client";
import { useFetchLoggedInUserRequestQuery } from "@/apis/authApi";
import store from "@/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

const InitialDispatch = ({ children }: { children: ReactNode }) => {
	useFetchLoggedInUserRequestQuery();
	return <>{children}</>;
};
const ReduxProvider = ({ children }: { children: ReactNode }) => {
	return (
		<Provider store={store}>
			<InitialDispatch>{children}</InitialDispatch>
		</Provider>
	);
};

export default ReduxProvider;
