
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

const Dashboard = () => {
  const isMobile = useIsMobile();
  const { shouldShowOnboarding } = useMobileOnboarding();
  const { dashboardData, isLoading, error } = useDashboardData();

  // Mobile onboarding check happens in useMobileOnboarding hook
  // This ensures mobile users always complete onboarding

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Error loading dashboard</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
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
              <DashboardHeader />
            </div>
            
            <div data-tutorial-target="dashboard-content">
              <DashboardTabs dashboardData={dashboardData} />
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
