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
      className="bg-base-100 rounded-xl shadow-sm p-5 transition-all duration-300 hover:shadow-md cursor-pointer"
    >
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-white-800">
            {experience.role}
          </h2>

          <p className="text-sm text-gray-400">{experience.company} </p>

          <p className="mt-2 text-sm text-gray-400 flex gap-1">
            {" "}
            <MapPin />
            {experience.location}
          </p>

          <p className="tetx-xs text-gray-400 mt-1 flex gap-1">
            <CalendarCheck2 />
            <>
              {formatDate(experience.startDate)} -{" "}
              {formatDate(experience.endDate)}
            </>
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="group p-2"
          >
            <Pencil
              size={18}
              className="text-blue-400 transition-all duration-200 group-hover:text-blue-600"
            />
          </button>

          <button
            disabled={isDeletingExperience}
            onClick={(e) => {
              e.stopPropagation();
              deleteExperience(experience.id);
            }}
            className="group p-2"
          >
            <Trash
              size={18}
              className="text-red-400 transition-all duration-200 group-hover:text-red-600"
            />
          </button>
        </div>
      </div>

      {/* Description */}
      <div
        className={`mt-4 text-sm text-gray-600 transition-all duration-200 text-center border-t border-gray-500 pt-4 ${expanded ? "max-h-96 opacity-100" : "max-h-16 overflow-hidden opacity-80"}`}
      >
        {experience.description}
      </div>
    </div>
  );
};

export default ExperienceCard;
