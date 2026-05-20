import React, { useState } from "react";

import Sidebar from "../src/Components/Sidebar";
import Navbar from "../src/Components/Navbar";
import MobileBottomNavigation from "../src/Components/MobileBottomNavigation";

import { Outlet } from "react-router-dom";
import HeaderProfile from "../src/Components/HeaderProfile";

const AppLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <div className="flex h-screen w-full">
      <div className="hidden md:flex">
        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </div>

      <div className="flex-1 flex flex-col w-full bg-slate-950">
        <HeaderProfile/>

        <main className="flex-1 w-full p-5 pb-24 md:p-6 md:pb-6 overflow-y-auto bg-slate-950">
          <div className="min-h-full rounded-4xl border border-white/10 bg-white/5/10 p-5 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.8)] backdrop-blur-xl">
            <Outlet />
          </div>
        </main>

        <MobileBottomNavigation />
      </div>
    </div>
  );
};

export default AppLayout;
