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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl w-full max-w-md space-y-4 max-h-[90vh] flex flex-col shadow-2xl">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">
            {editSkill ? "Edit Skill" : "Add Skills"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name || index}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <div className="text-end pr-2">
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  value={skill.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  placeholder="Skill"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
                />

                <input
                  type="number"
                  min="1"
                  max="5"
                  value={skill.proficiency}
                  onChange={(e) =>
                    handleChange(index, "proficiency", e.target.value)
                  }
                  className="w-16 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4">
          {!editSkill && (
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

export default SkillModel;
