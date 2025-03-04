
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
  List,
  BookOpen 
} from "lucide-react";
import { cn } from "@/lib/utils";
import vocabularyCategories, { VocabularyWord } from "@/data/vocabulary";

const Vocabulary = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWords, setFilteredWords] = useState<VocabularyWord[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDomain, setActiveDomain] = useState("all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [masteredWords, setMasteredWords] = useState<string[]>([]);
  
  // Flatten all vocabulary words from all categories
  const allWords = vocabularyCategories.flatMap(category => category.words);

  useEffect(() => {
    // Load mastered words from local storage
    const saved = localStorage.getItem('masteredWords');
    if (saved) {
      try {
        setMasteredWords(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading mastered words:", e);
      }
    }
    
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
    
    // Domain filter (this is a new filter for healthcare domains)
    if (activeDomain !== "all") {
      // Map domain to relevant categories
      const domainCategories = {
        'hospital': ['vital-signs', 'emergency', 'medications', 'pain-scale'],
        'elderly-care': ['elderly-care', 'dementia', 'mobility', 'general-care'],
        'disability-care': ['disability-care', 'communication', 'mobility']
      };
      
      const relevantCategories = domainCategories[activeDomain] || [];
      if (relevantCategories.length > 0) {
        result = result.filter(word => relevantCategories.includes(word.category));
      }
    }
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        word => 
          word.german.toLowerCase().includes(term) || 
          word.english.toLowerCase().includes(term) ||
          (word.example && word.example.toLowerCase().includes(term))
      );
    }
    
    // Apply mastered status to words
    result = result.map(word => ({
      ...word,
      mastered: masteredWords.includes(word.id)
    }));
    
    setFilteredWords(result);
  }, [activeCategory, activeDomain, searchTerm, allWords, masteredWords]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleDomainChange = (domain) => {
    setActiveDomain(domain);
  };

  const resetFilters = () => {
    setActiveCategory("all");
    setActiveDomain("all");
    setSearchTerm("");
  };

  const updateMasteredStatus = (wordId, isMastered) => {
    let newMasteredWords = [...masteredWords];
    
    if (isMastered && !newMasteredWords.includes(wordId)) {
      newMasteredWords.push(wordId);
    } else if (!isMastered && newMasteredWords.includes(wordId)) {
      newMasteredWords = newMasteredWords.filter(id => id !== wordId);
    }
    
    setMasteredWords(newMasteredWords);
    localStorage.setItem('masteredWords', JSON.stringify(newMasteredWords));
  };

  const startVoicePractice = (word) => {
    console.log("Starting voice practice for:", word);
    // Will implement voice functionality later
  };

  const categories = [
    { id: "all", label: "Alle Kategorien" },
    ...vocabularyCategories.map(cat => ({ id: cat.id, label: cat.name }))
  ];

  const domains = [
    { id: "all", label: "Alle Bereiche" },
    { id: "hospital", label: "Krankenhaus" },
    { id: "elderly-care", label: "Altenpflege" },
    { id: "disability-care", label: "Behindertenbetreuung" }
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
                <p className="text-sm font-medium text-neutral-700 md:mr-2">Berufsbereich:</p>
                <div className="flex flex-wrap gap-2">
                  {domains.map((domain) => (
                    <Button
                      key={domain.id}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "rounded-full",
                        activeDomain === domain.id
                          ? "bg-medical-50 text-medical-700 border-medical-200"
                          : "bg-white text-neutral-700 hover:bg-neutral-50"
                      )}
                      onClick={() => handleDomainChange(domain.id)}
                    >
                      {domain.label}
                      {activeDomain === domain.id && <Check className="ml-1 h-3 w-3" />}
                    </Button>
                  ))}
                </div>
              </div>
              
              {(activeCategory !== "all" || activeDomain !== "all" || searchTerm.trim() !== "") && (
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

            {/* Progress summary */}
            <div className="bg-white rounded-lg p-4 mb-6 border border-neutral-100">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-medical-500" />
                <h2 className="text-lg font-medium">Vokabel-Fortschritt</h2>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-neutral-100 h-2 rounded-full flex-grow">
                  <div 
                    className="bg-medical-500 h-2 rounded-full" 
                    style={{width: `${Math.round((masteredWords.length / allWords.length) * 100)}%`}}
                  ></div>
                </div>
                <span className="text-sm text-neutral-600 whitespace-nowrap">
                  {masteredWords.length} von {allWords.length} beherrscht ({Math.round((masteredWords.length / allWords.length) * 100)}%)
                </span>
              </div>
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
              <ScrollArea className="h-[calc(100vh-450px)] pr-4">
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
