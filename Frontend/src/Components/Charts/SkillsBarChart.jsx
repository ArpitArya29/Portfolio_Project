import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { chartColors } from "../../config/chartConfig";

const SkillsBarChart = ({ skills }) => {
  console.log(skills);

  const data = skills.map((s) => ({
    name: s.name.charAt(0).toUpperCase() + s.name.slice(1),
    level: s.proficiency,
  }));

  console.log(data);

  return (
    <div className="bg-base-100 border border-base-300 p-8 rounded-xl h-96 flex flex-col justify-center items-center">
      <h2 className="font-semibold mb-3 text-lg">Skill Proficiency</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            stroke={chartColors.text}
            tick={{
              fill: chartColors.text,
              fontSize: 16,
            }}
            angle={-45}
            textAnchor="end"
            interval={0}
            height={80}
          />
          <YAxis stroke={chartColors.text} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
          />
          <Bar dataKey="level" fill="#6366F1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsBarChart;
