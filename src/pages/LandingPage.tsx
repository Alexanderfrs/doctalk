
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLandingPage from "@/components/mobile/MobileLandingPage";
import WebLandingPage from "@/components/landing/WebLandingPage";
import { LandingPageProps } from "@/types/landing";

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const isMobile = useIsMobile();

  // Ensure immediate rendering without delays
  return (
    <div className="opacity-100 visible">
      {isMobile ? (
        <MobileLandingPage />
      ) : (
        <WebLandingPage onLogin={onLogin} />
      )}
    </div>
  );
};

export default LandingPage;
