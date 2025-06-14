import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
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
      {isMobile ? <MobileHeader /> : <Header />}
      
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

          {/* Progress Overview - Mobile: Collapsible, Desktop: Always visible */}
          {isMobile ? (
            <CollapsibleSection
              title="Fortschritt"
              icon={<TrendingUp className="h-4 w-4" />}
              defaultOpen={false}
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Szenarien</p>
                  <p className="text-lg font-bold">{userProgress?.scenarios_completed || 0}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Target className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Streak</p>
                  <p className="text-lg font-bold">{userProgress?.current_streak || 0} Tage</p>
                </div>
              </div>
              <div className="mt-3 text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-gray-600">Gesamtfortschritt</p>
                <p className="text-lg font-bold">{Math.round(((userProgress?.scenarios_completed || 0) / Math.max(scenarios.length, 1)) * 100)}%</p>
                <p className="text-xs text-gray-500">Level: {profile?.german_level || 'B1'}</p>
              </div>
            </CollapsibleSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" data-tutorial-target="practice-progress">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Szenarien</p>
                      <p className="text-xl font-bold">{userProgress?.scenarios_completed || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Target className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Streak</p>
                      <p className="text-xl font-bold">{userProgress?.current_streak || 0} Tage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Fortschritt</p>
                      <p className="text-xl font-bold">{Math.round(((userProgress?.scenarios_completed || 0) / Math.max(scenarios.length, 1)) * 100)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <MessageCircle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Level</p>
                      <p className="text-xl font-bold">{profile?.german_level || 'B1'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

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
              {console.log("[Practice.tsx] Rendering loading spinner because isLoading is true.")}
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Szenarien werden geladen...</p>
            </div>
          ) : (
            <>
              {console.log(`[Practice.tsx] Rendering ScenarioGrid because isLoading is false. Scenarios count: ${scenarios.length}`)}
              <ScenarioGrid
                scenarios={scenarios}
                searchQuery={searchQuery}
                selectedTopic={selectedTopic}
              />
            </>
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
