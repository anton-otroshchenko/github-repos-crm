import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./pages/auth/Auth.js";
import { store } from "./libs/modules/store/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider
				router={createBrowserRouter([
					{
						element: <App />,
						path: "/",
					},
					{
						element: <Auth />,
						path: "/sign-in",
					},
					{
						element: <Auth />,
						path: "/sign-up",
					},
				])}
			/>
		</Provider>
	</StrictMode>,
);
