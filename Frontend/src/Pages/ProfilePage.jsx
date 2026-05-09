import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Stores/useAuthStore";
import Profile from "../Components/Profile";
import ProfileUpdateModel from "../Components/ProfileUpdateModel";
import { ChevronLeft } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const [openModel, setOpenModel] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/app/dashboard");
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10 md:px-10 lg:px-16 flex items-center">
      <div className="mx-auto max-w-6xl rounded-4xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.9)] backdrop-blur-xl md:p-8">
        <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">
                Profile
              </p>
              <h1 className="text-3xl font-semibold text-white md:text-4xl">
                My account information
              </h1>
            </div>
          </div>
          <button
            onClick={() => setOpenModel(true)}
            className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
          >
            Edit profile
          </button>
        </header>

        <Profile user={authUser} onEdit={() => setOpenModel(true)} />

        {openModel && (
          <ProfileUpdateModel
            user={authUser}
            onClose={() => setOpenModel(false)}
          />
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
