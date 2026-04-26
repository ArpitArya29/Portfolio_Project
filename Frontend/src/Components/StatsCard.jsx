import React from "react";

const StatsCard = ({ skills, projects, experiences, portfolios }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {[
        { label: "Your Total Skills", value: skills.length },
        { label: "Your Total Projects", value: projects.length },
        { label: "Your Total Experiences", value: experiences.length },
        { label: "Your Total Portfolios", value: portfolios.length },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-base-100 border border-base-300 p-5 rounded-xl shadow"
        >
          <p className="text-base-content/60">{item.label}</p>
          <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
