
import React, { useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVocabulary } from "@/hooks/useVocabulary";
import { useVocabularyDeduplication } from "@/hooks/useVocabularyDeduplication";
import AppHeader from "@/components/layout/AppHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import VocabularyBrowseTab from "@/components/vocabulary/VocabularyBrowseTab";
import VocabularyPracticeTab from "@/components/vocabulary/VocabularyPracticeTab";
import VocabularyMobileView from "@/components/vocabulary/VocabularyMobileView";
import VocabularyPracticeView from "@/components/vocabulary/VocabularyPracticeView";
import { cn } from "@/lib/utils";

const Vocabulary = () => {
  const isMobile = useIsMobile();
  const { translate } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [activeDomain, setActiveDomain] = useState(searchParams.get("domain") || "all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  
  const { allWords } = useVocabulary();
  const words = useVocabularyDeduplication(allWords);

  const filteredWords = useMemo(() => {
    let filtered = words;

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(word =>
        word.german.toLowerCase().includes(lowerSearchTerm) ||
        word.english.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter(word => word.categories.includes(activeCategory));
    }

    // Remove domain filtering since DeduplicatedVocabularyWord doesn't have domain property
    // Domain filtering logic would need to be implemented differently if needed

    return filtered;
  }, [words, searchTerm, activeCategory]);

  const practiceWords = useMemo(() => {
    const filtered = filteredWords;
    // Shuffle the array to randomize order
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled;
  }, [filteredWords]);

  const availableCategories = useMemo(() => {
    const categories = allWords
      .map(word => word.category)
      .filter((category): category is string => Boolean(category));
    return [...new Set(categories)];
  }, [allWords]);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setSearchParams(params => {
      params.set("search", term);
      return params;
    });
  }, [setSearchParams]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setSearchParams(params => {
      params.set("category", category);
      return params;
    });
  }, [setSearchParams]);

  const handleDomainChange = useCallback((domain: string) => {
    setActiveDomain(domain);
    setSearchParams(params => {
      params.set("domain", domain);
      return params;
    });
  }, [setSearchParams]);

  const handleFiltersToggle = useCallback(() => {
    setIsFiltersOpen(prev => !prev);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchTerm("");
    setActiveCategory("all");
    setActiveDomain("all");
    setIsFiltersOpen(false);
    setSearchParams({});
  }, [setSearchParams]);

  const handleStartPractice = useCallback(() => {
    setCurrentWordIndex(0);
    setPracticeCompleted(false);
    setShowPractice(true);
  }, []);

  const handlePracticeComplete = useCallback((correct: boolean) => {
    if (currentWordIndex < practiceWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setPracticeCompleted(true);
    }
  }, [currentWordIndex, practiceWords.length]);

  const handleResetPractice = useCallback(() => {
    setCurrentWordIndex(0);
  }, []);

  const handleEndPractice = useCallback(() => {
    setShowPractice(false);
  }, []);

  // Show loading state if no words are available yet
  if (allWords.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500"></div>
    </div>;
  }

  if (showPractice) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-50 to-white">
        {isMobile ? <MobileHeader /> : <AppHeader showSlogan={false} showAuthButtons={true} />}
        <main className={cn("flex-grow", isMobile ? "pt-20 pb-24" : "pt-24", "px-4")}>
          <div className="container mx-auto">
            <VocabularyPracticeView
              practiceWords={practiceWords}
              currentWordIndex={currentWordIndex}
              practiceCompleted={practiceCompleted}
              onPracticeComplete={handlePracticeComplete}
              onResetPractice={handleResetPractice}
              onEndPractice={handleEndPractice}
            />
          </div>
        </main>
        {!isMobile && <Footer />}
        {isMobile && <BottomNavigation />}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-50 to-white">
      {isMobile ? <MobileHeader /> : <AppHeader showSlogan={false} showAuthButtons={true} />}
      <main className={cn("flex-grow", isMobile ? "pt-20 pb-24" : "pt-24", "px-4")}>
        <div className="container mx-auto">
          {isMobile ? (
            <VocabularyMobileView
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              activeCategory={activeCategory}
              activeDomain={activeDomain}
              onCategoryChange={handleCategoryChange}
              onDomainChange={handleDomainChange}
              onResetFilters={handleResetFilters}
              words={filteredWords}
              availableCategories={availableCategories}
              onStartPractice={handleStartPractice}
            />
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-6">{translate("vocabulary")}</h1>
              <div className="md:flex gap-8">
                <div className="md:w-3/4">
                  <VocabularyBrowseTab
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    activeCategory={activeCategory}
                    activeDomain={activeDomain}
                    isFiltersOpen={isFiltersOpen}
                    onCategoryChange={handleCategoryChange}
                    onDomainChange={handleDomainChange}
                    onFiltersToggle={handleFiltersToggle}
                    onResetFilters={handleResetFilters}
                    words={filteredWords}
                  />
                </div>
                <div className="md:w-1/4">
                  <VocabularyPracticeTab
                    availableCategories={availableCategories}
                    totalWords={words.length}
                    onStartPractice={handleStartPractice}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      {!isMobile && <Footer />}
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default Vocabulary;
