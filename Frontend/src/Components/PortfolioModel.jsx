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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-base-200 w-150 max-h-[90vh] flex flex-col rounded-xl">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">
            {editPortfolio ? "Edit Portfolio" : "Create Portfolio"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <label className="label">
              <span className="label-text font-medium">Portfolio Title</span>
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Portfolio Title"
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Bio</span>
            </label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short bio..."
              className="textarea textarea-bordered w-full min-h-24 bg-base-100"
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

        <div className="p-4 border-t flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModel;
