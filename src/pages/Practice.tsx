import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import HelpButton from "@/components/tutorial/HelpButton";
import PracticeSearch from "@/components/practice/PracticeSearch";
import PracticeFilters from "@/components/practice/PracticeFilters";
import MobilePracticeFilters from "@/components/practice/MobilePracticeFilters";
import ScenarioGrid from "@/components/practice/ScenarioGrid";
import CollapsibleSection from "@/components/mobile/CollapsibleSection";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Target, TrendingUp, Play } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { useScenarios } from "@/hooks/useScenarios";
import { useIsMobile } from "@/hooks/use-mobile";

const Practice: React.FC = () => {
  const { user, profile } = useAuth();
  const { userProgress } = useProgressTracking();
  const { scenarios, isLoading } = useScenarios();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("Alle");
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Set default level based on user's German level (only if it's B1+)
  useEffect(() => {
    if (profile?.german_level && selectedLevel === "Alle" && ['B1', 'B2', 'C1', 'C2'].includes(profile.german_level)) {
      setSelectedLevel(profile.german_level);
    }
  }, [profile?.german_level, selectedLevel]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedLevel("Alle");
    setSelectedCategory("Alle");
    setSelectedTags([]);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleQuickStart = () => {
    const levelScenarios = scenarios.filter(s => s.difficulty === profile?.german_level);
    const randomScenario = levelScenarios.length > 0 
      ? levelScenarios[Math.floor(Math.random() * levelScenarios.length)]
      : scenarios[Math.floor(Math.random() * scenarios.length)];
    
    if (randomScenario) {
      console.log("Starting random scenario:", randomScenario.id);
      navigate(`/scenario/${randomScenario.id}`);
    }
  };

  if (!user) {
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
              {/* ... keep existing code (desktop progress cards) */}
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
                    Beginnen Sie sofort mit einem Szenario passend zu Ihrem Level.
                  </p>
                  <Button 
                    className={`${isMobile ? 'w-full' : ''} touch-target`}
                    onClick={handleQuickStart}
                    disabled={scenarios.length === 0}
                  >
                    <Play className="h-4 w-4 mr-2" />
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

          {/* Filters */}
          <div data-tutorial-target="search-filters">
            {isMobile ? (
              <MobilePracticeFilters
                selectedLevel={selectedLevel}
                selectedCategory={selectedCategory}
                selectedTags={selectedTags}
                onLevelChange={setSelectedLevel}
                onCategoryChange={setSelectedCategory}
                onTagToggle={handleTagToggle}
                onClearFilters={handleClearFilters}
              />
            ) : (
              <PracticeFilters
                selectedLevel={selectedLevel}
                selectedCategory={selectedCategory}
                selectedTags={selectedTags}
                onLevelChange={setSelectedLevel}
                onCategoryChange={setSelectedCategory}
                onTagToggle={handleTagToggle}
                onClearFilters={handleClearFilters}
              />
            )}
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
              selectedLevel={selectedLevel}
              selectedCategory={selectedCategory}
              selectedTags={selectedTags}
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
