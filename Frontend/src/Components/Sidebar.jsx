import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Stores/useAuthStore";

import img1 from "../assets/portlio_image_e.png";
import img2 from "../assets/portlio_image_exp.png";

import {
  Briefcase,
  Code,
  Folder,
  LayoutDashboard,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const menuItems = [
    { name: "DashBoard", link: "/app/dashboard", icon: LayoutDashboard },
    { name: "Skills", link: "/app/skills", icon: Code },
    { name: "Projects", link: "/app/projects", icon: Folder },
    { name: "Experiences", link: "/app/experiences", icon: Briefcase },
    { name: "Portfolios", link: "/app/portfolios", icon: User },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div
      className={`relative flex flex-col justify-between bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-4 min-h-screen transition-all duration-300 shadow-[0_30px_60px_-36px_rgba(0,0,0,0.9)] border border-white/10 ring-1 ring-white/5 ${isExpanded ? "w-64" : "w-24"}`}
    >
      <div>
        <div
          className={`h-1 rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 mb-5 transition-all duration-300 ${isExpanded ? "w-full" : "w-16"}`}
        />

        {/* Toggle */}
        <div className="flex justify-between items-center mb-2 transition-all duration-300">
          <img
            src={isExpanded ? img2 : img1}
            alt="logo_Image"
            className={`transition-all duration-300 object-contain ${isExpanded ? "h-30 w-auto" : "h-15 w-10"}`}
          />

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cyan-400/40 hover:bg-white/10"
          >
            {isExpanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.link}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${isActive ? "bg-white/10 text-white shadow-sm shadow-cyan-500/10 ring-1 ring-cyan-400/15" : "hover:bg-white/10 hover:text-white"}`
                }
              >
                <Icon className="w-5 h-5 text-cyan-200 transition-colors duration-200 group-hover:text-white" />
                {isExpanded && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User section */}
      <div className="border-t border-white/10 pt-4 mt-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <img
            src={authUser?.image || "https://via.placeholder.com/40"}
            alt="user"
            className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
          />
          {/* Name */}
          {isExpanded && (
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">
                {authUser?.name || "User"}
              </p>
              <p className="text-xs text-slate-400">Product Owner</p>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="logout"
            className="rounded-full border border-red-500/20 p-2 text-red-300 transition hover:border-red-400/40 hover:bg-white/5 hover:text-red-200"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
