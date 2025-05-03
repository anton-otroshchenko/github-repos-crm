import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../libs/hooks/hooks.js";
import { logout } from "../../modules/auth/slices/auth.thunks.js";
import { selectCurrentUser } from "../../modules/auth/slices/auth.slice.js";
import {
	addProject,
	deleteProject,
	fetchUserProjects,
	refreshProject,
} from "../../modules/github-projects/slices/github-projects.thunks.js";
import {
	selectProjects,
	selectIsLoading,
	selectError,
	clearProjects,
} from "../../modules/github-projects/slices/github-projects.slice.js";
import { Button, Header, Input } from "../../libs/components/components.js";
import { ProjectItem } from "./components/components.js";

const ProjectsPage = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectCurrentUser);
	const projects = useAppSelector(selectProjects);
	const isLoading = useAppSelector(selectIsLoading);
	const error = useAppSelector(selectError);
	const [repoPath, setRepoPath] = useState("");

	useEffect(() => {
		if (!projects && user) {
			dispatch(fetchUserProjects(user.id));
		}
	}, [projects, user]);

	const handleLogout = () => {
		dispatch(logout());
		dispatch(clearProjects());
	};

	const handleAddProject = () => {
		if (!repoPath.trim()) return;

		dispatch(
			addProject({
				userId: user?.id || 0,
				repoPath,
			}),
		).then(() => {
			setRepoPath("");
		});
	};

	const handleUpdateProject = (id: number) => {
		dispatch(refreshProject(id));
	};

	const handleDeleteProject = (id: number) => {
		dispatch(deleteProject(id));
	};

	const projectsToDisplay = projects ?? [];

	return (
		<div className="min-h-screen bg-gray-100">
			<Header email={user?.email as string} onLogout={handleLogout} />

			<main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-lg font-medium text-gray-900">My Projects</h2>
					<div className="flex space-x-2">
						<Input
							value={repoPath}
							onChange={(e) => setRepoPath(e.target.value)}
							placeholder="owner/repo (e.g., facebook/react)"
						/>
						<Button onClick={handleAddProject} disabled={isLoading}>
							Add
						</Button>
					</div>
				</div>

				<div className="bg-white shadow overflow-hidden sm:rounded-md">
					{projectsToDisplay.length === 0 ? (
						<div className="p-6 text-center text-gray-500">
							No projects yet. Add a repository using the input above.
						</div>
					) : (
						<ul className="divide-y divide-gray-200">
							{projectsToDisplay.map((project) => (
								<ProjectItem
									key={project.id}
									project={project}
									isLoading={isLoading}
									onUpdate={handleUpdateProject}
									onDelete={handleDeleteProject}
								/>
							))}
						</ul>
					)}
				</div>
			</main>
		</div>
	);
};

export default ProjectsPage;
