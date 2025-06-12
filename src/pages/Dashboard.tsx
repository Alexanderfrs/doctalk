
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTutorial } from "@/contexts/TutorialContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import ProgressOverview from "@/components/home/ProgressOverview";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import Header from "@/components/layout/Header";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import HelpButton from "@/components/tutorial/HelpButton";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { LearningObjective } from "@/hooks/useLearningRoadmap";

const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const { startTutorial, isCompleted } = useTutorial();
  const { roadmap, roadmapLoading, progressData, statsData } = useDashboardData();
  const isMobile = useIsMobile();

  // Auto-start tutorial for new users
  useEffect(() => {
    if (user && profile && !isCompleted) {
      const hasSeenTutorial = localStorage.getItem('tutorial-completed') === 'true';
      if (!hasSeenTutorial) {
        // Start tutorial after a short delay to ensure page is loaded
        setTimeout(() => {
          startTutorial();
        }, 1000);
      }
    }
  }, [user, profile, isCompleted, startTutorial]);

  const handleObjectiveClick = (objective: LearningObjective) => {
    if (objective.scenarioIds?.length > 0) {
      // Navigate to scenarios page or specific scenario
      toast.info(`Navigiere zu ${objective.title} Szenarien`);
    } else if (objective.vocabularyTopics?.length > 0) {
      // Navigate to vocabulary page with specific topics
      toast.info(`Navigiere zu ${objective.title} Vokabeln`);
    } else {
      toast.info(`${objective.title} wird bald verfügbar sein`);
    }
  };

  // Loading state
  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-50 to-white">
      {isMobile ? <MobileHeader /> : <Header />}
      
      <main className={`flex-grow ${isMobile ? 'pt-24 px-4 pb-32' : 'pt-24 px-4 md:px-8 pb-20'}`}>
        <div className="container mx-auto max-w-7xl">
          <DashboardHeader profileName={profile?.name} />

          {/* Progress Overview - Always show, even during loading */}
          <div data-tutorial-target="progress-overview" className={isMobile ? 'mb-6' : 'mb-8'}>
            <ProgressOverview 
              userProgress={progressData} 
              userStats={statsData} 
            />
          </div>

          {/* Main Content Tabs */}
          <DashboardTabs
            roadmap={roadmap}
            roadmapLoading={roadmapLoading}
            germanLevel={profile?.german_level}
            onObjectiveClick={handleObjectiveClick}
          />
        </div>
      </main>
      
      {!isMobile && <Footer />}
      {isMobile && <BottomNavigation />}
      <HelpButton />
    </div>
  );
};

export default Dashboard;
