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

  // const data = [
  //   {
  //     name: "Total",
  //     value: total,
  //     color: "#6366F1",
  //   },
  //   {
  //     name: "Live",
  //     value: live,
  //     color: "#22C55E",
  //   },
  //   {
  //     name: "Github",
  //     value: githib,
  //     color: "#F59E0B",
  //   },
  // ];
  return (
    <div className="bg-base-100 border border-base-300 p-8 rounded-2xl flex flex-col items-center h-96">
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg">Project Overview</h2>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* left */}
        <ProjectOverviewChart projects={projects} />

        {/* right */}
        <div className="space-y-6 w-72">
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

        {/* Legend */}
        {/* <div className="space-y-3 text-sm">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-base-content/80">
                {item.name} : {item.value}
              </span>
            </div>
          ))}
        </div> */}
      </div>

      <div className="mt-6 p-4 bg-base-200 rounded-xl text-sm text-gray-300">
        Nice! You have <span className="text-green-400">{live}</span> live
        projects and <span className="text-yellow-400"> {github}</span> projects
        on GitHub.
      </div>
    </div>
  );
};

export default ProjectChart;
