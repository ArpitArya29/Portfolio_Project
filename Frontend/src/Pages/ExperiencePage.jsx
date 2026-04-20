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

  useEffect(() => {
    getAllExperiences();
  }, []);

  if (isFetchingExperience) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="h-5 w-5" />
      </div>
    );
  }
  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full p-8">
        <h1 className="text-4xl font-bold underline">Your Experiences</h1>
        <button
          onClick={() => {
            setEditExperience(null);
            setOpenModel(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition cursor-pointer"
        >
          + Add Experience
        </button>
      </div>

      {/* Experiences card */}
      {allExperiences.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
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
        <div className="text-center">
          <p className="text-xl font-bold">No any Experience to Show</p>
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
