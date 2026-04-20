import React, { useState } from "react";

import Sidebar from "../src/Components/Sidebar";
import Navbar from "../src/Components/Navbar";

import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <div className="flex h-screen w-full">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <div className="flex-1 flex flex-col w-full">
        <Navbar />

        <main className="flex-1 w-full p-4 overflow-y-auto bg-base-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
