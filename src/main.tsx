import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";
import Blog from "./pages/blog";
import Home from "./pages/home";
import ProjectDetails from "./pages/project-details";
import Projects from "./pages/projects";

const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: "projects",
				Component: Projects,
			},
			{
				path: "/projects/:id",
				Component: ProjectDetails,
			},
			{
				path: "/blog",
				Component: Blog,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
		<Toaster />
	</StrictMode>
);
