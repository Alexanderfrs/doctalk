
import React, { useEffect } from "react";
import { useMobileOnboarding } from "@/hooks/useMobileOnboarding";
import AppHeader from "@/components/layout/AppHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import HelpButton from "@/components/tutorial/HelpButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDashboardData } from "@/hooks/useDashboardData";
import { TutorialProvider } from "@/contexts/TutorialContext";
import { LearningObjective } from "@/hooks/useLearningRoadmap";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const { shouldShowOnboarding } = useMobileOnboarding();
  const { roadmap, roadmapLoading, progressData, statsData, profile } = useDashboardData();

  // Mobile onboarding check happens in useMobileOnboarding hook
  // This ensures mobile users always complete onboarding

  const handleObjectiveClick = (objective: LearningObjective) => {
    // Handle objective click - could navigate to specific practice or scenario
    console.log("Objective clicked:", objective);
  };

  if (roadmapLoading && !roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500"></div>
      </div>
    );
  }

  return (
    <TutorialProvider>
      <div className="min-h-screen flex flex-col dark:bg-neutral-900">
        {isMobile ? <MobileHeader /> : <AppHeader />}
        
        <main className={`flex-grow ${isMobile ? 'pt-16 pb-20' : 'pt-24'} px-4 md:px-8`}>
          <div className="container mx-auto space-y-6">
            <div data-tutorial-target="dashboard-header">
              <DashboardHeader profileName={profile?.name} />
            </div>
            
            <div data-tutorial-target="dashboard-content">
              <DashboardTabs 
                roadmap={roadmap}
                roadmapLoading={roadmapLoading}
                germanLevel={profile?.german_level}
                onObjectiveClick={handleObjectiveClick}
              />
            </div>
          </div>
        </main>
        
        {!isMobile && <Footer />}
        <HelpButton />
      </div>
    </TutorialProvider>
  );
};

export default Dashboard;
