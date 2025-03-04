import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScenarioCard from "@/components/ui/ScenarioCard";
import ProgressBar from "@/components/ui/ProgressBar";
import scenarios from "@/data/scenarios";
import { BookOpen, CheckCircle, MessageCircle, Stethoscope, Calendar, ArrowRight } from "lucide-react";

const Index = () => {
  const [activeScenarios, setActiveScenarios] = useState(scenarios.slice(0, 3));
  const [loadingPage, setLoadingPage] = useState(true);
  const [userProgress, setUserProgress] = useState({
    completedScenarios: 2,
    totalScenarios: scenarios.length,
    masteredVocabulary: 15,
    totalVocabulary: 38,
    streak: 3,
  });

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

  return (
    <div className={`min-h-screen flex flex-col ${loadingPage ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <Header />
      
      <main className="flex-grow pt-24 px-4 md:px-8">
        {/* Hero section */}
        <section className="container mx-auto mb-12">
          <div className="glass-panel p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <span className="inline-block px-3 py-1 bg-medical-100 text-medical-800 rounded-full text-sm font-medium mb-4">
                Medizinisches Deutsch B1-B2
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-800">
                Verbessere deine <span className="text-gradient">medizinische Kommunikation</span>
              </h1>
              <p className="text-lg text-neutral-600 mb-6">
                Trainiere Dialogszenarien und Fachvokabular für deinen beruflichen Alltag im Gesundheitswesen.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="btn-primary">
                  <Link to="/practice">Übung starten</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="btn-secondary">
                  <Link to="/vocabulary">Vokabeln lernen</Link>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="relative border-8 border-white rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" 
                  alt="Medizinisches Personal bei der Arbeit" 
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-800/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Progress overview */}
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
        
        {/* Recent scenarios */}
        <section className="container mx-auto mb-12 animate-fade-in" style={{ animationDelay: '700ms' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold flex items-center">
              <Stethoscope className="mr-2 h-5 w-5 text-medical-600" />
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
        
        {/* Features section */}
        <section className="container mx-auto mb-12 animate-fade-in" style={{ animationDelay: '900ms' }}>
          <h2 className="text-2xl font-semibold mb-6 text-center">Warum MedLingua?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Realistische Szenarien</h3>
              <p className="text-neutral-600 text-sm">
                Übe mit authentischen Dialogen aus dem medizinischen Alltag, die speziell für B1-B2 Sprachniveau entwickelt wurden.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Fachvokabular</h3>
              <p className="text-neutral-600 text-sm">
                Lerne und festige medizinische Fachbegriffe und Redewendungen, die du in deinem Berufsalltag benötigst.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Personalisiertes Lernen</h3>
              <p className="text-neutral-600 text-sm">
                Dein Lernfortschritt wird analysiert, um dir gezielt die Übungen anzubieten, die du am meisten benötigst.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="container mx-auto mb-16 animate-fade-in" style={{ animationDelay: '1100ms' }}>
          <div className="bg-gradient-to-r from-medical-600 to-medical-500 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Bereit, deine Sprachfähigkeiten zu verbessern?</h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Starte jetzt mit den Übungen und verbessere deine berufliche Kommunikation im medizinischen Bereich.
            </p>
            <Button asChild size="lg" className="bg-white text-medical-600 hover:bg-white/90">
              <Link to="/practice">Mit Übungen beginnen</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
