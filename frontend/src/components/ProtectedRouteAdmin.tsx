import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRouteAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isLoading  } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // hoặc spinner UI
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouteAdmin;
