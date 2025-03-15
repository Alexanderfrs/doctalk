
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, onboardingComplete, isLoading } = useAuth();

  useEffect(() => {
    // Log auth status for debugging
    console.log("Auth status:", { isAuthenticated, onboardingComplete, isLoading });
  }, [isAuthenticated, onboardingComplete, isLoading]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500"></div>
      </div>
    );
  }

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
