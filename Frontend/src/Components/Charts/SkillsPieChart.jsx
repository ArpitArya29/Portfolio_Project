import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { chartColors } from "../../config/chartConfig";

const SkillsPieChart = ({ skills }) => {
  const data = [
    {
      name: "High",
      value: skills.filter((s) => s.proficiency >= 4).length,
      condition: ">=4",
    },
    {
      name: "Medium",
      value: skills.filter((s) => s.proficiency === 3).length,
      condition: "=3",
    },
    {
      name: "Low",
      value: skills.filter((s) => s.proficiency <= 2).length,
      condition: "<=2",
    },
  ];

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const COLORS = ["#6366F1", "#F59E0B", "#3F3F46"];
  return (
    <div className="bg-slate-950 border border-white/10 rounded-xl h-96 p-8 flex flex-col items-center justify-center shadow-inner shadow-black/20">
      <h2 className="font-semibold text-lg text-white">Skill Distribution</h2>
      <div className="flex items-center justify-around">
        <PieChart width={300} height={300}>
          <Pie data={data} dataKey="value" outerRadius={100} stroke="none">
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181B",
              border: "1px solid #27272A",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
        </PieChart>
        <div className="space-y-3 text-sm">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 text-center rounded-lg font-bold text-white"
              style={{ backgroundColor: COLORS[idx] }}
            >
              <div className="w-3 h-3 rounded-sm" />
              <span>
                {item.name} [{item.condition}] (
                {Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPieChart;
