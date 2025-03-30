
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import AppHeader from "@/components/layout/AppHeader";
import ScenarioCard from "@/components/ui/ScenarioCard";
import ProgressOverview from "@/components/home/ProgressOverview";
import scenarios from "@/data/scenarios";
import { 
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/use-mobile";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import AppNavigation from "@/components/navigation/AppNavigation";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardProps {
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeScenarios, setActiveScenarios] = useState(scenarios.slice(0, 3));
  const [loadingPage, setLoadingPage] = useState(true);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  const { profile } = useAuth();
  const { translate } = useLanguage();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  // User progress data - in a real app, this would come from the database
  const [userProgress, setUserProgress] = useState({
    completedScenarios: profile?.preferences?.completedScenarios || 2,
    totalScenarios: scenarios.length,
    masteredVocabulary: profile?.preferences?.masteredVocabulary || 15,
    totalVocabulary: 38,
    streak: profile?.preferences?.streak || 3,
  });
  
  // User goals/stats - in a real app, this would come from the database
  const [userStats, setUserStats] = useState({
    lastActivity: profile?.preferences?.lastActivity || "2023-06-15",
    weeklyGoal: profile?.preferences?.weeklyGoal || 5,
    weeklyProgress: profile?.preferences?.weeklyProgress || 3,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Update user progress when profile changes
    if (profile?.preferences) {
      setUserProgress(prev => ({
        ...prev,
        completedScenarios: profile.preferences.completedScenarios || prev.completedScenarios,
        masteredVocabulary: profile.preferences.masteredVocabulary || prev.masteredVocabulary,
        streak: profile.preferences.streak || prev.streak,
      }));
      
      setUserStats(prev => ({
        ...prev,
        lastActivity: profile.preferences.lastActivity || prev.lastActivity,
        weeklyGoal: profile.preferences.weeklyGoal || prev.weeklyGoal,
        weeklyProgress: profile.preferences.weeklyProgress || prev.weeklyProgress,
      }));
    }
  }, [profile]);

  const handleSwipe = (index: number) => {
    setCurrentScenarioIndex(index);
  };

  const userName = profile?.name || "User";
  const firstName = userName.split(" ")[0];

  return (
    <div className={`min-h-screen flex flex-col ${loadingPage ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <AppHeader onLogout={onLogout} />
      
      <main className="flex-grow pt-24 px-4 md:px-8 pb-20">
        <div className="container mx-auto">
          <section className="mb-10 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">
                    {t('welcome')} {firstName}!
                  </h1>
                  <p className="text-neutral-600 mt-2">
                    {t('streak').includes('Streak') ? 
                      `You have a learning streak of ${userProgress.streak} days. Keep it up!` : 
                      `${t('youHaveStreak')} ${userProgress.streak} ${t('days')}. ${t('keepItUp')}!`}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button asChild className="bg-medical-500 hover:bg-medical-600">
                    <Link to="/practice">
                      {t('continueLearn')}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          <ProgressOverview 
            userProgress={userProgress}
            userStats={userStats}
          />
          
          <section className="mb-10 animate-fade-in" style={{ animationDelay: '700ms' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                {t('recommendedExercises')}
              </h2>
              <Button asChild variant="ghost" className="text-medical-600 hover:text-medical-700 hover:bg-medical-50">
                <Link to="/practice" className="flex items-center">
                  {t('showAll')}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {isMobile ? (
              <div className="px-4 py-2">
                <SwipeableContainer
                  onSwipe={handleSwipe}
                  showIndicators={true}
                  className="h-[350px] mb-4"
                >
                  {activeScenarios.map((scenario) => (
                    <div key={scenario.id} className="px-2 w-full h-full">
                      <ScenarioCard 
                        scenario={scenario} 
                        onClick={() => console.log(`Navigate to scenario: ${scenario.id}`)}
                        className="h-full"
                      />
                    </div>
                  ))}
                </SwipeableContainer>
                
                <div className="text-center text-sm text-medical-600 mt-2">
                  <span className="inline-flex items-center">
                    {t('swipeToSwitch')}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeScenarios.map((scenario) => (
                  <ScenarioCard 
                    key={scenario.id} 
                    scenario={scenario} 
                    onClick={() => console.log(`Navigate to scenario: ${scenario.id}`)}
                  />
                ))}
              </div>
            )}
          </section>
          
          <section className="mb-10 animate-fade-in" style={{ animationDelay: '900ms' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                <h3 className="text-lg font-semibold mb-4">{t('recentActivities')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <div className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">{t('scenarioCompleted')}</p>
                      <p className="text-sm text-neutral-500">{t('patientAdmission')}</p>
                    </div>
                    <span className="ml-auto text-xs text-neutral-400">{t('hoursAgo', { count: 2 })}</span>
                  </div>
                  
                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <div className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{t('vocabularyMastered', { count: 5 })}</p>
                      <p className="text-sm text-neutral-500">{t('categoryEmergency')}</p>
                    </div>
                    <span className="ml-auto text-xs text-neutral-400">{t('yesterday')}</span>
                  </div>
                  
                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <div className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{t('dailyGoalReached')}</p>
                      <p className="text-sm text-neutral-500">{t('daysInARow', { count: 3 })}</p>
                    </div>
                    <span className="ml-auto text-xs text-neutral-400">{t('daysAgo', { count: 2 })}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                <h3 className="text-lg font-semibold mb-4">{t('yourStats')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">{t('totalLearningTime')}</p>
                    <p className="text-2xl font-bold">5h 23m</p>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">{t('correctAnswers')}</p>
                    <p className="text-2xl font-bold">78%</p>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">{t('exercisesCompleted')}</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">{t('vocabularyCards')}</p>
                    <p className="text-2xl font-bold">86</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">{t('languageLevelProgress')}</h4>
                  <div className="w-full bg-neutral-100 h-2 rounded-full">
                    <div 
                      className="bg-medical-500 h-2 rounded-full" 
                      style={{width: '35%'}}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-neutral-500">A1</span>
                    <span className="text-xs text-neutral-500">A2</span>
                    <span className="text-xs font-medium text-medical-600">B1</span>
                    <span className="text-xs text-neutral-500">B2</span>
                    <span className="text-xs text-neutral-500">C1</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <AppNavigation />
      <Footer />
    </div>
  );
};

export default Dashboard;
