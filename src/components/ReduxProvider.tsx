"use client";
import authApi, { useFetchLoggedInUserRequestQuery, useLazyRefreshAccessTokenRequestQuery } from "@/apis/authApi";
import store from "@/store";
import { setSession } from "@/utils/session";
import React, { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

const InitialDispatch = ({ children }: { children: ReactNode }) => {
	const { error } = useFetchLoggedInUserRequestQuery();
	const [refreshAccessToken, { data: refreshed, isLoading }] = useLazyRefreshAccessTokenRequestQuery();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!error) return;
		if ((error as any)?.data?.message === "TOKEN_EXPIRED") {
			// refresh token
			const token = localStorage.getItem("refresh_token");

			if (!token) return;
			console.log(token);
			refreshAccessToken({ token: token as string });
		}
	}, [error]);

	useEffect(() => {
		if (!refreshed) return;
		setSession(refreshed?.data?.access_token);
		localStorage.setItem("refresh_token", refreshed?.data?.refresh_token);

		// Refetch user
		dispatch(authApi.util.invalidateTags(["USER"])); // Invalidate the tag
		dispatch(authApi.util.resetApiState());
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
