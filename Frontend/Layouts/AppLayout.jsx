import React, { useState } from "react";

import Sidebar from "../src/Components/Sidebar";
import Navbar from "../src/Components/Navbar";

import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <div className="flex h-screen w-full">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <div className="flex-1 flex flex-col w-full bg-slate-950">
        <Navbar />

        <main className="flex-1 w-full p-5 md:p-6 overflow-y-auto bg-slate-950">
          <div className="min-h-full rounded-4xl border border-white/10 bg-white/5/10 p-5 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.8)] backdrop-blur-xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
