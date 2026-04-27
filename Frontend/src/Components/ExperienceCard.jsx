import React, { useState } from "react";
import { useExperienceStore } from "../Stores/useExperienceStore";
import { Pencil, Trash, MapPin, CalendarCheck2, Building2 } from "lucide-react";

const ExperienceCard = ({ experience, onEdit }) => {
  const { deleteExperience, isDeletingExperience } = useExperienceStore();

  const [expanded, setExpanded] = useState(false);

  const formatDate = (date) => {
    if (!date) return "Present";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:bg-white/10 cursor-pointer"
    >
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white">
            {experience.role}
          </h2>

          <p className="text-sm text-slate-300 flex items-center gap-2 mt-1">
            <Building2 size={16} className="text-green-400" />
            {experience.company}
          </p>

          <p className="mt-2 text-sm text-slate-400 flex items-center gap-2">
            <MapPin size={16} className="text-blue-400" />
            {experience.location}
          </p>

          <p className="text-xs text-slate-400 mt-2 flex items-center gap-2">
            <CalendarCheck2 size={16} className="text-purple-400" />
            {formatDate(experience.startDate)} -{" "}
            {formatDate(experience.endDate)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="group p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Pencil
              size={18}
              className="text-green-400 transition-all duration-200 group-hover:text-green-300"
            />
          </button>

          <button
            disabled={isDeletingExperience}
            onClick={(e) => {
              e.stopPropagation();
              deleteExperience(experience.id);
            }}
            className="group p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Trash
              size={18}
              className="text-red-400 transition-all duration-200 group-hover:text-red-300"
            />
          </button>
        </div>
      </div>

      {/* Description */}
      <div
        className={`mt-4 text-sm text-slate-300 transition-all duration-200 border-t border-white/10 pt-4 ${expanded ? "max-h-96 opacity-100" : "max-h-16 overflow-hidden opacity-80"}`}
      >
        {experience.description}
      </div>
    </div>
  );
};

export default ExperienceCard;
