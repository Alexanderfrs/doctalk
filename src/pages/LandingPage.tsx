
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLandingPage from "@/components/mobile/MobileLandingPage";
import WebLandingPage from "@/components/landing/WebLandingPage";
import { ViewModeProvider } from "@/contexts/ViewModeContext";
import { LandingPageProps } from "@/types/landing";

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const isMobile = useIsMobile();

  // Add error boundary to prevent crashes
  try {
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
  } catch (error) {
    console.error("Error rendering landing page:", error);
    
    // Fallback UI if landing page fails
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to DocTalk</h1>
          <p className="text-gray-600 mb-4">Loading...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-medical-500 mx-auto"></div>
        </div>
      </div>
    );
  }
};

export default LandingPage;
