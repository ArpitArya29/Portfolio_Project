import React, { useState } from "react";
import { useUserStore } from "../Stores/useUserStore";

const ProfileUpdateModel = ({ user, onClose }) => {
  const { updateUserDetails, isUpdatingUserDetails } = useUserStore();

  const userObject = {
    name: user?.name || "",
    image: user?.image || "",
    linkedIn_url: user?.linkedIn_url || "",
    github_url: user?.github_url || "",
  };

  const [userData, setUserData] = useState(userObject);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpdate = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setUserData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", userData.name);
    formData.append("linkedIn_url", userData.linkedIn_url);
    formData.append("github_url", userData.github_url);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      await updateUserDetails(formData);
    } catch (error) {
      console.error("Error updating user:", error);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-4xl border border-white/10 bg-slate-900/95 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
        <div className="absolute -left-24 top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -right-24 top-24 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative p-8 sm:p-10 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-3xl font-black text-white sm:text-4xl">
                Update Profile
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300/80 sm:text-base">
                Update your display name, profile image, and social links with a
                sleek polished layout.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.8fr_1.2fr]">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => handleUpdate("name", e.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-800/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Enter your name"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-1">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={userData.linkedIn_url}
                    onChange={(e) =>
                      handleUpdate("linkedIn_url", e.target.value)
                    }
                    className="w-full rounded-3xl border border-white/10 bg-slate-800/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={userData.github_url}
                    onChange={(e) => handleUpdate("github_url", e.target.value)}
                    className="w-full rounded-3xl border border-white/10 bg-slate-800/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 text-center shadow-inner shadow-black/10">
              <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-600 bg-slate-900">
                {userData.image ? (
                  <img
                    src={userData.image}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-slate-400">
                    Upload profile photo
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => document.getElementById("imageUpload").click()}
                className="inline-flex items-center justify-center rounded-3xl bg-linear-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
              >
                Choose Image
              </button>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />

              <p className="mt-6 text-sm leading-6 text-slate-400">
                Use a crisp headshot or avatar to keep your profile polished and
                memorable.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-slate-950/80 px-8 py-5 backdrop-blur-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              Your profile is visible to recruiters and collaborators.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isUpdatingUserDetails}
                className="inline-flex items-center justify-center rounded-3xl bg-linear-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdatingUserDetails ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateModel;
