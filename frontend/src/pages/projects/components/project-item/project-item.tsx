import React from "react";
import { Button } from "../../../../libs/components/components.js";
import CreatedIcon from "../../../../assets/icons/CreatedIcon.js";
import StarIcon from "../../../../assets/icons/StarIcon.js";
import ForkIcon from "../../../../assets/icons/ForkIcon.js";
import IssueIcon from "../../../../assets/icons/IssueIcon.js";
import { formatDate } from "../../../../libs/helpers/helpers.js";
import { GithubProject } from "shared";

type Properties = {
	project: GithubProject;
	isLoading: boolean;
	onUpdate: (id: number) => void;
	onDelete: (id: number) => void;
};

const ProjectItem: React.FC<Properties> = ({
	project,
	onDelete,
	isLoading,
	onUpdate,
}) => {
	return (
		<li key={project.id}>
			<div className="px-4 py-4 sm:px-6">
				<div className="flex items-center justify-between">
					<div className="text-sm font-medium text-blue-600 truncate">
						<a
							href={project.repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline"
						>
							{project.owner}/{project.repoName}
						</a>
					</div>
					<div className="ml-2 flex-shrink-0 flex">
						<Button onClick={() => onUpdate(project.id)} disabled={isLoading}>
							Refresh
						</Button>
						<Button
							onClick={() => onDelete(project.id)}
							disabled={isLoading}
							className="ml-2"
						>
							Delete
						</Button>
					</div>
				</div>
				<div className="mt-2 sm:flex sm:justify-between">
					<div className="sm:flex">
						<p className="flex items-center text-sm text-gray-500 mr-4">
							<CreatedIcon />
							Created: {formatDate(project.createdAtUnix)}
						</p>
					</div>
					<div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
						<span className="mr-3 flex items-center">
							<StarIcon />
							{project.stars}
						</span>
						<span className="mr-3 flex items-center">
							<ForkIcon />
							{project.forks}
						</span>
						<span className="flex items-center">
							<IssueIcon />
							{project.issues}
						</span>
					</div>
				</div>
			</div>
		</li>
	);
};

export { ProjectItem };
