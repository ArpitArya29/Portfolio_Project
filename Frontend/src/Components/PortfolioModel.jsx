import React, { useEffect, useState } from "react";
import { useSkillsStore } from "../Stores/useSkillsStore";
import { useProjectStore } from "../Stores/useProjectStore";
import { useExperienceStore } from "../Stores/useExperienceStore";
import { usePortfolioStore } from "../Stores/usePortfolioStore";
import MultiselectSection from "./MultiselectSection";

const PortfolioModel = ({ editPortfolio, onClose }) => {
  const { allSkills } = useSkillsStore();
  const { allProjects } = useProjectStore();
  const { allExperiences } = useExperienceStore();

  const { addPortfolio, updatePortfolio } = usePortfolioStore();

  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");

  const [initialSkills, setInitialSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [initialProjects, setInitialProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);

  const [initialExp, setInitialExp] = useState([]);
  const [selectedExp, setSelectedExp] = useState([]);

  useEffect(() => {
    if (editPortfolio) {
      setTitle(editPortfolio.title || "");
      setBio(editPortfolio.bio || "");

      const s = editPortfolio.skills.map((skill) => skill.id);
      const p = editPortfolio.projects.map((project) => project.id);
      const e = editPortfolio.experiences.map((exp) => exp.id);

      setInitialSkills(s);
      setSelectedSkills(s);

      setInitialProjects(p);
      setSelectedProjects(p);

      setInitialExp(e);
      setSelectedExp(e);
    }
  }, [editPortfolio]);

  const getDiff = (initial, current) => {
    return {
      add: current.filter((id) => !initial.includes(id)),
      remove: initial.filter((id) => !current.includes(id)),
    };
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    if (editPortfolio) {
      const skillDiff = getDiff(initialSkills, selectedSkills);

      const projDiff = getDiff(initialProjects, selectedProjects);

      const expDiff = getDiff(initialExp, selectedExp);

      const data = {
        title,
        bio,
        addSkillIds: skillDiff.add,
        deleteSkillIds: skillDiff.remove,
        addProjectIds: projDiff.add,
        deleteProjectIds: projDiff.remove,
        addExperienceIds: expDiff.add,
        deleteExperienceIds: expDiff.remove,
      };

      await updatePortfolio(data, editPortfolio.id);
    } else {
      const data = {
        title,
        bio,
        skillIds: selectedSkills,
        projectIds: selectedProjects,
        experienceIds: selectedExp,
      };

      await addPortfolio(data);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-slate-900 border border-white/10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">
            {editPortfolio ? "Edit Portfolio" : "Create Portfolio"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Portfolio Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Portfolio Title"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Bio
            </label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short bio..."
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors min-h-24 resize-none"
            />
          </div>

          <MultiselectSection
            title="Skills"
            items={allSkills}
            selected={selectedSkills}
            setSelected={setSelectedSkills}
          />

          <MultiselectSection
            title="Projects"
            items={allProjects}
            selected={selectedProjects}
            setSelected={setSelectedProjects}
          />

          <MultiselectSection
            title="Experiences"
            items={allExperiences}
            selected={selectedExp}
            setSelected={setSelectedExp}
          />
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

export default PortfolioModel;
