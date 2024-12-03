"use client";
import { useEffect, ReactNode, useState } from "react";
import Loading from "./Loading";
import { useFetchLoggedInUserRequestQuery } from "@/apis/authApi";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
	children: ReactNode;
	loginRequired?: Boolean;
}

const ProtectedRoute = ({ children, loginRequired = false }: ProtectedRouteProps) => {
	// Use  fetch from the initial dispatch in ReduxProvider component
	const { isLoading, data: user, error } = useFetchLoggedInUserRequestQuery();
	const router = useRouter();

	// Add routing checked to make sure the user permissions is confirmed before rendering child components
	const [routingChecked, setRoutingChecked] = useState(false);

	useEffect(() => {
		// if the route doesn't require login but user is authenticated redirect to account page - (Auth pages)
		if (!isLoading && !loginRequired && !error && user?.data?.email) {
			// TODO: check permissions
			router.replace("/");
			return;
		}

		// If login is required but user is not authenticated, redirect to login page
		if (!isLoading && loginRequired && (!user?.data?.email || error)) {
			router.replace("/auth/login");
			return;
		}

		setRoutingChecked(true);
	}, [router, isLoading, error, user?.data.email]);

	return (
		<>
			{(isLoading || !routingChecked) && (
				<div className=" w-full h-screen bg-bg flex items-center justify-center flex-col">
					<Loading sx="!border-sec !h-16 !w-16" />
				</div>
			)}
			{routingChecked && (
				<>
					{!isLoading && loginRequired && !error && user?.data?.email && <>{children}</>}

					{!isLoading && !loginRequired && !user?.data?.email && <>{children}</>}
				</>
			)}
		</>
	);
};

export default ProtectedRoute;
