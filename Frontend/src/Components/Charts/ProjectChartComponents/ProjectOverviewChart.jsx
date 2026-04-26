import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const ProjectOverviewChart = ({ projects }) => {
  const total = projects.length;
  const live = projects.filter((p) => p.live_link).length;
  const github = projects.filter((p) => p.github_link).length;

  const livePercent = (live / total) * 100;
  const githubPercentage = (github / total) * 100;

  return (
    <div className="relative w-64 h-56">
      <ResponsiveContainer>
        <PieChart>
          {/* Outer ring (total) */}
          <Pie
            data={[{ value: 100 }]}
            outerRadius={110}
            innerRadius={95}
            dataKey="value"
            stroke="none"
          >
            <Cell fill="#27272A" />
          </Pie>
          <Pie
            data={[{ value: 100 }]}
            outerRadius={110}
            innerRadius={95}
            dataKey="value"
            stroke="none"
            cornerRadius={50}
          >
            <Cell fill="#6366F1" />
          </Pie>

          {/* Middle ring (live) */}
          <Pie
            data={[{ value: 100 }]}
            outerRadius={85}
            innerRadius={72}
            dataKey="value"
            stroke="none"
          >
            <Cell fill="#27272A" />
          </Pie>
          <Pie
            data={[{ value: livePercent }]}
            outerRadius={85}
            innerRadius={72}
            dataKey="value"
            stroke="none"
            cornerRadius={50}
            startAngle={90}
            endAngle={90 - (livePercent / 100) * 360}
          >
            <Cell fill="#22C55E" />
          </Pie>

          {/* Inner ring */}
          <Pie
            data={[{ value: 100 }]}
            outerRadius={62}
            innerRadius={50}
            dataKey="value"
            stroke="none"
          >
            <Cell fill="#27272A" />
          </Pie>
          <Pie
            data={[{ value: githubPercentage }]}
            outerRadius={62}
            innerRadius={50}
            dataKey="value"
            stroke="none"
            cornerRadius={50}
            startAngle={90}
            endAngle={90 - (githubPercentage / 100) * 360}
          >
            <Cell fill="#FACC15" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Centre text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <p className="text-sm text-gray-300">Total Projects</p>
        <p className="text-3xl font-bold">{total}</p>
      </div>
    </div>
  );
};

export default ProjectOverviewChart;
