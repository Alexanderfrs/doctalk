
import React from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // Check localStorage for authentication status (temporary solution)
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const onboardingComplete = localStorage.getItem("onboardingComplete") === "true";

  // Logic for redirection
  if (isAuthenticated) {
    // If authenticated but onboarding not complete, redirect to onboarding
    if (!onboardingComplete) {
      return <Navigate to="/onboarding" replace />;
    }
    // If authenticated and onboarding complete, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  // If not authenticated, redirect to landing page
  return <Navigate to="/" replace />;
};

export default Index;
