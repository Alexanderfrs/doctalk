
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VocabularyCard from "@/components/ui/VocabularyCard";
import AppNavigation from "@/components/navigation/AppNavigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import VocabularyHeader from "@/components/vocabulary/VocabularyHeader";
import VocabularySearch from "@/components/vocabulary/VocabularySearch";
import VocabularyFilters from "@/components/vocabulary/VocabularyFilters";
import VocabularyProgress from "@/components/vocabulary/VocabularyProgress";
import { useVocabulary } from "@/hooks/useVocabulary";

const Vocabulary = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const {
    searchTerm,
    setSearchTerm,
    filteredWords,
    activeCategory,
    setActiveCategory,
    activeDomain,
    setActiveDomain,
    isFiltersOpen,
    setIsFiltersOpen,
    masteredWords,
    updateMasteredStatus,
    allWords
  } = useVocabulary();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const startVoicePractice = (word) => {
    console.log("Starting voice practice for:", word);
  };

  const resetFilters = () => {
    setActiveCategory("all");
    setActiveDomain("all");
    setSearchTerm("");
  };

  return (
    <div className={`min-h-screen flex flex-col ${loadingPage ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <Header />
      <AppNavigation />
      
      <main className="flex-grow pt-24 px-4 md:px-8 pb-24">
        <div className="container mx-auto">
          <section className="mb-8">
            <VocabularyHeader />
            <VocabularySearch 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <VocabularyFilters 
              activeCategory={activeCategory}
              activeDomain={activeDomain}
              isFiltersOpen={isFiltersOpen}
              onCategoryChange={setActiveCategory}
              onDomainChange={setActiveDomain}
              onFiltersToggle={() => setIsFiltersOpen(!isFiltersOpen)}
              onResetFilters={resetFilters}
            />
            <VocabularyProgress 
              masteredCount={masteredWords.length}
              totalCount={allWords.length}
            />
          </section>
          
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
