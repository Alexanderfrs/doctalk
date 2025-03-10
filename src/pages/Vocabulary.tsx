
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VocabularyCard from "@/components/ui/VocabularyCard";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import VocabularyHeader from "@/components/vocabulary/VocabularyHeader";
import VocabularySearch from "@/components/vocabulary/VocabularySearch";
import VocabularyFilters from "@/components/vocabulary/VocabularyFilters";
import VocabularyProgress from "@/components/vocabulary/VocabularyProgress";
import { useVocabulary } from "@/hooks/useVocabulary";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/use-mobile";

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
  
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

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

  const handleCardSwipe = (index: number) => {
    setCurrentCardIndex(index);
  };

  return (
    <div className={`min-h-screen flex flex-col ${loadingPage ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <Header />
      
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
                {filteredWords.length} {filteredWords.length === 1 ? t('singleVocab') : t('multipleVocab')} {t('found')}
              </p>
            </div>
            
            {filteredWords.length > 0 ? (
              isMobile ? (
                <div className="mb-12">
                  <SwipeableContainer 
                    onSwipe={handleCardSwipe}
                    className="h-[320px] mb-4"
                    showIndicators={true}
                    loop={false}
                  >
                    {filteredWords.map((word) => (
                      <div key={word.id} className="px-2 h-full w-full flex items-center justify-center">
                        <VocabularyCard 
                          word={word}
                          onPractice={() => startVoicePractice(word)}
                          className="h-[280px] w-full max-w-xs"
                        />
                      </div>
                    ))}
                  </SwipeableContainer>
                  
                  <div className="text-center text-neutral-500 text-sm mt-2">
                    <p>Card {currentCardIndex + 1} of {filteredWords.length}</p>
                    <p className="text-xs mt-1">Swipe to browse vocabulary cards</p>
                  </div>
                </div>
              ) : (
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
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500 mb-4">{t('noVocabularyFound')}</p>
                <Button variant="outline" onClick={resetFilters}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t('resetFilters')}
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
