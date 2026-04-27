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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text">
          Welcome back, {authUser?.name || "User"}!
        </h1>
        <p className="text-slate-400 text-lg">
          Here's an overview of your portfolio
        </p>
      </div>

      {/* Stats Section */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          Portfolio Stats
        </h3>
        <StatsCard
          skills={allSkills}
          projects={allProjects}
          experiences={allExperiences}
          portfolios={allPortfolios}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-full overflow-hidden">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            Skills Distribution
          </h3>
          <SkillsBarChart skills={allSkills} />
        </div>
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-full overflow-hidden">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400"></span>
            Skills Breakdown
          </h3>
          <SkillsPieChart skills={allSkills} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-full overflow-hidden">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            Experience Timeline
          </h3>
          <ExperienceChart experiences={allExperiences} />
        </div>
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-full overflow-hidden">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            Project Overview
          </h3>
          <ProjectChart projects={allProjects} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
