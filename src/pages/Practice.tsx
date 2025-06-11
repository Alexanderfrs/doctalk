
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useScenarios } from "@/hooks/useScenarios";
import PracticeFilters from "@/components/practice/PracticeFilters";
import PracticeSearch from "@/components/practice/PracticeSearch";
import ScenarioGrid from "@/components/practice/ScenarioGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageCircle, TrendingUp } from "lucide-react";

const Practice: React.FC = () => {
  const { user, profile } = useAuth();
  const { scenarios, isLoading } = useScenarios();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Alle');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedLevel('Alle');
    setSelectedCategory('Alle');
    setSelectedTags([]);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Bitte melden Sie sich an, um zu üben.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-50 to-white">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-800 mb-2">
            Übungen & Szenarien
          </h1>
          <p className="text-gray-600">
            Verbessern Sie Ihre medizinischen Deutschkenntnisse mit praxisnahen Übungen.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <MessageCircle className="h-4 w-4 mr-2 text-blue-500" />
                Verfügbare Szenarien
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {scenarios.length}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Für Ihr Level: {profile?.german_level || 'B1'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                Abgeschlossen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {scenarios.filter(s => s.completed).length}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((scenarios.filter(s => s.completed).length / scenarios.length) * 100) || 0}% Fortschritt
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
                Empfohlen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {scenarios.filter(s => !s.completed).length}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Noch zu bearbeiten
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <PracticeSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Szenarien durchsuchen..."
        />

        {/* Filters */}
        <PracticeFilters
          selectedLevel={selectedLevel}
          selectedCategory={selectedCategory}
          selectedTags={selectedTags}
          onLevelChange={setSelectedLevel}
          onCategoryChange={setSelectedCategory}
          onTagToggle={handleTagToggle}
          onClearFilters={handleClearFilters}
        />

        {/* Scenarios Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p>Lade Szenarien...</p>
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
    </div>
  );
};

export default Practice;
