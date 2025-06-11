
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLandingPage from "@/components/mobile/MobileLandingPage";
import WebLandingPage from "@/components/landing/WebLandingPage";
import { LandingPageProps } from "@/types/landing";

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const isMobile = useIsMobile();

  // Render mobile-specific landing page for mobile devices
  if (isMobile) {
    return <MobileLandingPage />;
  }

  // Render web-optimized landing page for desktop/tablet
  return <WebLandingPage onLogin={onLogin} />;
};

export default LandingPage;
