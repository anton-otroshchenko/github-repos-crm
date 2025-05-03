import { useEffect } from "react";
import { useAppDispatch } from "./libs/hooks/hooks.js";
import { getAuthenticatedUser } from "./modules/auth/slices/auth.thunks.js";
import { Outlet } from "react-router-dom";

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(getAuthenticatedUser());
	}, [dispatch]);

	return <Outlet />;
}

export default App;
