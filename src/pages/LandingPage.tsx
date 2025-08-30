
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLandingPage from "@/components/mobile/MobileLandingPage";
import WebLandingPage from "@/components/landing/WebLandingPage";
import { ViewModeProvider } from "@/contexts/ViewModeContext";
import { LandingPageProps } from "@/types/landing";

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const isMobile = useIsMobile();

  return (
    <ViewModeProvider>
      <div className="opacity-100 visible">
        {isMobile ? (
          <MobileLandingPage />
        ) : (
          <WebLandingPage onLogin={onLogin} />
        )}
      </div>
    </ViewModeProvider>
  );
};

export default LandingPage;
