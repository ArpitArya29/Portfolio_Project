import React, { useState } from "react";
import { useSkillsStore } from "../Stores/useSkillsStore";
import { Trash, Trash2 } from "lucide-react";

const SkillModel = ({ editSkill, onClose }) => {
  const { addSkills, updateSkill, isAddingSkills, isUpdatingSkill } =
    useSkillsStore();

  const [skills, setSkills] = useState(
    editSkill
      ? [{ name: editSkill.name, proficiency: editSkill.proficiency }]
      : [{ name: "", proficiency: 1 }],
  );

  const handleChange = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  const addMore = () => {
    setSkills([...skills, { name: "", proficiency: 1 }]);
  };

  const handleRemove = (removedIndex) => {
    const filteredSkills = skills.filter(
      (skill, index) => index !== removedIndex,
    );

    setSkills(filteredSkills);
  };

  const handleSubmit = async () => {
    const filteredSkills = skills.filter((skill) => skill.name.trim() !== "");

    if (editSkill) {
      await updateSkill(filteredSkills[0], editSkill.id);
    } else {
      await addSkills({ skills: filteredSkills });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-base-200 p-6 rounded-lg w-96 space-y-4 max-h-[90vh] flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">
            {editSkill ? "Edit Skill" : "Add Skills"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="bg-base-300 rounded-lg p-2">
              <div className="text-end pr-2">
                <button
                  onClick={() => handleRemove(index)}
                  className="text-sm px-2 hover:cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  value={skill.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  placeholder="Skill"
                  className="input input-bordered m-2"
                />

                <input
                  type="number"
                  min="1"
                  max="5"
                  value={skill.proficiency}
                  onChange={(e) =>
                    handleChange(index, "proficiency", e.target.value)
                  }
                  className="input input-bordered m-2 w-16"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4">
          {!editSkill && (
            <button
              onClick={addMore}
              className="text-blue-600 hover:cursor-pointer hover:underline"
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

export default SkillModel;
