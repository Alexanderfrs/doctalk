
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // Check localStorage for authentication status (temporary solution)
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const onboardingComplete = localStorage.getItem("onboardingComplete") === "true";

  useEffect(() => {
    // Log auth status for debugging
    console.log("Auth status:", { isAuthenticated, onboardingComplete });
  }, []);

  // Logic for redirection
  if (isAuthenticated) {
    // If authenticated but onboarding not complete, redirect to onboarding
    if (!onboardingComplete) {
      console.log("Redirecting to onboarding");
      return <Navigate to="/onboarding" replace />;
    }
    // If authenticated and onboarding complete, redirect to dashboard
    console.log("Redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }
  
  // If not authenticated, redirect to landing page
  console.log("Redirecting to landing page");
  return <Navigate to="/" replace />;
};

export default Index;
