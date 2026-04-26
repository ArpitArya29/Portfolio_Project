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
      className={`flex flex-col justify-between bg-gray-900 text-white p-4 min-h-screen transition-all duration-300 ${isExpanded ? "w-64" : "w-24"}`}
    >
      <div>
        {/* Toggle */}
        <div className="flex justify-end mb-6 shadow-sm transition-all duration-300">
          <img src={ isExpanded ? img2 : img1} alt="logo_Image" className={`transition-all duration-300 ${isExpanded ? "px-3 py-2" : "p-2"}`}/>

          
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <ChevronLeft className="text-white hover:text-blue-500" />
            ) : (
              <ChevronRight className="text-white hover:text-blue-500" />
            )}
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.link}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800 hover:text-white"}`
                }
              >
                <Icon className="w-5 h-5" />
                {isExpanded && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User section */}
      <div className="border-t border-gray-700 pt-4 mt-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <img
            src={authUser?.image || "https://via.placeholder.com/40"}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />
          {/* Name */}
          {isExpanded && (
            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                {authUser?.name || "User"}
              </p>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="logout"
            className="text-red-400 hover:text-red-500"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
