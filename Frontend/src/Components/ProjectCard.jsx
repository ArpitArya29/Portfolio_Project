import React, { useState } from "react";
import { useProjectStore } from "../Stores/useProjectStore";
import { ExternalLink, FileCode, Pencil, Trash } from "lucide-react";

const ProjectCard = ({ project, onEdit }) => {
  const { deleteProject, isDeletingProject } = useProjectStore();

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:bg-white/10 cursor-pointer flex flex-col min-h-56 max-h-72">
      {/* Top section */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-white">{project.title}</h2>

          <p className="text-sm text-slate-300 mt-2 line-clamp-3 overflow-hidden">
            {project.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit()}
            className="group p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Pencil
              size={18}
              className="text-orange-400 transition-all duration-200 group-hover:text-orange-300"
            />
          </button>

          <button
            disabled={isDeletingProject}
            onClick={() => {
              deleteProject(project.id);
            }}
            className="group p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Trash
              size={18}
              className="text-red-400 transition-all duration-200 group-hover:text-red-300"
            />
          </button>
        </div>
      </div>

      {/* Links */}
      <div className="mt-auto border-t border-white/10 pt-4">
        {!(project.live_link || project.github_link) ? (
          <div className="text-center text-yellow-400 py-2">No links added</div>
        ) : (
          <div className="flex items-center justify-center gap-6">
            {/* Live Link */}
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-medium"
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
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium"
              >
                <FileCode size={18} />
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
