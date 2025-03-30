
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
  Activity,
  CheckCircle2,
  Clock,
  ClipboardCheck,
  BookOpen,
  Award
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/use-mobile";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import AppNavigation from "@/components/navigation/AppNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";
import { toast } from "sonner";
import RecentScenarios from "@/components/home/RecentScenarios";

interface DashboardProps {
  onLogout?: () => void;
}

interface UserActivity {
  type: string;
  title: string;
  description: string;
  timestamp: Date;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeScenarios, setActiveScenarios] = useState(scenarios.slice(0, 3));
  const [loadingPage, setLoadingPage] = useState(true);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);

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
    lastActivity: profile?.preferences?.lastActivity || format(new Date(), 'yyyy-MM-dd'),
    weeklyGoal: profile?.preferences?.weeklyGoal || 5,
    weeklyProgress: profile?.preferences?.weeklyProgress || 3,
    totalLearningTime: profile?.preferences?.totalLearningTime || 323, // in minutes
    correctAnswersPercentage: profile?.preferences?.correctAnswersPercentage || 78,
    exercisesCompleted: profile?.preferences?.exercisesCompleted || 12,
    vocabularyCards: profile?.preferences?.vocabularyCardsReviewed || 86,
    languageLevel: profile?.preferences?.languageLevel || "B1",
    languageLevelProgress: profile?.preferences?.languageLevelProgress || 35, // percentage
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
        totalLearningTime: profile.preferences.totalLearningTime || prev.totalLearningTime,
        correctAnswersPercentage: profile.preferences.correctAnswersPercentage || prev.correctAnswersPercentage,
        exercisesCompleted: profile.preferences.exercisesCompleted || prev.exercisesCompleted,
        vocabularyCards: profile.preferences.vocabularyCardsReviewed || prev.vocabularyCards,
        languageLevel: profile.preferences.languageLevel || prev.languageLevel,
        languageLevelProgress: profile.preferences.languageLevelProgress || prev.languageLevelProgress,
      }));
    }
  }, [profile]);

  useEffect(() => {
    // Fetch user activities - in real app this would come from database
    const fetchUserActivities = async () => {
      setIsLoadingActivities(true);
      try {
        // In a real app, we would fetch this from the database
        // For now, let's generate some mock data based on user profile
        const mockActivities: UserActivity[] = [
          {
            type: "scenario",
            title: t('scenarioCompleted'),
            description: t('patientAdmission'),
            timestamp: subDays(new Date(), 0.1), // 2 hours ago
          },
          {
            type: "vocabulary",
            title: t('vocabularyMastered', { count: 5 }),
            description: t('categoryEmergency'),
            timestamp: subDays(new Date(), 1),
          },
          {
            type: "goal",
            title: t('dailyGoalReached'),
            description: t('daysInARow', { count: userProgress.streak }),
            timestamp: subDays(new Date(), 2),
          }
        ];
        
        setUserActivities(mockActivities);
      } catch (error) {
        console.error("Error fetching user activities:", error);
        toast.error(t('errorFetchingActivities'));
      } finally {
        setIsLoadingActivities(false);
      }
    };
    
    fetchUserActivities();
  }, [userProgress.streak, t]);

  const handleSwipe = (index: number) => {
    setCurrentScenarioIndex(index);
  };

  const formatTimeFromMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "scenario":
        return (
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
            <Activity className="h-5 w-5 text-yellow-600" />
          </div>
        );
      case "vocabulary":
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <BookOpen className="h-5 w-5 text-blue-600" />
          </div>
        );
      case "goal":
        return (
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center mr-4">
            <Clock className="h-5 w-5 text-neutral-600" />
          </div>
        );
    }
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInHours < 1) {
      return t('justNow');
    } else if (diffInHours < 24) {
      return t('hoursAgo', { count: diffInHours });
    } else if (diffInDays === 1) {
      return t('yesterday');
    } else {
      return t('daysAgo', { count: diffInDays });
    }
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
          
          <RecentScenarios activeScenarios={activeScenarios} />
          
          <section className="mb-10 animate-fade-in" style={{ animationDelay: '900ms' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                <h3 className="text-lg font-semibold mb-4">{t('recentActivities')}</h3>
                {isLoadingActivities ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center p-3 bg-neutral-50 rounded-lg animate-pulse">
                        <div className="w-10 h-10 bg-neutral-200 rounded-full mr-4"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                        </div>
                        <div className="h-3 bg-neutral-200 rounded w-14"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userActivities.map((activity, idx) => (
                      <div key={idx} className="flex items-center p-3 bg-neutral-50 rounded-lg">
                        {getActivityIcon(activity.type)}
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-neutral-500">{activity.description}</p>
                        </div>
                        <span className="ml-auto text-xs text-neutral-400">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                <h3 className="text-lg font-semibold mb-4">{t('yourStats')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">{t('totalLearningTime')}</p>
                    <p className="text-2xl font-bold">{formatTimeFromMinutes(userStats.totalLearningTime)}</p>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">{t('correctAnswers')}</p>
                    <p className="text-2xl font-bold">{userStats.correctAnswersPercentage}%</p>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">{t('exercisesCompleted')}</p>
                    <p className="text-2xl font-bold">{userStats.exercisesCompleted}</p>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">{t('vocabularyCards')}</p>
                    <p className="text-2xl font-bold">{userStats.vocabularyCards}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">{t('languageLevelProgress')}</h4>
                  <div className="w-full bg-neutral-100 h-2 rounded-full">
                    <div 
                      className="bg-medical-500 h-2 rounded-full" 
                      style={{width: `${userStats.languageLevelProgress}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-neutral-500">A1</span>
                    <span className="text-xs text-neutral-500">A2</span>
                    <span className={`text-xs ${userStats.languageLevel === "B1" ? "font-medium text-medical-600" : "text-neutral-500"}`}>B1</span>
                    <span className={`text-xs ${userStats.languageLevel === "B2" ? "font-medium text-medical-600" : "text-neutral-500"}`}>B2</span>
                    <span className={`text-xs ${userStats.languageLevel === "C1" ? "font-medium text-medical-600" : "text-neutral-500"}`}>C1</span>
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
