
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
  return (
    <section className="container mx-auto mb-12 animate-fade-in" style={{ animationDelay: '500ms' }}>
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <Calendar className="mr-2 h-5 w-5 text-medical-600" />
        Dein Fortschritt
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
          <div className="flex items-center mb-3">
            <MessageCircle className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="text-lg font-medium">Szenarien</h3>
          </div>
          <ProgressBar 
            value={userProgress.completedScenarios} 
            max={userProgress.totalScenarios} 
            showValue={true}
            label="Abgeschlossene Szenarien"
            className="mb-2"
          />
          <p className="text-sm text-neutral-500">
            {userProgress.completedScenarios} von {userProgress.totalScenarios} abgeschlossen
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
          <div className="flex items-center mb-3">
            <BookOpen className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-medium">Vokabeln</h3>
          </div>
          <ProgressBar 
            value={userProgress.masteredVocabulary} 
            max={userProgress.totalVocabulary} 
            showValue={true}
            color="success"
            label="Beherrschte Vokabeln"
            className="mb-2"
          />
          <p className="text-sm text-neutral-500">
            {userProgress.masteredVocabulary} von {userProgress.totalVocabulary} gemeistert
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
          <div className="flex items-center mb-3">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-lg font-medium">Wöchentliches Ziel</h3>
          </div>
          <ProgressBar 
            value={userStats.weeklyProgress} 
            max={userStats.weeklyGoal} 
            showValue={true}
            color="default"
            label="Übungen diese Woche"
            className="mb-2"
          />
          <div className="flex items-center">
            <div className="text-sm text-neutral-500">
              {userStats.weeklyProgress} von {userStats.weeklyGoal} Übungen
            </div>
            <div className="ml-auto flex items-center">
              <span className="text-sm font-medium text-medical-600 mr-1">{userProgress.streak}</span>
              <span className="text-sm text-neutral-500">Tage Streak</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressOverview;
