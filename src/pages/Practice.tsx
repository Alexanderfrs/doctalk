import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Filter, Search, Mic, X, BookOpen } from "lucide-react";
import ScenarioCard from "@/components/ui/ScenarioCard";
import scenarios from "@/data/scenarios";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";

const Practice = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filteredScenarios, setFilteredScenarios] = useState(scenarios);

  useEffect(() => {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const resetFilters = () => {
    setActiveCategory("all");
    setActiveDifficulty("all");
    setSearchTerm("");
    setIsFiltersOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-48 bg-neutral-200 rounded-md mb-4"></div>
          <div className="h-4 w-64 bg-neutral-100 rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 px-4 md:px-8 pb-24">
        <div className="container mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">{t("practice")}</h1>
                <p className="text-neutral-600 mt-1">{t("practiceDescription")}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  {t("viewVocabulary")}
                </Button>
                <Button className="flex items-center bg-medical-500 hover:bg-medical-600">
                  <Mic className="mr-2 h-4 w-4" />
                  {t("practicePronunciation")}
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  className="pl-10 w-full"
                  placeholder={t("searchExercises")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <Button 
                variant={isFiltersOpen ? "default" : "outline"} 
                className={`min-w-[120px] ${isFiltersOpen ? "bg-medical-500 hover:bg-medical-600" : ""}`}
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              >
                <Filter className="mr-2 h-4 w-4" />
                {isFiltersOpen ? t("hideFilters") : t("showFilters")}
              </Button>
            </div>
            
            {isFiltersOpen && (
              <Card className="mt-4 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">{t("area")}</label>
                    <Select value={activeCategory} onValueChange={setActiveCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("allAreas")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("allAreas")}</SelectItem>
                        <SelectItem value="patient-care">{t("patientCare")}</SelectItem>
                        <SelectItem value="emergency">{t("emergency")}</SelectItem>
                        <SelectItem value="documentation">{t("documentation")}</SelectItem>
                        <SelectItem value="teamwork">{t("teamwork")}</SelectItem>
                        <SelectItem value="elderly-care">{t("elderlyCare")}</SelectItem>
                        <SelectItem value="disability-care">{t("disabilityCare")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">{t("languageLevel")}</label>
                    <Select value={activeDifficulty} onValueChange={setActiveDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("allLevels")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("allLevels")}</SelectItem>
                        <SelectItem value="beginner">{t("beginner")}</SelectItem>
                        <SelectItem value="intermediate">{t("intermediate")}</SelectItem>
                        <SelectItem value="advanced">{t("advanced")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    {t("resetFilters")}
                  </Button>
                </div>
              </Card>
            )}
          </div>
          
          <Separator className="my-6" />
          
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-neutral-800">{t("exercises")}</h2>
              <p className="text-neutral-500 text-sm">
                {filteredScenarios.length} {filteredScenarios.length === 1 ? t("exercise") : t("exercises")} {t("found")}
              </p>
            </div>
          </div>
          
          {filteredScenarios.length > 0 ? (
            <ScrollArea className="h-[calc(100vh-420px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
                {filteredScenarios.map((scenario) => (
                  <Link to={`/scenario/${scenario.id}`} key={scenario.id} className="no-underline">
                    <ScenarioCard
                      key={scenario.id}
                      scenario={scenario}
                    />
                  </Link>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-16">
              <p className="text-neutral-500 mb-4">{t("noExercisesFound")}</p>
              <Button variant="outline" onClick={resetFilters}>
                {t("resetFilters")}
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Practice;
