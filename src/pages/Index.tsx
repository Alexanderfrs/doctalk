
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, onboardingComplete, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Log auth status for debugging
    console.log("Auth status:", { isAuthenticated, onboardingComplete, isLoading });
    
    // Handle navigation after auth check is complete
    if (!isLoading) {
      if (isAuthenticated) {
        // If authenticated, check if onboarding is complete
        if (onboardingComplete === false) {
          console.log("Redirecting to onboarding");
          navigate("/onboarding");
        } else {
          // If authenticated and onboarding complete, redirect to dashboard
          console.log("Redirecting to dashboard");
          navigate("/dashboard");
        }
      } else {
        // If not authenticated, redirect to landing page
        console.log("Redirecting to landing page");
        navigate("/");
      }
    }
  }, [isAuthenticated, onboardingComplete, isLoading, navigate]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500"></div>
      </div>
    );
  }
  
  // This will only render momentarily before navigating
  return null;
};

export default Index;
