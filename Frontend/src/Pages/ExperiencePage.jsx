import React, { useEffect, useState } from "react";
import { useExperienceStore } from "../Stores/useExperienceStore";
import { Loader } from "lucide-react";
import ExperienceCard from "../Components/ExperienceCard";
import ExperienceModel from "../Components/ExperienceModel";

const ExperiencePage = () => {
  const { allExperiences, isFetchingExperience, getAllExperiences } =
    useExperienceStore();

  const [openModel, setOpenModel] = useState(false);
  const [editExperience, setEditExperience] = useState(null);

  if (isFetchingExperience) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="h-5 w-5" />
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <h1 className="text-4xl font-bold text-white bg-linear-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text">
          Your Experiences
        </h1>
        <button
          onClick={() => {
            setEditExperience(null);
            setOpenModel(true);
          }}
          className="bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          + Add Experience
        </button>
      </div>

      {/* Experiences card */}
      {allExperiences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allExperiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onEdit={() => {
                setEditExperience(experience);
                setOpenModel(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <p className="text-xl font-semibold text-slate-300">
              No experiences to show
            </p>
            <p className="text-slate-400 mt-2">
              Start by adding your first experience!
            </p>
          </div>
        </div>
      )}

      {/* Model */}
      {openModel && (
        <ExperienceModel
          editExperience={editExperience}
          onClose={() => {
            setOpenModel(false);
          }}
        />
      )}
    </div>
  );
};

export default ExperiencePage;
