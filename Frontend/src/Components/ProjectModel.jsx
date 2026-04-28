import React, { useState } from "react";
import { useProjectStore } from "../Stores/useProjectStore";
import { Trash2 } from "lucide-react";

const ProjectModel = ({ editProject, onClose }) => {
  const { addProjects, isAddingProject, updateProject, isUpdatingProject } =
    useProjectStore();

  const projectObject = {
    title: editProject?.title || "",
    description: editProject?.description || "",
    github_link: editProject?.github_link || "",
    live_link: editProject?.live_link || "",
  };

  const [project, setProject] = useState([
    {
      id: editProject?.id || crypto.randomUUID(),
      ...projectObject,
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...project];
    updated[index][field] = value;
    setProject(updated);
  };

  const addMore = () => {
    setProject([...project, { id: crypto.randomUUID(), ...projectObject }]);
  };

  const handleRemove = (removeIndex) => {
    const filteredProjects = project.filter(
      (proj, index) => index !== removeIndex,
    );

    setProject(filteredProjects);
  };

  const handleSubmit = async () => {
    const filteredProjects = project.filter(
      (project) => project.title.trim() !== "",
    );

    if (editProject) {
      await updateProject(filteredProjects[0], editProject.id);
    } else {
      const projectsToSubmit = filteredProjects.map(({ id, ...rest }) => rest);
      await addProjects({ projects: projectsToSubmit });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-5xl space-y-4 max-h-[90vh] flex flex-col shadow-2xl">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">
            {editProject ? "Edit Project" : "Add Projects"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {project.map((proj, index) => (
            <div
              key={proj.id}
              className="bg-white/5 border border-white/10 p-6 rounded-xl"
            >
              <div className="text-end pr-2">
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-5 grid-rows-3 gap-4">
                <div className="col-start-1 row-start-1 col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Title
                  </label>
                  <input
                    value={proj.title}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    placeholder="Title"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>

                <div className="col-start-3 row-start-1 col-span-3 row-span-3 flex flex-col">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={proj.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors flex-1 resize-none"
                    rows={6}
                  />
                </div>

                <div className="col-start-1 row-start-2 col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Live Link
                  </label>
                  <input
                    value={proj.live_link}
                    onChange={(e) =>
                      handleChange(index, "live_link", e.target.value)
                    }
                    placeholder="Live Link"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>

                <div className="col-start-1 row-start-3 col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Github Link
                  </label>
                  <input
                    value={proj.github_link}
                    onChange={(e) =>
                      handleChange(index, "github_link", e.target.value)
                    }
                    placeholder="Github Link"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4">
          {!editProject && (
            <button
              onClick={addMore}
              className="text-cyan-400 hover:text-cyan-300 hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
            >
              + Add More
            </button>
          )}
        </div>

        <div className="p-4 border-t border-white/10 flex justify-end gap-2 bg-slate-800/50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModel;
