import React, { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuthStore } from "./Stores/useAuthStore";
import UserDashboard from "./Pages/UserDashboard";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "../Routes/ProtectedRoute";
import AppLayout from "../Layouts/AppLayout";
import SkillSPage from "./Pages/SkillSPage";
import ExperiencePage from "./Pages/ExperiencePage";
import ProjectPage from "./Pages/ProjectPage";
import PortfolioPage from "./Pages/PortfolioPage";
import UserPortfolioPage from "./Pages/UserPortfolioPage";

const App = () => {
  const { authUser, isCheckingAuth, checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Toaster />

      <Routes>
        <Route
          path="/"
          element={
            authUser ? <Navigate to={"/app"} /> : <Navigate to={"/login"} />
          }
        />

        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/app"} />}
        />

        <Route
          path="/register"
          element={!authUser ? <Signup /> : <Navigate to={"/app"} />}
        />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="skills" element={<SkillSPage />} />
          <Route path="experiences" element={<ExperiencePage />} />
          <Route path="projects" element={<ProjectPage />} />
          <Route path="portfolios" element={<PortfolioPage />} />
        </Route>

        <Route path="/portfolio/:publicId" element={<UserPortfolioPage/>}/>
      </Routes>
    </div>
  );
};

export default App;
