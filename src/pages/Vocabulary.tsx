
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import HelpButton from "@/components/tutorial/HelpButton";
import VocabularyHeader from "@/components/vocabulary/VocabularyHeader";
import VocabularySearch from "@/components/vocabulary/VocabularySearch";
import VocabularyFilters from "@/components/vocabulary/VocabularyFilters";
import VocabularyProgress from "@/components/vocabulary/VocabularyProgress";
import EnhancedVocabularyPracticeCard from "@/components/vocabulary/EnhancedVocabularyPracticeCard";
import PracticeSetupDialog, { PracticeConfig } from "@/components/vocabulary/PracticeSetupDialog";
import CollapsibleSection from "@/components/mobile/CollapsibleSection";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, RotateCcw, CheckCircle, Filter, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useVocabulary } from "@/hooks/useVocabulary";
import { useVocabularyProgress } from "@/hooks/useVocabularyProgress";
import { useVocabularyDeduplication } from "@/hooks/useVocabularyDeduplication";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const Vocabulary: React.FC = () => {
  const { user, profile } = useAuth();
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
    updateMasteredStatus,
    allWords
  } = useVocabulary();
  const { getMasteryStats } = useVocabularyProgress();
  
  // Use deduplication hook
  const deduplicatedWords = useVocabularyDeduplication(filteredWords);
  
  // State management
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [practiceWords, setPracticeWords] = useState(deduplicatedWords);
  
  // Get mastery statistics
  const masteryStats = getMasteryStats();

  // Reset practice when filters change
  useEffect(() => {
    if (deduplicatedWords.length > 0) {
      setCurrentWordIndex(0);
      setPracticeCompleted(false);
    }
  }, [deduplicatedWords]);

  const handleStartPractice = (config: PracticeConfig) => {
    let wordsToUse = [...deduplicatedWords];
    
    // Filter by category if specified
    if (config.category !== "all") {
      wordsToUse = wordsToUse.filter(word => 
        word.categories.includes(config.category)
      );
    }
    
    // Shuffle the words for variety
    wordsToUse = wordsToUse.sort(() => Math.random() - 0.5);
    
    // Limit number of cards if specified
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
    // Move to next word or end practice
    if (currentWordIndex < practiceWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      // Practice session complete
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

  // Get unique categories for the setup dialog
  const availableCategories = Array.from(new Set(allWords.map(word => word.category)));

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
          
          {/* Progress Section - Mobile: Collapsible */}
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
              {/* Mobile: Simplified interface */}
              {isMobile ? (
                <>
                  {/* Search */}
                  <VocabularySearch
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                  />

                  {/* Filters in collapsible section */}
                  <CollapsibleSection
                    title="Filter"
                    icon={<Filter className="h-4 w-4" />}
                    defaultOpen={false}
                  >
                    <VocabularyFilters
                      activeCategory={activeCategory}
                      activeDomain={activeDomain}
                      isFiltersOpen={true}
                      onCategoryChange={setActiveCategory}
                      onDomainChange={setActiveDomain}
                      onFiltersToggle={() => {}}
                      onResetFilters={handleResetFilters}
                    />
                  </CollapsibleSection>

                  {/* Quick Practice Button */}
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-semibold mb-2">Vokabeltraining</h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        {deduplicatedWords.length} Vokabeln verfügbar
                      </p>
                      <PracticeSetupDialog
                        availableCategories={availableCategories}
                        onStartPractice={handleStartPractice}
                        totalWords={deduplicatedWords.length}
                      />
                    </CardContent>
                  </Card>

                  {/* Vocabulary Grid */}
                  <div className="grid grid-cols-1 gap-4">
                    {deduplicatedWords.slice(0, 10).map((word) => (
                      <Card key={word.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-lg text-medical-800">
                                {word.german}
                              </h3>
                              <div className="flex flex-wrap gap-1">
                                {word.categories.map((category, index) => (
                                  <span key={index} className="px-2 py-1 rounded text-xs font-medium bg-medical-100 text-medical-800">
                                    {category}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600">{word.english}</p>
                            {word.example && (
                              <p className="text-sm italic text-gray-500 border-l-2 border-medical-200 pl-3">
                                {word.example}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {deduplicatedWords.length > 10 && (
                      <div className="text-center text-gray-500 text-sm">
                        +{deduplicatedWords.length - 10} weitere Vokabeln
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Desktop: Keep existing tabs structure */
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
                      onResetFilters={handleResetFilters}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {deduplicatedWords.map((word) => (
                        <Card key={word.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-lg text-medical-800">
                                  {word.german}
                                </h3>
                                <div className="flex flex-wrap gap-1">
                                  {word.categories.map((category, index) => (
                                    <span key={index} className="px-2 py-1 rounded text-xs font-medium bg-medical-100 text-medical-800">
                                      {category}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-600">{word.english}</p>
                              <p className="text-sm text-gray-500">{word.categories[0]}</p>
                              {word.example && (
                                <p className="text-sm italic text-gray-500 border-l-2 border-medical-200 pl-3">
                                  {word.example}
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="practice" className="space-y-6">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-semibold mb-4">Vokabeltraining</h3>
                        <p className="text-gray-600 mb-6">
                          Testen Sie Ihr Wissen mit {deduplicatedWords.length} Vokabeln.
                        </p>
                        <PracticeSetupDialog
                          availableCategories={availableCategories}
                          onStartPractice={handleStartPractice}
                          totalWords={deduplicatedWords.length}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {practiceCompleted ? (
                <Card>
                  <CardContent className={`text-center ${isMobile ? 'p-6' : 'p-8'}`}>
                    <CheckCircle className={`text-green-500 mx-auto mb-4 ${isMobile ? 'h-12 w-12' : 'h-16 w-16'}`} />
                    <h3 className={`font-semibold mb-2 ${isMobile ? 'text-xl' : 'text-2xl'}`}>Training abgeschlossen!</h3>
                    <p className={`text-gray-600 mb-4 ${isMobile ? 'text-sm' : ''}`}>
                      Sie haben alle {practiceWords.length} Vokabeln durchgearbeitet.
                    </p>
                    <Button onClick={handleEndPractice} className={isMobile ? 'w-full touch-target' : ''}>
                      Zurück zur Übersicht
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Practice Header */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Vokabeltraining</h3>
                          <p className="text-sm text-gray-600">
                            Wort {currentWordIndex + 1} von {practiceWords.length}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleResetPractice}
                            className="touch-target"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleEndPractice}
                            className="touch-target"
                          >
                            Beenden
                          </Button>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-medical-500 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${((currentWordIndex + 1) / practiceWords.length) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Practice Card */}
                  {practiceWords[currentWordIndex] && (
                    <EnhancedVocabularyPracticeCard
                      word={{
                        ...practiceWords[currentWordIndex],
                        difficulty: 'B1' // Default difficulty since it's not in the data
                      }}
                      onComplete={handlePracticeComplete}
                    />
                  )}
                </>
              )}
            </div>
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
