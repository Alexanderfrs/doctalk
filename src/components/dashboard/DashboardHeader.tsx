
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  profileName?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ profileName }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'mb-4 mt-2' : 'mb-8'}`} data-tutorial-target="welcome-header">
      <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-medical-800 mb-2`}>
        Willkommen zurück{profileName ? `, ${profileName}` : ''}!
      </h1>
      <p className="text-gray-600">
        Hier ist Ihr Lernfortschritt und Ihre personalisierten Empfehlungen.
      </p>
    </div>
  );
};

export default DashboardHeader;
