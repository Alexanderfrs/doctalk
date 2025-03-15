
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // Check localStorage for authentication status (temporary solution)
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />;
};

export default Index;
