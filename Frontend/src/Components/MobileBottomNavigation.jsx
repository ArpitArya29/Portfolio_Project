import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Briefcase, Code, Folder, LayoutDashboard, User } from "lucide-react";
import { useAuthStore } from "../Stores/useAuthStore";

const menuItems = [
  { name: "Dashboard", link: "/app/dashboard", icon: LayoutDashboard },
  { name: "Skills", link: "/app/skills", icon: Code },
  { name: "Projects", link: "/app/projects", icon: Folder },
  { name: "Experiences", link: "/app/experiences", icon: Briefcase },
  { name: "Portfolios", link: "/app/portfolios", icon: User },
];

const MobileBottomNavigation = () => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-4xl rounded-t-3xl border-t border-white/10 bg-slate-950/95 p-3 shadow-[0_-15px_40px_-20px_rgba(15,23,42,0.9)] backdrop-blur-xl text-slate-300 sm:hidden"
      aria-label="Mobile bottom navigation"
    >
      

      <div className="flex items-center justify-between gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.link}
              className={({ isActive }) =>
                `flex min-w-18 flex-1 flex-col items-center justify-center gap-1 rounded-3xl px-2 py-2 text-[11px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm shadow-cyan-500/20"
                    : "hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNavigation;
