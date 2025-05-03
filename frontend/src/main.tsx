import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import {
	RouterProvider,
	createBrowserRouter,
	Navigate,
} from "react-router-dom";
import Auth from "./pages/auth/Auth.js";
import { store } from "./libs/modules/store/store.js";
import { Provider } from "react-redux";
import { ProtectedRoute } from "./libs/components/components.js";
import Projects from "./pages/projects/Projects.js";
import { ToastContainer } from "react-toastify";
import { AppRoute } from "./libs/enums/enums.js";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ToastContainer />
		<Provider store={store}>
			<RouterProvider
				router={createBrowserRouter([
					{
						element: <App />,
						path: AppRoute.HOMEPAGE,
						children: [
							{
								index: true,
								element: <Navigate to={AppRoute.SIGNIN} replace />,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGNIN,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGNUP,
							},
							{
								element: (
									<ProtectedRoute>
										<Projects />
									</ProtectedRoute>
								),
								path: AppRoute.PROJECTS,
							},
						],
					},
				])}
			/>
		</Provider>
	</StrictMode>,
);
