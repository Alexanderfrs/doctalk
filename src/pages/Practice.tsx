import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HelpButton from "@/components/tutorial/HelpButton";
import PracticeSearch from "@/components/practice/PracticeSearch";
import PracticeFilters from "@/components/practice/PracticeFilters";
import ScenarioGrid from "@/components/practice/ScenarioGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Target, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { useScenarios } from "@/hooks/useScenarios";

const Practice: React.FC = () => {
  const { user, profile } = useAuth();
  const { userProgress } = useProgressTracking();
  const { scenarios, isLoading } = useScenarios();
  const navigate = useNavigate();
  
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("Alle");
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Set default level based on user's German level
  useEffect(() => {
    if (profile?.german_level && selectedLevel === "Alle") {
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Bitte melden Sie sich an, um die Übungsseite zu sehen.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-50 to-white">
      <Header />
      
      <main className="flex-grow pt-24 px-4 md:px-8 pb-12">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-medical-800 mb-2">
              Medizinische Szenarien üben
            </h1>
            <p className="text-gray-600">
              Verbessern Sie Ihre medizinischen Deutschkenntnisse mit realistischen Patientensituationen.
            </p>
          </div>

          {/* Progress Overview */}
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
                    <p className="text-xl font-bold">{Math.round(((userProgress?.scenarios_completed || 0) / 50) * 100)}%</p>
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
                    <p className="text-xl font-bold">{profile?.german_level || 'A1'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions - Single card for scenario start */}
          <div className="mb-8" data-tutorial-target="quick-start">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Schnellstart
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Beginnen Sie sofort mit einem Szenario passend zu Ihrem Level.
                </p>
                <Button 
                  className="w-full"
                  onClick={() => {
                    // Find a scenario matching user's level
                    const levelScenarios = scenarios.filter(s => s.difficulty === profile?.german_level);
                    const randomScenario = levelScenarios[Math.floor(Math.random() * levelScenarios.length)];
                    if (randomScenario) {
                      navigate(`/scenario/${randomScenario.id}`);
                    }
                  }}
                >
                  Zufälliges Szenario starten
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div data-tutorial-target="search-filters">
            <PracticeSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="Szenarien durchsuchen..."
            />

            <PracticeFilters
              selectedLevel={selectedLevel}
              selectedCategory={selectedCategory}
              selectedTags={selectedTags}
              onLevelChange={setSelectedLevel}
              onCategoryChange={setSelectedCategory}
              onTagToggle={handleTagToggle}
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
              selectedLevel={selectedLevel}
              selectedCategory={selectedCategory}
              selectedTags={selectedTags}
            />
          )}
        </div>
      </main>
      
      <Footer />
      <HelpButton />
    </div>
  );
};

export default Practice;
