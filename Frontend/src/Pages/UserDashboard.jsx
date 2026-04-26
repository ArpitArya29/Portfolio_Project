import React, { useEffect } from "react";
import { useAuthStore } from "../Stores/useAuthStore";

import { Loader } from "lucide-react";
import { useSkillsStore } from "../Stores/useSkillsStore";
import { useProjectStore } from "../Stores/useProjectStore";
import { useExperienceStore } from "../Stores/useExperienceStore";
import StatsCard from "../Components/StatsCard";
import SkillsBarChart from "../Components/Charts/SkillsBarChart";
import SkillsPieChart from "../Components/Charts/SkillsPieChart";
import ExperienceChart from "../Components/Charts/experienceChart";
import ProjectChart from "../Components/Charts/ProjectChart";
import { usePortfolioStore } from "../Stores/usePortfolioStore";

const UserDashboard = () => {
  const { authUser, isCheckingAuth } = useAuthStore();

  const { allSkills, getAllSkills } = useSkillsStore();
  const { allProjects, getAllProjects } = useProjectStore();
  const { allExperiences, getAllExperiences } = useExperienceStore();
  const { allPortfolios, getAllPortfolios } = usePortfolioStore();

  useEffect(() => {
    getAllSkills();
    getAllProjects();
    getAllExperiences();
    getAllPortfolios();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-base-200 min-h-screen">
      <StatsCard
        skills={allSkills}
        projects={allProjects}
        experiences={allExperiences}
        portfolios={allPortfolios}
      />

      <div className="grid grid-cols-2 gap-6">
        <SkillsBarChart skills={allSkills} />
        <SkillsPieChart skills={allSkills} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <ExperienceChart experiences={allExperiences} />
        <ProjectChart projects={allProjects} />
      </div>
    </div>
  );
};

export default UserDashboard;
