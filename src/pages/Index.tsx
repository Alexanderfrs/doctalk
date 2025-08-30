
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMobileOnboarding } from "@/hooks/useMobileOnboarding";

const Index = () => {
  const { isAuthenticated, onboardingComplete, isLoading } = useAuth();
  const navigate = useNavigate();
  const { shouldShowOnboarding, isMobileUser } = useMobileOnboarding();

  useEffect(() => {
    // Log auth status for debugging
    console.log("Auth status:", { isAuthenticated, onboardingComplete, isLoading, isMobileUser, shouldShowOnboarding });
    
    // Handle navigation after auth check is complete
    if (!isLoading) {
      if (isAuthenticated) {
        // Mobile users: check onboarding status with mobile-specific logic
        if (shouldShowOnboarding) {
          console.log("Mobile user redirecting to onboarding");
          navigate("/onboarding");
        } else if (onboardingComplete === false) {
          console.log("Redirecting to onboarding");
          navigate("/onboarding");
        } else {
          // If authenticated and onboarding complete, redirect to dashboard
          console.log("Redirecting to dashboard");
          navigate("/dashboard");
        }
      } else {
        // CRITICAL FIX: Redirect to /landing instead of / to prevent infinite loop
        console.log("Redirecting to landing page");
        navigate("/landing");
      }
    }
  }, [isAuthenticated, onboardingComplete, isLoading, navigate, shouldShowOnboarding, isMobileUser]);

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
