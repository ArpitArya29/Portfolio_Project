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
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full p-8">
        <h2 className="text-4xl font-bold underline">Your Projects</h2>
        <button
          onClick={() => {
            setEditProject(null);
            setOpenModel(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition cursor-pointer"
        >
          + Add Projects
        </button>
      </div>

      {/* Project cards */}
      {allProjects.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
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
        <div className="text-center">
          <p className="text-xl font-bold">No any projects to show</p>
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
