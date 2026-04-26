import React, { useEffect, useState } from "react";
import { useSkillsStore } from "../Stores/useSkillsStore";
import { Key, Loader } from "lucide-react";
import SkillCard from "../Components/SkillCard";
import SkillModel from "../Components/SkillModel";

const SkillSPage = () => {
  const { getAllSkills, isFetchingSkills, allSkills } = useSkillsStore();

  const [openModel, setOpenModel] = useState(false);
  const [editSkill, setEditSkill] = useState(null);

  if (isFetchingSkills) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-5 w-5" />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full p-8">
        <h1 className="text-4xl font-bold underline">Your Skills</h1>
        <button
          onClick={() => {
            setEditSkill(null);
            setOpenModel(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition cursor-pointer"
        >
          + Add Skills
        </button>
      </div>

      {/* Skill Grid */}
      {allSkills.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {allSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onEdit={() => {
                setEditSkill(skill);
                setOpenModel(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl font-bold">No any skills to show</p>
        </div>
      )}

      {/* Model */}
      {openModel && (
        <SkillModel onClose={() => setOpenModel(false)} editSkill={editSkill} />
      )}
    </div>
  );
};

export default SkillSPage;
