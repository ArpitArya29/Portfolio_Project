import React, { useState } from "react";
import { useExperienceStore } from "../Stores/useExperienceStore";

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

  const [experience, setExperience] = useState([experienceObject]);

  const handleChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const addMore = () => {
    setExperience([...experience, experienceObject]);
  };

  const handleSubmit = async () => {
    const filteredExperiences = experience.filter(
      (exp) => exp.company.trim() !== "",
    );

    if (editExperience) {
      await updateExperience(filteredExperiences[0], editExperience.id);
    } else {
      await addExperiences({ experiences: filteredExperiences });
    }

    onClose();
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-CA");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-base-200 p-6 rounded-lg w-180 space-y-4 ">
        <h2 className="text-lg font-semibold">
          {editExperience ? "Edit Experience" : "Add Experiences"}
        </h2>

        {experience.map((exp, index) => (
          <div
            key={index}
            className="bg-base-100 grid grid-cols-3 grid-rows-3 gap-4 p-6 rounded-lg"
          >
            <div className="col-start-1 row-start-1">
              <label className="label">
                <span className="label-text font-medium">Company</span>
              </label>
              <input
                value={exp.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
                placeholder="Company"
                className="input input-bordered w-full"
              />
            </div>

            <div className="col-start-2 row-start-1 col-span-2 row-span-2 flex flex-col">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <input
                value={exp.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                placeholder="Description"
                className="textarea textarea-bordered w-full flex-1"
              />
            </div>

            <div className="col-start-1 row-start-2">
              <label className="label">
                <span className="label-text font-medium">Role</span>
              </label>
              <input
                value={exp.role}
                onChange={(e) => handleChange(index, "role", e.target.value)}
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
              <label className="label">
                <span className="label-text font-medium">Start Date</span>
              </label>
              <input
                type="date"
                value={formatDate(exp.startDate)}
                onChange={(e) =>
                  handleChange(index, "startDate", e.target.value)
                }
                placeholder="startDate"
                className="input input-bordered w-full"
              />
            </div>

            <div className="col-start-3 row-start-3">
              <label className="label">
                <span className="label-text font-medium">End Date</span>
              </label>
              <input
                type="date"
                value={formatDate(exp.endDate)}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                placeholder="endDate"
                className="input input-bordered w-full"
              />
            </div>
          </div>
        ))}

        {!editExperience && (
          <button
            onClick={addMore}
            className="text-blue-600 hover:cursor-pointer hover: underline"
          >
            + Add More
          </button>
        )}

        <div className="flex justify-end gap-2">
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

export default ExperienceModel;
