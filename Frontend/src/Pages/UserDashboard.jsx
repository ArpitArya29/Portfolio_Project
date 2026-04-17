import React, { useEffect } from "react";
import { useAuthStore } from "../Stores/useAuthStore";

import { Loader } from "lucide-react";

const UserDashboard = () => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return <div>Hello {authUser && authUser.name}</div>;
};

export default UserDashboard;
