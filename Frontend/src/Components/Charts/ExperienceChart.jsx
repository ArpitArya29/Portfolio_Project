import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
} from "recharts";

import { chartColors } from "../../config/chartConfig";

const ExperienceChart = ({ experiences }) => {
  const nowYear = new Date().getFullYear();

  const getYear = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return isNaN(d.getTime()) ? null : d.getFullYear();
  };

  // 🔥 Clean data
  const data = (experiences || [])
    .map((exp) => {
      const start = getYear(exp.startDate);
      const isCurrent = !exp.endDate;
      const end = isCurrent ? nowYear : getYear(exp.endDate);

      if (start === null || end === null) return null;

      return {
        name: exp.company,
        start,
        end,
        duration: Math.max(end - start, 0.5),
        role: exp.role,
        isCurrent,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.start - b.start);

  console.log(data);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;

    return (
      <div className="bg-zinc-900 text-white px-4 py-3 rounded-lg shadow-lg border border-zinc-700">
        <p className="font-semibold text-sm">{data.name}</p>

        <p className="text-xs text-zinc-400 mt-1">
          {data.start} – {data.isCurrent ? "Present" : data.end}
        </p>

        {data.role && (
          <p className="text-xs mt-2 text-indigo-400">{data.role}</p>
        )}
      </div>
    );
  };

  const renderBar = (minYear, maxYear) => (props) => {
    const { x, y, height, payload, background } = props;

    if (!background || !background.width) return null;

    const fullWidth = background.width;
    const totalRange = Math.max(maxYear - minYear, 1);

    const startOffset = ((payload.start - minYear) / totalRange) * fullWidth;

    const barWidth = (payload.duration / totalRange) * fullWidth;

    return (
      <rect
        x={x + startOffset}
        y={y}
        width={Math.max(barWidth, 6)}
        height={height}
        fill={payload.isCurrent ? "#22C55E" : "#6366F1"}
        rx={6}
      />
    );
  };

  const years = data.flatMap((d) => [d.start, d.end]);

  const minYear = years.length > 0 ? Math.min(...years) - 1 : nowYear - 5;

  const maxYear = years.length > 0 ? Math.max(...years) + 1 : nowYear;

  console.log(minYear, maxYear);
  console.log("years", years);

  const range = Math.max(maxYear - minYear, 1);

  return (
    <div className="bg-slate-950 border border-white/10 p-8 rounded-xl h-96 flex flex-col items-center shadow-inner shadow-black/20">
      <h2 className="font-semibold mb-3 text-lg text-white">
        Experience Timeline
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data}>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" />

          <XAxis
            type="number"
            domain={[minYear, maxYear]}
            allowDataOverflow={true}
            stroke={chartColors.text}
            tick={{ fill: chartColors.text }}
            ticks={Array.from({ length: range + 1 }, (_, i) => minYear + i)}
          />

          <YAxis
            dataKey="name"
            type="category"
            width={120}
            stroke={chartColors.text}
            tick={{ fill: chartColors.text }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="duration"
            barSize={24}
            shape={renderBar(minYear, maxYear)}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExperienceChart;
