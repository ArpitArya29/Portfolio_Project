import React, { useEffect, useState } from "react";
import { useProjectStore } from "../Stores/useProjectStore";
import { Loader } from "lucide-react";
import ProjectCard from "../Components/ProjectCard";
import ProjectModel from "../Components/ProjectModel";

const ProjectPage = () => {
  const { allProjects, isFetchingProjects, getAllProjects } = useProjectStore();

  const [openModel, setOpenModel] = useState(false);
  const [editProject, setEditProject] = useState(null);

  if (isFetchingProjects) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="h-5 w-5" />
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <h2 className="text-4xl font-bold text-white bg-linear-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text">
          Your Projects
        </h2>
        <button
          onClick={() => {
            setEditProject(null);
            setOpenModel(true);
          }}
          className="bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          + Add Projects
        </button>
      </div>

      {/* Project cards */}
      {allProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => {
                setEditProject(project);
                setOpenModel(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <p className="text-xl font-semibold text-slate-300">
              No projects to show
            </p>
            <p className="text-slate-400 mt-2">
              Start by adding your first project!
            </p>
          </div>
        </div>
      )}

      {/* Model */}
      {openModel && (
        <ProjectModel
          editProject={editProject}
          onClose={() => {
            setOpenModel(false);
          }}
        />
      )}
    </div>
  );
};

export default ProjectPage;
