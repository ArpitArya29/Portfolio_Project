import React from "react";

const StatItem = ({ color, title, value, percent, subtitle }) => {
  return (
    <div className="flex justify-between items-center px-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg`} style={{ background: color }} />

        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-lg">{value}</p>
        <p className="text-sm text-gray-400">{percent}%</p>
      </div>
    </div>
  );
};

export default StatItem;
