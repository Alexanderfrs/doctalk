
import React from "react";
import AppHeader from "@/components/layout/AppHeader";
import Footer from "@/components/layout/Footer";
import ProgressOverview from "@/components/home/ProgressOverview";
import RecentScenarios from "@/components/home/RecentScenarios";
import { useLanguage } from "@/contexts/LanguageContext";
import scenarios from "@/data/scenarios";
import { Calendar, BookOpen, Trophy } from "lucide-react";

const Dashboard = () => {
  const { translate } = useLanguage();

  // Mock user progress data - in a real app this would come from a backend
  const userProgress = {
    completedScenarios: 12,
    totalScenarios: scenarios.length,
    masteredVocabulary: 145,
    totalVocabulary: 400,
    streak: 7
  };

  const userStats = {
    lastActivity: "2024-01-15",
    weeklyGoal: 5,
    weeklyProgress: 3
  };

  // Get recent/recommended scenarios
  const activeScenarios = scenarios.slice(0, 6).map(scenario => ({
    ...scenario,
    completed: Math.random() > 0.7, // Random completion status for demo
    progress: Math.floor(Math.random() * 100)
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-800 mb-2">
            Willkommen zurück!
          </h1>
          <p className="text-neutral-600">
            Setzen Sie Ihr medizinisches Deutsch-Training fort
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-medical-50 to-blue-50 rounded-xl p-6 border border-medical-100">
            <div className="flex items-center mb-3">
              <Trophy className="h-6 w-6 text-yellow-500 mr-3" />
              <h3 className="text-lg font-medium text-medical-800">Tagesziel</h3>
            </div>
            <div className="text-2xl font-bold text-medical-700">{userStats.weeklyProgress}/5</div>
            <p className="text-sm text-medical-600">Übungen heute</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center mb-3">
              <Calendar className="h-6 w-6 text-green-500 mr-3" />
              <h3 className="text-lg font-medium text-green-800">Streak</h3>
            </div>
            <div className="text-2xl font-bold text-green-700">{userProgress.streak}</div>
            <p className="text-sm text-green-600">Tage in Folge</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center mb-3">
              <BookOpen className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-medium text-blue-800">Vokabeln</h3>
            </div>
            <div className="text-2xl font-bold text-blue-700">{userProgress.masteredVocabulary}</div>
            <p className="text-sm text-blue-600">gelernt</p>
          </div>
        </div>

        {/* Progress Overview */}
        <ProgressOverview 
          userProgress={userProgress}
          userStats={userStats}
        />

        {/* Recent Scenarios */}
        <RecentScenarios activeScenarios={activeScenarios} />

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-medical-600" />
            Schnellzugriff
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/practice"
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-medical-200 transition-colors">
                  <BookOpen className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="font-medium text-neutral-800">Üben</h3>
                <p className="text-sm text-neutral-600 mt-1">Neue Szenarien starten</p>
              </div>
            </a>
            
            <a
              href="/vocabulary"
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-neutral-800">Vokabeln</h3>
                <p className="text-sm text-neutral-600 mt-1">Wortschatz erweitern</p>
              </div>
            </a>
            
            <a
              href="/profile"
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                  <Trophy className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-neutral-800">Profil</h3>
                <p className="text-sm text-neutral-600 mt-1">Fortschritt anzeigen</p>
              </div>
            </a>
            
            <a
              href="/certification"
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-neutral-800">Zertifikat</h3>
                <p className="text-sm text-neutral-600 mt-1">Prüfung ablegen</p>
              </div>
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
