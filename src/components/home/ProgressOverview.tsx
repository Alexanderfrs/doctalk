
import React from "react";
import { BookOpen, Calendar, CheckCircle, MessageCircle } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";

interface ProgressOverviewProps {
  userProgress: {
    completedScenarios: number;
    totalScenarios: number;
    masteredVocabulary: number;
    totalVocabulary: number;
    streak: number;
  };
  userStats: {
    lastActivity: string;
    weeklyGoal: number;
    weeklyProgress: number;
  };
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ userProgress, userStats }) => {
  // Ensure we have valid data to prevent component disappearing
  const safeUserProgress = {
    completedScenarios: userProgress?.completedScenarios ?? 0,
    totalScenarios: userProgress?.totalScenarios ?? 50,
    masteredVocabulary: userProgress?.masteredVocabulary ?? 0,
    totalVocabulary: userProgress?.totalVocabulary ?? 500,
    streak: userProgress?.streak ?? 0
  };

  const safeUserStats = {
    lastActivity: userStats?.lastActivity ?? new Date().toISOString().split('T')[0],
    weeklyGoal: userStats?.weeklyGoal ?? 120,
    weeklyProgress: userStats?.weeklyProgress ?? 0
  };

  return (
    <section className="mb-8" style={{ animationDelay: '500ms' }}>
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 flex items-center">
        <Calendar className="mr-2 h-5 w-5 text-medical-600" />
        Dein Fortschritt
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-neutral-100">
          <div className="flex items-center mb-3">
            <MessageCircle className="h-5 md:h-6 w-5 md:w-6 text-yellow-500 mr-2" />
            <h3 className="text-base md:text-lg font-medium">Szenarien</h3>
          </div>
          <ProgressBar 
            value={safeUserProgress.completedScenarios} 
            max={safeUserProgress.totalScenarios} 
            showValue={true}
            label="Abgeschlossene Szenarien"
            className="mb-2"
          />
          <p className="text-sm text-neutral-500">
            {safeUserProgress.completedScenarios} von {safeUserProgress.totalScenarios} abgeschlossen
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-neutral-100">
          <div className="flex items-center mb-3">
            <BookOpen className="h-5 md:h-6 w-5 md:w-6 text-blue-500 mr-2" />
            <h3 className="text-base md:text-lg font-medium">Vokabeln</h3>
          </div>
          <ProgressBar 
            value={safeUserProgress.masteredVocabulary} 
            max={safeUserProgress.totalVocabulary} 
            showValue={true}
            color="success"
            label="Beherrschte Vokabeln"
            className="mb-2"
          />
          <p className="text-sm text-neutral-500">
            {safeUserProgress.masteredVocabulary} von {safeUserProgress.totalVocabulary} gemeistert
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-neutral-100">
          <div className="flex items-center mb-3">
            <CheckCircle className="h-5 md:h-6 w-5 md:w-6 text-green-500 mr-2" />
            <h3 className="text-base md:text-lg font-medium">Wöchentliches Ziel</h3>
          </div>
          <ProgressBar 
            value={safeUserStats.weeklyProgress} 
            max={safeUserStats.weeklyGoal} 
            showValue={true}
            color="default"
            label="Übungen diese Woche"
            className="mb-2"
          />
          <div className="flex items-center">
            <div className="text-sm text-neutral-500">
              {safeUserStats.weeklyProgress} von {safeUserStats.weeklyGoal} Übungen
            </div>
            <div className="ml-auto flex items-center">
              <span className="text-sm font-medium text-medical-600 mr-1">{safeUserProgress.streak}</span>
              <span className="text-sm text-neutral-500">Tage Streak</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressOverview;
