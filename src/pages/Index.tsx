
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import scenarios from "@/data/scenarios";
import { useLanguage } from "@/contexts/LanguageContext";

// Import new component files
import HeroSection from "@/components/home/HeroSection";
import ProgressOverview from "@/components/home/ProgressOverview";
import RecentScenarios from "@/components/home/RecentScenarios";
import FeatureOverview from "@/components/home/FeatureOverview";
import CtaSection from "@/components/home/CtaSection";

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

  return (
    <div className={`min-h-screen flex flex-col ${loadingPage ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <Header />
      
      <main className="flex-grow pt-24 px-4 md:px-8">
        <HeroSection />
        <ProgressOverview userProgress={userProgress} userStats={userStats} />
        <RecentScenarios activeScenarios={activeScenarios} />
        <FeatureOverview />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
