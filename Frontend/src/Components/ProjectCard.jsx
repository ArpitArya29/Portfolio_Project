import React, { useState } from "react";
import { useProjectStore } from "../Stores/useProjectStore";
import { ExternalLink, FileCode, Pencil, Trash } from "lucide-react";

const ProjectCard = ({ project, onEdit }) => {
  const { deleteProject, isDeletingProject } = useProjectStore();

  return (
    <div className="bg-base-100 rounded-xl shadow-sm p-5 transition-all duration-300 hover:shadow-md cursor-pointer">
      {/* Top section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-white-800">
            {project.title}
          </h2>

          <p className="text-sm text-gray-400 mt-2 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button onClick={() => onEdit()} className="group p-2">
            <Pencil
              size={18}
              className="text-gray-500 transition-all duration-200 group-hover:text-blue-500 group-hover:fill-blue-500"
            />
          </button>

          <button
            disabled={isDeletingProject}
            onClick={() => {
              deleteProject(project.id);
            }}
            className="group p-2"
          >
            <Trash
              size={18}
              className="text-red-500 transition-all duration-200 group-hover:fill-red-500"
            />
          </button>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-gray-500 pt-4 mt-4 text-sm font-medium">
        {!(project.live_link || project.github_link) ? (
          <div className="text-center text-yellow-600">No any links added</div>
        ) : (
          <div className="flex items-center justify-around  gap-4 ">
            {/* Live Link */}
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 
                       hover:text-blue-700 transition"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
            {/* Github Link */}
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-blue-600 
                       hover:text-blue-700 transition"
              >
                <FileCode size={18} />
                Code files
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
