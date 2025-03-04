
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VocabularyCard from "@/components/ui/VocabularyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Filter, 
  Check, 
  RefreshCw, 
  ChevronDown,
  Mic,
  List 
} from "lucide-react";
import { cn } from "@/lib/utils";
import vocabularyCategories, { VocabularyWord } from "@/data/vocabulary";

const Vocabulary = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWords, setFilteredWords] = useState<VocabularyWord[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Flatten all vocabulary words from all categories
  const allWords = vocabularyCategories.flatMap(category => category.words);

  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...allWords];
    
    if (activeCategory !== "all") {
      result = result.filter(word => word.category === activeCategory);
    }
    
    // Note: We don't have difficulty on VocabularyWord, so we'll skip that filter for now
    // If needed, we could add a difficulty property to VocabularyWord
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        word => 
          word.german.toLowerCase().includes(term) || 
          word.english.toLowerCase().includes(term) ||
          (word.example && word.example.toLowerCase().includes(term))
      );
    }
    
    setFilteredWords(result);
  }, [activeCategory, activeDifficulty, searchTerm, allWords]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleDifficultyChange = (difficulty) => {
    setActiveDifficulty(difficulty);
  };

  const resetFilters = () => {
    setActiveCategory("all");
    setActiveDifficulty("all");
    setSearchTerm("");
  };

  const startVoicePractice = (word) => {
    console.log("Starting voice practice for:", word);
    // Will implement voice functionality later
  };

  const categories = [
    { id: "all", label: "Alle" },
    ...vocabularyCategories.map(cat => ({ id: cat.id, label: cat.name }))
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
                <h1 className="text-3xl font-bold mb-2 text-neutral-800">Vokabeln</h1>
                <p className="text-neutral-600">
                  Lerne und übe medizinisches Fachvokabular für deinen Berufsalltag
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button asChild variant="outline" className="flex items-center">
                  <a href="/practice">
                    <List className="h-4 w-4 mr-2" />
                    Übungen
                  </a>
                </Button>
                
                <Button className="flex items-center bg-medical-500 hover:bg-medical-600">
                  <Mic className="h-4 w-4 mr-2" />
                  Aussprache üben
                </Button>
              </div>
            </div>
            
            {/* Search bar */}
            <div className="flex w-full max-w-full mb-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  className="pl-10 w-full"
                  placeholder="Vokabeln suchen..."
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
              
              {(activeCategory !== "all" || activeDifficulty !== "all" || searchTerm.trim() !== "") && (
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
                {filteredWords.length} {filteredWords.length === 1 ? 'Vokabel' : 'Vokabeln'} gefunden
              </p>
            </div>
            
            {filteredWords.length > 0 ? (
              <ScrollArea className="h-[calc(100vh-350px)] pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                  {filteredWords.map((word) => (
                    <VocabularyCard 
                      key={word.id} 
                      word={word}
                      onPractice={() => startVoicePractice(word)}
                    />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500 mb-4">Keine Vokabeln mit den gewählten Filtern gefunden.</p>
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

export default Vocabulary;
