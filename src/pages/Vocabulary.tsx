
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import HelpButton from "@/components/tutorial/HelpButton";
import VocabularyHeader from "@/components/vocabulary/VocabularyHeader";
import VocabularyProgress from "@/components/vocabulary/VocabularyProgress";
import VocabularyBrowseTab from "@/components/vocabulary/VocabularyBrowseTab";
import VocabularyPracticeTab from "@/components/vocabulary/VocabularyPracticeTab";
import VocabularyMobileView from "@/components/vocabulary/VocabularyMobileView";
import VocabularyPracticeView from "@/components/vocabulary/VocabularyPracticeView";
import CollapsibleSection from "@/components/mobile/CollapsibleSection";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useVocabulary } from "@/hooks/useVocabulary";
import { useVocabularyProgress } from "@/hooks/useVocabularyProgress";
import { useVocabularyDeduplication } from "@/hooks/useVocabularyDeduplication";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { PracticeConfig } from "@/components/vocabulary/PracticeSetupDialog";

const Vocabulary: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
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
    allWords
  } = useVocabulary();
  const { getMasteryStats } = useVocabularyProgress();
  
  const deduplicatedWords = useVocabularyDeduplication(filteredWords);
  
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [practiceWords, setPracticeWords] = useState(deduplicatedWords);
  
  const masteryStats = getMasteryStats();

  useEffect(() => {
    if (deduplicatedWords.length > 0) {
      setCurrentWordIndex(0);
      setPracticeCompleted(false);
    }
  }, [deduplicatedWords]);

  const handleStartPractice = (config: PracticeConfig) => {
    let wordsToUse = [...deduplicatedWords];
    
    if (config.category !== "all") {
      wordsToUse = wordsToUse.filter(word => 
        word.categories.includes(config.category)
      );
    }
    
    for (let i = wordsToUse.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordsToUse[i], wordsToUse[j]] = [wordsToUse[j], wordsToUse[i]];
    }
    
    if (config.numberOfCards > 0) {
      wordsToUse = wordsToUse.slice(0, config.numberOfCards);
    }
    
    if (wordsToUse.length > 0) {
      setPracticeWords(wordsToUse);
      setPracticeMode(true);
      setCurrentWordIndex(0);
      setPracticeCompleted(false);
    } else {
      toast.error("Keine Vokabeln für diese Konfiguration verfügbar.");
    }
  };

  const handlePracticeComplete = (correct: boolean) => {
    if (currentWordIndex < practiceWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setPracticeCompleted(true);
      toast.success("Vokabeltraining abgeschlossen!");
      setTimeout(() => {
        setPracticeMode(false);
        setCurrentWordIndex(0);
        setPracticeCompleted(false);
      }, 3000);
    }
  };

  const handleResetPractice = () => {
    setCurrentWordIndex(0);
    setPracticeCompleted(false);
  };

  const handleEndPractice = () => {
    setPracticeMode(false);
    setCurrentWordIndex(0);
    setPracticeCompleted(false);
  };

  const handleResetFilters = () => {
    setActiveCategory("all");
    setActiveDomain("all");
    setSearchTerm("");
  };

  const availableCategories = Array.from(new Set(allWords.map(word => word.categories[0])));

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Bitte melden Sie sich an, um die Vokabelseite zu sehen.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-medical-50 to-white">
      {isMobile ? <MobileHeader /> : <Header />}
      
      <main className={`flex-grow px-4 md:px-8 pb-12 ${isMobile ? 'pt-20 pb-24' : 'pt-24'}`}>
        <div className="container mx-auto">
          <VocabularyHeader />
          
          {isMobile ? (
            <CollapsibleSection
              title="Fortschritt"
              icon={<TrendingUp className="h-4 w-4" />}
              defaultOpen={false}
            >
              <VocabularyProgress 
                masteredCount={masteredWords.length}
                totalCount={allWords.length}
              />
            </CollapsibleSection>
          ) : (
            <div data-tutorial-target="vocabulary-progress">
              <VocabularyProgress 
                masteredCount={masteredWords.length}
                totalCount={allWords.length}
              />
            </div>
          )}

          {!practiceMode ? (
            <div className="space-y-6">
              {isMobile ? (
                <VocabularyMobileView
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
                />
              ) : (
                <Tabs defaultValue="browse" className="space-y-6" data-tutorial-target="vocabulary-tabs">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="browse" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Durchsuchen
                    </TabsTrigger>
                    <TabsTrigger value="practice" className="flex items-center gap-2" data-tutorial-target="practice-tab">
                      <BookOpen className="h-4 w-4" />
                      Üben
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="browse" className="space-y-6">
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

                  <TabsContent value="practice" className="space-y-6">
                    <VocabularyPracticeTab
                      availableCategories={availableCategories}
                      totalWords={deduplicatedWords.length}
                      onStartPractice={handleStartPractice}
                    />
                  </TabsContent>
                </Tabs>
              )}
            </div>
          ) : (
            <VocabularyPracticeView
              practiceWords={practiceWords}
              currentWordIndex={currentWordIndex}
              practiceCompleted={practiceCompleted}
              onPracticeComplete={handlePracticeComplete}
              onResetPractice={handleResetPractice}
              onEndPractice={handleEndPractice}
            />
          )}
        </div>
      </main>
      
      {!isMobile && <Footer />}
      <HelpButton />
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default Vocabulary;
