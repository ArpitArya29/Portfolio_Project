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
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <h1 className="text-4xl font-bold text-white bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text">
          Your Skills
        </h1>
        <button
          onClick={() => {
            setEditSkill(null);
            setOpenModel(true);
          }}
          className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          + Add Skills
        </button>
      </div>

      {/* Skill Grid */}
      {allSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <div className="text-center py-12">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <p className="text-xl font-semibold text-slate-300">
              No skills to show
            </p>
            <p className="text-slate-400 mt-2">
              Start by adding your first skill!
            </p>
          </div>
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
