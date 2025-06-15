import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/layout/AppHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import HelpButton from "@/components/tutorial/HelpButton";
import PracticeSearch from "@/components/practice/PracticeSearch";
import UnifiedPracticeFilters from "@/components/practice/UnifiedPracticeFilters";
import ScenarioGrid from "@/components/practice/ScenarioGrid";
import CollapsibleSection from "@/components/mobile/CollapsibleSection";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Target, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { useScenarios } from "@/hooks/useScenarios";
import { useIsMobile } from "@/hooks/use-mobile";

let practiceRenderCount = 0; // To track render counts

const Practice: React.FC = () => {
  practiceRenderCount++;
  const { user, profile } = useAuth();
  const { userProgress } = useProgressTracking();
  const { scenarios, isLoading } = useScenarios();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("Alle");

  console.log(`[Practice.tsx] Render #${practiceRenderCount}. isLoading: ${isLoading}, scenarios: ${scenarios.length}, selectedTopic: ${selectedTopic}, searchQuery: "${searchQuery}"`);

  useEffect(() => {
    console.log(`[Practice.tsx] useEffect for (isLoading, scenarios.length). isLoading: ${isLoading}, scenarios: ${scenarios.length}`);
  }, [isLoading, scenarios.length]);

  const handleClearFilters = () => {
    console.log('[Practice.tsx] Clearing filters.');
    setSearchQuery("");
    setSelectedTopic("Alle");
  };

  const handleQuickStart = () => {
    if (scenarios.length > 0) {
      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      console.log("[Practice.tsx] Starting random scenario:", randomScenario.id);
      navigate(`/scenario/${randomScenario.id}`);
    }
  };

  if (!user) {
    console.log('[Practice.tsx] User not authenticated, rendering login prompt.');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Bitte melden Sie sich an, um die Übungsseite zu sehen.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-50 to-white">
      {isMobile ? <MobileHeader /> : <AppHeader />}
      
      <main className={`flex-grow px-4 md:px-8 pb-12 ${isMobile ? 'pt-20 pb-24' : 'pt-24'}`}>
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className={`font-bold text-medical-800 mb-2 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
              Medizinische Szenarien üben
            </h1>
            <p className={`text-gray-600 ${isMobile ? 'text-sm' : ''}`}>
              Verbessern Sie Ihre medizinischen Deutschkenntnisse mit realistischen Patientensituationen.
            </p>
          </div>

          {/* Quick Start Section */}
          <div className="mb-6" data-tutorial-target="quick-start">
            <Card>
              <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                <div className="text-center">
                  <h3 className={`font-semibold mb-2 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                    Schnellstart
                  </h3>
                  <p className={`text-gray-600 mb-4 ${isMobile ? 'text-sm' : ''}`}>
                    Beginnen Sie sofort mit einem zufälligen Szenario.
                  </p>
                  <Button 
                    className={`${isMobile ? 'w-full' : ''} touch-target`}
                    onClick={handleQuickStart}
                    disabled={scenarios.length === 0}
                  >
                    Zufälliges Szenario starten ({scenarios.length} verfügbar)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-4">
            <PracticeSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="Szenarien durchsuchen..."
            />
          </div>

          {/* Unified Filters - works for both mobile and desktop */}
          <div data-tutorial-target="search-filters">
            <UnifiedPracticeFilters
              selectedTopic={selectedTopic}
              onTopicChange={setSelectedTopic}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Scenarios Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Szenarien werden geladen...</p>
            </div>
          ) : (
            <ScenarioGrid
              scenarios={scenarios}
              searchQuery={searchQuery}
              selectedTopic={selectedTopic}
            />
          )}
        </div>
      </main>
      
      {!isMobile && <Footer />}
      <HelpButton />
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default Practice;
