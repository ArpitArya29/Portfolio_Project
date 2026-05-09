import React from "react";
import { Pencil } from "lucide-react";

const Profile = ({ user, onEdit }) => {
  return (
    <div className="max-w-5xl mx-auto rounded-4xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
      <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] items-center">
        <div className="relative mx-auto">
          <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-cyan-400/30 shadow-xl shadow-cyan-500/10">
            <img
              src={user?.image}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-2xl" />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">
              Profile overview
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-white">
              {user?.name || "Your name"}
            </h2>
            <p className="mt-2 max-w-2xl text-slate-400">
              Manage your account details, social links, and personal profile
              information.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/70 border border-white/10 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Email
              </p>
              <p className="mt-2 text-base text-white">
                {user?.email || "Not set"}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950/70 border border-white/10 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Role
              </p>
              <p className="mt-2 text-base text-white">
                {user?.role || "Member"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {user?.github_url && (
              <a
                href={user.github_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-cyan-500/10 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20"
              >
                GitHub
              </a>
            )}
            {user?.linkedIn_url && (
              <a
                href={user.linkedIn_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-violet-500/10 px-5 py-3 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20"
              >
                LinkedIn
              </a>
            )}
            <button
              onClick={onEdit}
              className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              <Pencil size={16} className="inline-block mr-2" />
              Edit profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
