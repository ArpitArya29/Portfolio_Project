import React from "react";
import { useSkillsStore } from "../Stores/useSkillsStore";
import { Pencil, Trash } from "lucide-react";

const SkillCard = ({ skill, onEdit }) => {
  const { deleteSkill, isDeletingSkill } = useSkillsStore();

  const renderStars = (level) => {
    return "⭐".repeat(level);
  };

  return (
    <div className="bg-base-100 rounded-xl shadow-sm p-6 flex justify-between transition hover:shadow-md duration-200">
      <div>
        <h2 className="font-semibold text-xl">
          {skill.name?.charAt(0).toUpperCase() + skill.name?.slice(1)}
        </h2>
        <p className="text-sm text-gray-500">
          {renderStars(skill.proficiency)}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2  text-blue-400 transition-colors duration-200 hover:text-blue-600 "
        >
          <Pencil size={18} />
        </button>

        <button
          disabled={isDeletingSkill}
          onClick={() => deleteSkill(skill.id)}
          className="p-2  text-red-400 transition-colors duration-200 hover:text-red-600"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default SkillCard;
