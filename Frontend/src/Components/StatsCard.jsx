import React from "react";

const StatsCard = ({ skills, projects, experiences, portfolios }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: "Your Total Skills", value: skills.length },
        { label: "Your Total Projects", value: projects.length },
        { label: "Your Total Experiences", value: experiences.length },
        { label: "Your Total Portfolios", value: portfolios.length },
      ].map((item, index) => (
        <div
          key={item.label}
          className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <p className="text-slate-400 text-sm">{item.label}</p>
          <h2 className="text-3xl font-bold mt-2 text-white">{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
