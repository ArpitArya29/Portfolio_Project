import React, { useState } from "react";

import Sidebar from "../src/Components/Sidebar";
import Navbar from "../src/Components/Navbar";

import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <div className="flex h-screen">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <div className="flex flex-column">
        <Navbar />

        <main className="p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
