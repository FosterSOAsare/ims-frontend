"use client";
import { useFetchLoggedInUserRequestQuery, useLazyRefreshAccessTokenRequestQuery } from "@/apis/authApi";
import store from "@/store";
import React, { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

const InitialDispatch = ({ children }: { children: ReactNode }) => {
	const { error } = useFetchLoggedInUserRequestQuery();
	const [refreshAccessToken, { data: refreshed, isLoading }] = useLazyRefreshAccessTokenRequestQuery();

	useEffect(() => {
		if (!error) return;
		if ((error as any)?.data?.message === "TOKEN_EXPIRED") {
			// refresh token
			const token = localStorage.getItem("refresh_token");

			if (!token) return;
			console.log(token)
			refreshAccessToken({ token: token as string });
		}
	}, [error]);

	useEffect(() => {
		if (!refreshed) return;
		console.log(refreshed);
	}, [refreshed]);
	return <>{children}</>;
};
const ReduxProvider = ({ children }: { children: ReactNode }) => {
	return (
		<Provider store={store}>
			<InitialDispatch>
				{children}

				<ToastContainer />
			</InitialDispatch>
		</Provider>
	);
};

export default ReduxProvider;
