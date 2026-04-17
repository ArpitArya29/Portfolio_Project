import React, { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuthStore } from "./Stores/useAuthStore";
import UserDashboard from "./Pages/UserDashboard";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

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
    <div className="flex flex-col items-center justify-start">
      <Toaster />

      <Routes>
        <Route
          path="/"
          element={authUser ? <UserDashboard /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />

        <Route
          path="/register"
          element={!authUser ? <Signup /> : <Navigate to={"/"} />}
        />

        <Route
          path="/user"
          element={authUser ? <UserDashboard /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
