import React from "react";
import { useSkillsStore } from "../Stores/useSkillsStore";
import { Pencil, Trash } from "lucide-react";

const SkillCard = ({ skill, onEdit }) => {
  const { deleteSkill, isDeletingSkill } = useSkillsStore();

  const renderStars = (level) => {
    return "⭐".repeat(level);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 flex justify-between transition-all duration-200 hover:shadow-xl hover:bg-white/10">
      <div>
        <h2 className="font-semibold text-xl text-white">
          {skill.name?.charAt(0).toUpperCase() + skill.name?.slice(1)}
        </h2>
        <p className="text-sm text-yellow-400">
          {renderStars(skill.proficiency)}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2 text-cyan-400 transition-colors duration-200 hover:text-cyan-300 rounded-lg hover:bg-white/5"
        >
          <Pencil size={18} />
        </button>

        <button
          disabled={isDeletingSkill}
          onClick={() => deleteSkill(skill.id)}
          className="p-2 text-red-400 transition-colors duration-200 hover:text-red-300 rounded-lg hover:bg-white/5"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default SkillCard;
