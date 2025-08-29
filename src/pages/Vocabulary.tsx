
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import VocabularyMobileView from "@/components/vocabulary/VocabularyMobileView";
import VocabularyHeader from "@/components/vocabulary/VocabularyHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VocabularyBrowseTab from "@/components/vocabulary/VocabularyBrowseTab";
import VocabularyPracticeTab from "@/components/vocabulary/VocabularyPracticeTab";
import AppHeader from "@/components/layout/AppHeader";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVocabulary } from "@/hooks/useVocabulary";
import { useVocabularyDeduplication } from "@/hooks/useVocabularyDeduplication";
import { PracticeConfig } from "@/components/vocabulary/PracticeSetupDialog";

const Vocabulary: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  const { translate } = useLanguage();
  
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
    updateMasteredStatus,
    allWords
  } = useVocabulary();

  const deduplicatedWords = useVocabularyDeduplication(filteredWords);

  const handleResetFilters = () => {
    setActiveCategory("all");
    setActiveDomain("all");
    setSearchTerm("");
  };

  const handleStartPractice = (config: PracticeConfig) => {
    console.log('Starting practice with config:', config);
    // TODO: Implement practice navigation
  };

  // Get available categories from the words
  const availableCategories = Array.from(
    new Set(allWords.map(word => word.category))
  ).filter(Boolean);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-50 to-white">
        <AppHeader />
        <main className="flex-grow pt-24 px-4 md:px-8">
          <div className="container mx-auto text-center py-12">
            <h1 className="text-2xl font-bold text-medical-800 mb-4">
              {translate('auth.loginRequired')}
            </h1>
            <p className="text-medical-600">
              {translate('vocabulary.loginMessage')}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isMobile) {
    return <VocabularyMobileView 
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      activeCategory={activeCategory}
      activeDomain={activeDomain}
      onCategoryChange={setActiveCategory}
      onDomainChange={setActiveDomain}
      onResetFilters={handleResetFilters}
      words={deduplicatedWords}
      availableCategories={availableCategories}
      onStartPractice={handleStartPractice}
    />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-50 to-white">
      <AppHeader />
      
      <main className="flex-grow pt-24 px-4 md:px-8">
        <div className="container mx-auto">
          <VocabularyHeader />
          
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="browse">{translate('vocabulary.browse')}</TabsTrigger>
              <TabsTrigger value="practice">{translate('vocabulary.practice')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse">
              <VocabularyBrowseTab 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                activeCategory={activeCategory}
                activeDomain={activeDomain}
                isFiltersOpen={isFiltersOpen}
                onCategoryChange={setActiveCategory}
                onDomainChange={setActiveDomain}
                onFiltersToggle={() => setIsFiltersOpen(!isFiltersOpen)}
                onResetFilters={handleResetFilters}
                words={deduplicatedWords}
              />
            </TabsContent>
            
            <TabsContent value="practice">
              <VocabularyPracticeTab 
                availableCategories={availableCategories}
                totalWords={deduplicatedWords.length}
                onStartPractice={handleStartPractice}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vocabulary;
