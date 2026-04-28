import React, { useState } from "react";
import { useExperienceStore } from "../Stores/useExperienceStore";
import { Trash2 } from "lucide-react";

const ExperienceModel = ({ editExperience, onClose }) => {
  const {
    addExperiences,
    updateExperience,
    isAddingExperiences,
    isUpdatingExperience,
  } = useExperienceStore();

  const experienceObject = {
    role: editExperience?.role || "",
    company: editExperience?.company || "",
    description: editExperience?.description || "",
    location: editExperience?.location || undefined,
    startDate: editExperience?.startDate || "",
    endDate: editExperience?.endDate || "",
  };

  const [experience, setExperience] = useState([
    {
      id: editExperience?.id || crypto.randomUUID(),
      ...experienceObject,
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const addMore = () => {
    setExperience([
      ...experience,
      { id: crypto.randomUUID(), ...experienceObject },
    ]);
  };

  const handleSubmit = async () => {
    const filteredExperiences = experience.filter(
      (exp) => exp.company.trim() !== "",
    );

    if (editExperience) {
      await updateExperience(filteredExperiences[0], editExperience.id);
    } else {
      const experiencesToSubmit = filteredExperiences.map(({ id, ...rest }) => rest);
      await addExperiences({ experiences: experiencesToSubmit });
    }

    onClose();
  };

  const handleRemove = (removeIndex) => {
    const filteredExperiences = experience.filter(
      (exp, index) => index !== removeIndex,
    );

    setExperience(filteredExperiences);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-CA");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-4xl space-y-4 max-h-[90vh] flex flex-col shadow-2xl">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">
            {editExperience ? "Edit Experience" : "Add Experiences"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
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

              <div className="grid grid-cols-3 grid-rows-3 gap-4">
                <div className="col-start-1 row-start-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Company
                  </label>
                  <input
                    value={exp.company}
                    onChange={(e) =>
                      handleChange(index, "company", e.target.value)
                    }
                    placeholder="Company"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>

                <div className="col-start-2 row-start-1 col-span-2 row-span-2 flex flex-col">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors flex-1 resize-none"
                    rows={4}
                  />
                </div>

                <div className="col-start-1 row-start-2">
                  <label className="label">
                    <span className="label-text font-medium">Role</span>
                  </label>
                  <input
                    value={exp.role}
                    onChange={(e) =>
                      handleChange(index, "role", e.target.value)
                    }
                    placeholder="Role"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="col-start-1 row-start-3">
                  <label className="label">
                    <span className="label-text font-medium">Location</span>
                  </label>
                  <input
                    value={exp.location}
                    onChange={(e) =>
                      handleChange(index, "location", e.target.value)
                    }
                    placeholder="Location"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="col-start-2 row-start-3">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formatDate(exp.startDate)}
                    onChange={(e) =>
                      handleChange(index, "startDate", e.target.value)
                    }
                    placeholder="startDate"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>

                <div className="col-start-3 row-start-3">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formatDate(exp.endDate)}
                    onChange={(e) =>
                      handleChange(index, "endDate", e.target.value)
                    }
                    placeholder="endDate"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4">
          {!editExperience && (
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

export default ExperienceModel;
