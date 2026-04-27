import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ProjectOverviewChart from "./ProjectChartComponents/ProjectOverviewChart";
import StatItem from "./ProjectChartComponents/StatItem";

const ProjectChart = ({ projects }) => {
  const total = projects.length;
  const live = projects.filter((p) => p.live_link).length;
  const github = projects.filter((p) => p.github_link).length;

  const livePercent = ((live / total) * 100).toFixed(1);
  const githubPercentage = ((github / total) * 100).toFixed(1);

  return (
    <div className="bg-slate-950 border border-white/10  p-8 rounded-2xl flex flex-col items-center h-96 shadow-inner shadow-black/20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
        {/* left */}
        <ProjectOverviewChart projects={projects} />

        {/* right */}
        <div className="space-y-6 w-full lg:w-64 p-4 bg-white/5 rounded-xl border border-white/5 max-w-full overflow-hidden">
          <StatItem
            color="#6366F1"
            title="Total Projects"
            subtitle="All projects in your portfolio"
            value={total}
            percent={100}
          />

          <StatItem
            color="#22C55E"
            title="Live Projects"
            subtitle="Projects with live link"
            value={live}
            percent={livePercent}
          />

          <StatItem
            color="#FACC15"
            title="Github Projects"
            subtitle="projects with github link"
            value={github}
            percent={githubPercentage}
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-white/5 rounded-xl text-sm text-slate-300 border border-white/5">
        Nice! You have{" "}
        <span className="text-green-400 font-semibold">{live}</span> live
        projects and{" "}
        <span className="text-yellow-400 font-semibold"> {github}</span>{" "}
        projects on GitHub.
      </div>
    </div>
  );
};

export default ProjectChart;
