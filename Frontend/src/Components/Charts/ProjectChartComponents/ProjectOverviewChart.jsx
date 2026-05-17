import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const ProjectOverviewChart = ({ projects }) => {
  const total = projects.length;
  const live = projects.filter((p) => p.live_link).length;
  const github = projects.filter((p) => p.github_link).length;

  const livePercent = (live / total) * 100;
  const githubPercentage = (github / total) * 100;

  return (
    <div className="relative w-64 h-56 min-h-0">
      <div className="w-full h-full min-h-0">
        <ResponsiveContainer
          width="100%"
          height={224}
          minWidth={0}
          minHeight={0}
        >
          <PieChart>
            {/* Outer ring (total) */}
            <Pie
              data={[{ value: 100 }]}
              outerRadius={98}
              innerRadius={83}
              dataKey="value"
              stroke="none"
            >
              <Cell fill="#27272A" />
            </Pie>
            <Pie
              data={[{ value: 100 }]}
              outerRadius={98}
              innerRadius={83}
              dataKey="value"
              stroke="none"
              cornerRadius={50}
            >
              <Cell fill="#6366F1" />
            </Pie>

            {/* Middle ring (live) */}
            <Pie
              data={[{ value: 100 }]}
              outerRadius={75}
              innerRadius={62}
              dataKey="value"
              stroke="none"
            >
              <Cell fill="#27272A" />
            </Pie>
            <Pie
              data={[{ value: livePercent }]}
              outerRadius={75}
              innerRadius={62}
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
              outerRadius={48}
              innerRadius={38}
              dataKey="value"
              stroke="none"
            >
              <Cell fill="#27272A" />
            </Pie>
            <Pie
              data={[{ value: githubPercentage }]}
              outerRadius={48}
              innerRadius={38}
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
      </div>

      {/* Centre text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <p className="text-sm text-gray-300">Total Projects</p>
        <p className="text-3xl font-bold">{total}</p>
      </div>
    </div>
  );
};

export default ProjectOverviewChart;
