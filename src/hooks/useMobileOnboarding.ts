
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

export const useMobileOnboarding = () => {
  const { isAuthenticated, onboardingComplete, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Only handle mobile users
    if (!isMobile || isLoading) return;

    // If authenticated but onboarding not complete, force onboarding
    if (isAuthenticated && onboardingComplete === false) {
      console.log("Mobile user needs onboarding - redirecting");
      navigate("/onboarding");
      return;
    }

    // Additional mobile-specific checks for incomplete profiles
    if (isAuthenticated && onboardingComplete === true && profile) {
      const hasMobileEssentialData = profile.profession && profile.native_language;
      
      if (!hasMobileEssentialData) {
        console.log("Mobile user missing essential profile data - redirecting to onboarding");
        navigate("/onboarding");
        return;
      }
    }
  }, [isAuthenticated, onboardingComplete, profile, isLoading, isMobile, navigate]);

  return {
    shouldShowOnboarding: isMobile && isAuthenticated && onboardingComplete === false,
    isMobileUser: isMobile && isAuthenticated
  };
};
