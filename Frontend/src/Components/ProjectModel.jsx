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

  const [project, setProject] = useState([projectObject]);

  const handleChange = (index, field, value) => {
    const updated = [...project];
    updated[index][field] = value;
    setProject(updated);
  };

  const addMore = () => {
    setProject([...project, projectObject]);
  };

  const handleSubmit = async () => {
    const filteredProjects = project.filter(
      (project) => project.title.trim() !== "",
    );

    if (editProject) {
      await updateProject(filteredProjects[0], editProject.id);
    } else {
      await addProjects({ projects: filteredProjects });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-base-200 p-6 rounded-lg space-y-4 w-200 max-h-[90vh] flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">
            {editProject ? "Edit Project" : "Add Projects"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {project.map((proj, index) => (
            <div key={index} className="bg-base-100  p-6 rounded-lg">
              <div className="text-end pr-2">
                <button
                  onClick={() => handleRemove(index)}
                  className="text-sm px-2 hover:cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-5 grid-rows-3 gap-4">
                <div className="col-start-1 row-start-1 col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  <input
                    value={proj.title}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    placeholder="Title"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="col-start-3 row-start-1 col-span-3 row-span-3 flex flex-col">
                  <label className="label">
                    <span className="label-text font-medium">Description</span>
                  </label>
                  <input
                    value={proj.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="textarea textarea-bordered w-full h-full align-top pt-2"
                  />
                </div>

                <div className="col-start-1 row-start-2 col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">Live Link</span>
                  </label>
                  <input
                    value={proj.live_link}
                    onChange={(e) =>
                      handleChange(index, "live_link", e.target.value)
                    }
                    placeholder="Live Link"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="col-start-1 row-start-3 col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">Github Link</span>
                  </label>
                  <input
                    value={proj.github_link}
                    onChange={(e) =>
                      handleChange(index, "github_link", e.target.value)
                    }
                    placeholder="Guthub Link"
                    className="input input-bordered w-full"
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
              className="text-blue-600 hover:cursor-pointer hover: underline"
            >
              + Add More
            </button>
          )}
        </div>

        <div className="p-4 border-t border-gray-500 flex justify-end gap-2 bg-base-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModel;
