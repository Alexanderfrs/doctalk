
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
import VocabularyMobileView from "@/components/vocabulary/VocabularyMobileView";
import { cn } from "@/lib/utils";

const Vocabulary = () => {
  const isMobile = useIsMobile();
  const { translate } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
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

    return filtered;
  }, [words, searchTerm, activeCategory]);

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

  const handleFiltersToggle = useCallback(() => {
    setIsFiltersOpen(prev => !prev);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchTerm("");
    setActiveCategory("all");
    setIsFiltersOpen(false);
    setSearchParams({});
  }, [setSearchParams]);

  // Show loading state if no words are available yet
  if (allWords.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-500"></div>
    </div>;
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
              activeDomain="all"
              onCategoryChange={handleCategoryChange}
              onDomainChange={() => {}}
              onResetFilters={handleResetFilters}
              words={filteredWords}
              availableCategories={availableCategories}
              onStartPractice={() => {}}
            />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{translate("vocabulary")}</h1>
              </div>
              
              <VocabularyBrowseTab
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                activeCategory={activeCategory}
                activeDomain="all"
                isFiltersOpen={isFiltersOpen}
                onCategoryChange={handleCategoryChange}
                onDomainChange={() => {}}
                onFiltersToggle={handleFiltersToggle}
                onResetFilters={handleResetFilters}
                words={filteredWords}
              />
            </div>
          )}
        </div>
      </main>
      {!isMobile && <Footer />}
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default Vocabulary;
