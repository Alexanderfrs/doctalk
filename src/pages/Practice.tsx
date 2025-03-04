
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScenarioCard from "@/components/ui/ScenarioCard";
import scenarios from "@/data/scenarios";
import { Button } from "@/components/ui/button";
import { Mic, BookOpen, Filter, Check, RefreshCw, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Practice = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredScenarios, setFilteredScenarios] = useState(scenarios);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [activeDifficulty, setActiveDifficulty] = useState(searchParams.get("difficulty") || "all");
  const [loadingPage, setLoadingPage] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...scenarios];
    
    if (activeCategory !== "all") {
      result = result.filter(scenario => scenario.category === activeCategory);
    }
    
    if (activeDifficulty !== "all") {
      result = result.filter(scenario => scenario.difficulty === activeDifficulty);
    }
    
    setFilteredScenarios(result);
    
    // Update URL params
    const params = new URLSearchParams();
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (activeDifficulty !== "all") params.set("difficulty", activeDifficulty);
    setSearchParams(params, { replace: true });
  }, [activeCategory, activeDifficulty, setSearchParams]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleDifficultyChange = (difficulty) => {
    setActiveDifficulty(difficulty);
  };

  const resetFilters = () => {
    setActiveCategory("all");
    setActiveDifficulty("all");
  };

  const categories = [
    { id: "all", label: "Alle" },
    { id: "patient-care", label: "Patientenversorgung" },
    { id: "emergency", label: "Notfälle" },
    { id: "documentation", label: "Dokumentation" },
    { id: "teamwork", label: "Teamarbeit" }
  ];

  const difficulties = [
    { id: "all", label: "Alle Niveaus" },
    { id: "beginner", label: "Anfänger (B1)" },
    { id: "intermediate", label: "Fortgeschritten (B1+)" },
    { id: "advanced", label: "Erfahren (B2)" }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${loadingPage ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <Header />
      
      <main className="flex-grow pt-24 px-4 md:px-8">
        <div className="container mx-auto">
          <section className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-neutral-800">Übungen</h1>
                <p className="text-neutral-600">
                  Trainiere deine medizinischen Sprachkenntnisse mit realistischen Szenarien
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button asChild variant="outline" className="flex items-center">
                  <a href="/vocabulary">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Vokabeln
                  </a>
                </Button>
                
                <Button className="flex items-center bg-medical-500 hover:bg-medical-600">
                  <Mic className="h-4 w-4 mr-2" />
                  Sprachübung starten
                </Button>
              </div>
            </div>
            
            {/* Mobile filter toggle */}
            <Button 
              variant="outline" 
              className="w-full md:hidden flex items-center justify-between mb-4"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter anzeigen
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'transform rotate-180' : ''}`} />
            </Button>
            
            {/* Filters */}
            <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block space-y-4 md:space-y-0 mb-6 bg-white p-4 md:p-0 rounded-lg md:bg-transparent shadow-sm md:shadow-none`}>
              <div className="flex flex-col md:flex-row gap-2 md:items-center mb-4">
                <p className="text-sm font-medium text-neutral-700 md:mr-2">Kategorie:</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "rounded-full",
                        activeCategory === category.id
                          ? "bg-medical-50 text-medical-700 border-medical-200"
                          : "bg-white text-neutral-700 hover:bg-neutral-50"
                      )}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      {category.label}
                      {activeCategory === category.id && <Check className="ml-1 h-3 w-3" />}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-2 md:items-center mb-4">
                <p className="text-sm font-medium text-neutral-700 md:mr-2">Schwierigkeit:</p>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty.id}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "rounded-full",
                        activeDifficulty === difficulty.id
                          ? "bg-medical-50 text-medical-700 border-medical-200"
                          : "bg-white text-neutral-700 hover:bg-neutral-50"
                      )}
                      onClick={() => handleDifficultyChange(difficulty.id)}
                    >
                      {difficulty.label}
                      {activeDifficulty === difficulty.id && <Check className="ml-1 h-3 w-3" />}
                    </Button>
                  ))}
                </div>
              </div>
              
              {(activeCategory !== "all" || activeDifficulty !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-neutral-500 hover:text-neutral-700"
                  onClick={resetFilters}
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Filter zurücksetzen
                </Button>
              )}
            </div>
          </section>
          
          {/* Results */}
          <section>
            <div className="mb-4">
              <p className="text-neutral-600">
                {filteredScenarios.length} {filteredScenarios.length === 1 ? 'Übung' : 'Übungen'} gefunden
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredScenarios.map((scenario) => (
                <ScenarioCard 
                  key={scenario.id} 
                  scenario={scenario} 
                  onClick={() => console.log(`Navigate to scenario: ${scenario.id}`)}
                />
              ))}
            </div>
            
            {filteredScenarios.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-500 mb-4">Keine Übungen mit den gewählten Filtern gefunden.</p>
                <Button variant="outline" onClick={resetFilters}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Filter zurücksetzen
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Practice;
