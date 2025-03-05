
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScenarioCard from "@/components/ui/ScenarioCard";
import ProgressBar from "@/components/ui/ProgressBar";
import scenarios from "@/data/scenarios";
import { BookOpen, CheckCircle, MessageCircle, Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Home, Book, Activity, User } from "lucide-react";

const Dashboard = () => {
  const [activeScenarios, setActiveScenarios] = useState(scenarios.slice(0, 3));
  const [loadingPage, setLoadingPage] = useState(true);
  const [userProgress, setUserProgress] = useState({
    completedScenarios: 2,
    totalScenarios: scenarios.length,
    masteredVocabulary: 15,
    totalVocabulary: 38,
    streak: 3,
  });

  const { translate } = useLanguage();

  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Placeholder stats for the demo
  const userStats = {
    lastActivity: "2023-06-15",
    weeklyGoal: 5,
    weeklyProgress: 3,
  };

  const navItems = [
    { name: "Dashboard", url: "/dashboard", icon: Home },
    { name: "Übungen", url: "/practice", icon: Activity },
    { name: "Vokabeln", url: "/vocabulary", icon: Book },
    { name: "Profil", url: "/profile", icon: User }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${loadingPage ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <Header />
      
      <main className="flex-grow pt-24 px-4 md:px-8 pb-20">
        <div className="container mx-auto">
          {/* Welcome section */}
          <section className="mb-10">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">
                    Willkommen zurück, Elena!
                  </h1>
                  <p className="text-neutral-600 mt-2">
                    Du hast eine Lernserie von 3 Tagen. Weiter so!
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button asChild className="bg-medical-500 hover:bg-medical-600">
                    <Link to="/practice">
                      Mit dem Lernen fortfahren
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Progress overview */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
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
          
          {/* Recent scenarios */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <MessageCircle className="mr-2 h-5 w-5 text-medical-600" />
                Empfohlene Übungen
              </h2>
              <Button asChild variant="ghost" className="text-medical-600 hover:text-medical-700 hover:bg-medical-50">
                <Link to="/practice" className="flex items-center">
                  Alle anzeigen
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeScenarios.map((scenario) => (
                <ScenarioCard 
                  key={scenario.id} 
                  scenario={scenario} 
                  onClick={() => console.log(`Navigate to scenario: ${scenario.id}`)}
                />
              ))}
            </div>
          </section>
          
          {/* Recent activity and statistics */}
          <section className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                <h3 className="text-lg font-semibold mb-4">Letzte Aktivitäten</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <MessageCircle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">Szenario abgeschlossen</p>
                      <p className="text-sm text-neutral-500">Patientenaufnahme - Notfall</p>
                    </div>
                    <span className="ml-auto text-xs text-neutral-400">Vor 2 Stunden</span>
                  </div>
                  
                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">5 Vokabeln gemeistert</p>
                      <p className="text-sm text-neutral-500">Kategorie: Notfallmedizin</p>
                    </div>
                    <span className="ml-auto text-xs text-neutral-400">Gestern</span>
                  </div>
                  
                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Neues Tagesziel erreicht</p>
                      <p className="text-sm text-neutral-500">3 Tage in Folge gelernt</p>
                    </div>
                    <span className="ml-auto text-xs text-neutral-400">Vor 2 Tagen</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                <h3 className="text-lg font-semibold mb-4">Deine Statistiken</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">Gesamtlernzeit</p>
                    <p className="text-2xl font-bold">5h 23m</p>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">Korrekte Antworten</p>
                    <p className="text-2xl font-bold">78%</p>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">Übungen absolviert</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-500 mb-1">Vokabelkarten</p>
                    <p className="text-2xl font-bold">86</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Sprachniveau Fortschritt</h4>
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
      
      <NavBar items={navItems} className="z-50" />
      <Footer />
    </div>
  );
};

export default Dashboard;
