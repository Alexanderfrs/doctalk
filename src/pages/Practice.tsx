
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AppNavigation from "@/components/navigation/AppNavigation";
import ScenarioCard from "@/components/ui/ScenarioCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Filter, 
  Check, 
  RefreshCw, 
  ChevronDown,
  BookOpen,
  Mic 
} from "lucide-react";
import { cn } from "@/lib/utils";
import scenarios, { Scenario } from "@/data/scenarios";
import { useLanguage } from "@/contexts/LanguageContext";

const Practice = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const [loadingPage, setLoadingPage] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredScenarios, setFilteredScenarios] = useState<Scenario[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...scenarios];
    
    if (activeCategory !== "all") {
      result = result.filter(scenario => scenario.category === activeCategory);
    }
    
    if (activeDifficulty !== "all") {
      result = result.filter(scenario => scenario.difficulty === activeDifficulty);
    }
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        scenario => 
          scenario.title.toLowerCase().includes(term) || 
          scenario.description.toLowerCase().includes(term) ||
          scenario.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setFilteredScenarios(result);
  }, [activeCategory, activeDifficulty, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleDifficultyChange = (difficulty: string) => {
    setActiveDifficulty(difficulty);
  };

  const resetFilters = () => {
    setActiveCategory("all");
    setActiveDifficulty("all");
    setSearchTerm("");
  };

  const categories = [
    { id: "all", label: translate("allAreas") || "Alle Bereiche" },
    { id: "patient-care", label: translate("patientCare") || "Patientenpflege" },
    { id: "emergency", label: translate("emergency") || "Notfälle" },
    { id: "documentation", label: translate("documentation") || "Dokumentation" },
    { id: "teamwork", label: translate("teamwork") || "Teamarbeit" },
    { id: "elderly-care", label: translate("elderlyCare") || "Altenpflege" },
    { id: "disability-care", label: translate("disabilityCare") || "Behindertenbetreuung" }
  ];

  const difficulties = [
    { id: "all", label: translate("allLevels") || "Alle Niveaus" },
    { id: "beginner", label: translate("beginner") || "Anfänger (A1-A2)" },
    { id: "intermediate", label: translate("intermediate") || "Mittelstufe (B1-B2)" },
    { id: "advanced", label: translate("advanced") || "Fortgeschritten (C1)" }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${loadingPage ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <Header />
      
      <main className="flex-grow pt-24 px-4 md:px-8 pb-24">
        <div className="container mx-auto">
          <section className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-neutral-800">{translate("practice") || "Übungen"}</h1>
                <p className="text-neutral-600">
                  {translate("practiceDescription") || "Praktiziere medizinisches Deutsch in realistischen Szenarien aus deinem Berufsalltag"}
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button asChild variant="outline" className="flex items-center">
                  <Link to="/vocabulary">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {translate("vocabulary") || "Vokabeln"}
                  </Link>
                </Button>
                
                <Button className="flex items-center bg-medical-500 hover:bg-medical-600">
                  <Mic className="h-4 w-4 mr-2" />
                  {translate("practicePronunciation") || "Aussprache üben"}
                </Button>
              </div>
            </div>
            
            {/* Search bar */}
            <div className="flex w-full max-w-full mb-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  className="pl-10 w-full"
                  placeholder={translate("searchExercises") || "Übungen suchen..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                {translate("showFilters") || "Filter anzeigen"}
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'transform rotate-180' : ''}`} />
            </Button>
            
            {/* Filters */}
            <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block space-y-4 md:space-y-0 mb-6 bg-white p-4 md:p-0 rounded-lg md:bg-transparent shadow-sm md:shadow-none`}>
              <div className="flex flex-col md:flex-row gap-2 md:items-center mb-4">
                <p className="text-sm font-medium text-neutral-700 md:mr-2">{translate("area") || "Bereich"}:</p>
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
                <p className="text-sm font-medium text-neutral-700 md:mr-2">{translate("languageLevel") || "Sprachniveau"}:</p>
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
              
              {(activeCategory !== "all" || activeDifficulty !== "all" || searchTerm.trim() !== "") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-neutral-500 hover:text-neutral-700"
                  onClick={resetFilters}
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  {translate("resetFilters") || "Filter zurücksetzen"}
                </Button>
              )}
            </div>
          </section>
          
          {/* Results */}
          <section>
            <div className="mb-4">
              <p className="text-neutral-600">
                {filteredScenarios.length} {filteredScenarios.length === 1 
                  ? (translate("exercise") || "Übung") 
                  : (translate("exercises") || "Übungen")} {translate("found") || "gefunden"}
              </p>
            </div>
            
            {filteredScenarios.length > 0 ? (
              <ScrollArea className="h-[calc(100vh-350px)] pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                  {filteredScenarios.map((scenario) => (
                    <ScenarioCard 
                      key={scenario.id} 
                      scenario={scenario}
                      onClick={() => navigate(`/scenario/${scenario.id}`)}
                    />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500 mb-4">{translate("noExercisesFound") || "Keine Übungen mit den gewählten Filtern gefunden."}</p>
                <Button variant="outline" onClick={resetFilters}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {translate("resetFilters") || "Filter zurücksetzen"}
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <AppNavigation />
      <Footer />
    </div>
  );
};

export default Practice;
