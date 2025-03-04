
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScenarioCard from "@/components/ui/ScenarioCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Search, Heart, CheckCircle, X, HelpCircle, Volume2, Mic, Send } from "lucide-react";
import scenarios, { Scenario } from "@/data/scenarios";
import useVoiceRecognition from "@/hooks/useVoiceRecognition";
import useTextToSpeech from "@/hooks/useTextToSpeech";
import { toast } from "@/components/ui/use-toast";

const Practice = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredScenarios, setFilteredScenarios] = useState<Scenario[]>(scenarios);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState({ correct: false, message: "" });
  const [loadingPage, setLoadingPage] = useState(true);

  // Speech recognition and synthesis hooks
  const { 
    text: recognizedText, 
    isListening, 
    startListening, 
    stopListening,
    resetText,
    hasRecognitionSupport 
  } = useVoiceRecognition({
    language: 'de-DE',
    onResult: (result, isFinal) => {
      if (isFinal) {
        console.log("Final result:", result);
      }
    }
  });

  const { 
    speak, 
    stop: stopSpeaking, 
    isSpeaking, 
    hasSpeechSupport 
  } = useTextToSpeech({
    language: 'de-DE'
  });

  // Handle URL search params
  useEffect(() => {
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");
    
    if (category) {
      setSelectedCategory(category);
    }

    // Apply filters from URL
    filterScenarios(searchTerm, category || selectedCategory, difficulty || "all");
    
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Filter scenarios based on search, category, and difficulty
  const filterScenarios = (search: string, category: string, difficulty: string) => {
    let filtered = [...scenarios];
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(scenario => 
        scenario.title.toLowerCase().includes(searchLower) || 
        scenario.description.toLowerCase().includes(searchLower) ||
        scenario.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    if (category && category !== "all") {
      filtered = filtered.filter(scenario => scenario.category === category);
    }
    
    if (difficulty && difficulty !== "all") {
      filtered = filtered.filter(scenario => scenario.difficulty === difficulty);
    }
    
    setFilteredScenarios(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterScenarios(value, selectedCategory, "all");
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    filterScenarios(searchTerm, value, "all");
    
    // Update URL
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };

  const openScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentDialogueIndex(0);
    setUserResponses([]);
    setFeedbackVisible(false);
    
    // Speak the first dialogue if it's not the user's turn
    if (scenario.dialogue[0].speaker !== 'user') {
      setTimeout(() => {
        speak(scenario.dialogue[0].text);
      }, 500);
    }
  };

  const closeScenario = () => {
    stopSpeaking();
    stopListening();
    setSelectedScenario(null);
  };

  const handleNextLine = () => {
    if (!selectedScenario) return;
    
    const isLastLine = currentDialogueIndex >= selectedScenario.dialogue.length - 1;
    
    if (isLastLine) {
      toast({
        title: "Szenario abgeschlossen!",
        description: "Du hast das Szenario erfolgreich durchgearbeitet.",
      });
      closeScenario();
      return;
    }
    
    setCurrentDialogueIndex(prev => prev + 1);
    
    // If next dialogue is not user's, speak it
    if (selectedScenario.dialogue[currentDialogueIndex + 1].speaker !== 'user') {
      setTimeout(() => {
        speak(selectedScenario.dialogue[currentDialogueIndex + 1].text);
      }, 300);
    }
  };

  const handleSubmitResponse = () => {
    if (!selectedScenario) return;
    
    stopListening();
    const expectedResponse = selectedScenario.dialogue[currentDialogueIndex].text;
    const userResponse = recognizedText.trim();
    
    // Store user response
    const newResponses = [...userResponses];
    newResponses[currentDialogueIndex] = userResponse;
    setUserResponses(newResponses);
    
    // Simple feedback logic (would be more sophisticated in a real app)
    const feedback = provideFeedback(userResponse, expectedResponse);
    setCurrentFeedback(feedback);
    setFeedbackVisible(true);
  };

  const provideFeedback = (userResponse: string, expectedResponse: string) => {
    // Very simple comparison for demo purposes
    // In a real app, this would use more sophisticated NLP
    const userWords = userResponse.toLowerCase().split(/\s+/);
    const expectedWords = expectedResponse.toLowerCase().split(/\s+/);
    
    // Count matching words
    const matchingWords = userWords.filter(word => 
      expectedWords.includes(word) && word.length > 3
    ).length;
    
    const matchPercentage = expectedWords.length > 0 
      ? (matchingWords / expectedWords.length) * 100 
      : 0;
    
    if (matchPercentage > 60) {
      return {
        correct: true,
        message: "Sehr gut! Deine Antwort enthält die wichtigsten Elemente."
      };
    } else if (matchPercentage > 30) {
      return {
        correct: false,
        message: "Fast richtig! Versuche mehr medizinische Fachbegriffe zu verwenden."
      };
    } else {
      return {
        correct: false,
        message: "Versuche es noch einmal. Deine Antwort weicht stark von der erwarteten Antwort ab."
      };
    }
  };

  const isUserTurn = selectedScenario && selectedScenario.dialogue[currentDialogueIndex].speaker === 'user';

  return (
    <div className={`min-h-screen flex flex-col ${loadingPage ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <Header />
      
      <main className="flex-grow pt-24 px-4 md:px-8 pb-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-neutral-800 mb-2">Praxisübungen</h1>
              <p className="text-neutral-600">
                Verbessere deine Kommunikationsfähigkeiten in realistischen medizinischen Szenarien
              </p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                type="search"
                placeholder="Szenarien durchsuchen..."
                className="pl-9 w-full md:w-80"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Tabs defaultValue="all" value={selectedCategory} onValueChange={handleCategoryChange}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">Alle</TabsTrigger>
                <TabsTrigger value="patient-care">
                  <Heart className="h-4 w-4 mr-1" />
                  Patientenversorgung
                </TabsTrigger>
                <TabsTrigger value="emergency">Notfälle</TabsTrigger>
                <TabsTrigger value="documentation">Dokumentation</TabsTrigger>
                <TabsTrigger value="teamwork">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Teamarbeit
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value={selectedCategory || "all"} className="mt-0">
                {filteredScenarios.length === 0 ? (
                  <div className="text-center py-12">
                    <HelpCircle className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
                    <h3 className="text-xl font-medium text-neutral-600 mb-2">Keine Szenarien gefunden</h3>
                    <p className="text-neutral-500">
                      Versuche es mit anderen Suchbegriffen oder Filtern.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredScenarios.map((scenario) => (
                      <ScenarioCard 
                        key={scenario.id} 
                        scenario={scenario} 
                        onClick={() => openScenario(scenario)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {/* Practice dialog */}
      <Dialog open={!!selectedScenario} onOpenChange={(open) => !open && closeScenario()}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          {selectedScenario && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedScenario.title}</DialogTitle>
                <DialogDescription className="text-neutral-500">
                  {selectedScenario.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="my-4">
                {/* Dialogue messages */}
                <div className="space-y-4 mb-6">
                  {selectedScenario.dialogue.slice(0, currentDialogueIndex + 1).map((line, index) => {
                    const isUserLine = line.speaker === 'user';
                    const userHasResponded = userResponses[index];
                    const isCurrentLine = index === currentDialogueIndex;
                    
                    // Determine what text to show
                    const displayText = isUserLine && userHasResponded 
                      ? userResponses[index] 
                      : line.text;
                    
                    return (
                      <div 
                        key={index}
                        className={`flex ${isUserLine ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] p-3 rounded-xl ${
                            isUserLine 
                              ? 'bg-medical-500 text-white rounded-tr-none' 
                              : 'bg-neutral-100 text-neutral-800 rounded-tl-none'
                          } ${isCurrentLine && isUserLine && !userHasResponded ? 'animate-pulse-subtle' : ''}`}
                        >
                          <div className="flex items-center mb-1 text-xs">
                            <strong>
                              {line.speaker === 'user' 
                                ? 'Du' 
                                : line.speaker === 'patient' 
                                  ? 'Patient' 
                                  : line.speaker === 'doctor' 
                                    ? 'Arzt' 
                                    : 'Kollege'}
                            </strong>
                            
                            {!isUserLine && (
                              <button 
                                className="ml-2 p-1 rounded-full hover:bg-neutral-200 transition-colors"
                                onClick={() => speak(line.text)}
                              >
                                <Volume2 className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                          <p>{displayText}</p>
                          
                          {line.translation && (
                            <p className="mt-1 text-xs italic text-neutral-500 dark:text-neutral-300">
                              {line.translation}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Feedback message */}
                {feedbackVisible && (
                  <div className={`mb-4 p-3 rounded-lg border ${
                    currentFeedback.correct 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : 'bg-yellow-50 border-yellow-200 text-yellow-800'
                  }`}>
                    <div className="flex items-center">
                      {currentFeedback.correct 
                        ? <CheckCircle className="h-5 w-5 mr-2 text-green-600" /> 
                        : <HelpCircle className="h-5 w-5 mr-2 text-yellow-600" />}
                      <p>{currentFeedback.message}</p>
                    </div>
                    
                    {!currentFeedback.correct && selectedScenario.dialogue[currentDialogueIndex].text && (
                      <div className="mt-2 text-sm">
                        <p className="font-medium">Beispielantwort:</p>
                        <p className="italic">{selectedScenario.dialogue[currentDialogueIndex].text}</p>
                      </div>
                    )}
                    
                    <Button 
                      className="mt-3 w-full"
                      onClick={() => {
                        setFeedbackVisible(false);
                        handleNextLine();
                      }}
                    >
                      Weiter
                    </Button>
                  </div>
                )}
                
                {/* Voice input */}
                {isUserTurn && !feedbackVisible && (
                  <div>
                    <p className="text-sm text-neutral-500 mb-2">Sprich deine Antwort:</p>
                    
                    <div className="border rounded-lg p-4">
                      <div className="min-h-[60px] mb-3">
                        {recognizedText ? (
                          <p>{recognizedText}</p>
                        ) : (
                          <p className="text-neutral-400 italic">
                            {isListening ? "Ich höre zu..." : "Klicke auf das Mikrofon, um zu antworten"}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant={isListening ? "destructive" : "outline"}
                          onClick={isListening ? stopListening : startListening}
                          className="flex items-center"
                        >
                          {isListening ? (
                            <>
                              <X className="mr-1 h-4 w-4" />
                              Stoppen
                            </>
                          ) : (
                            <>
                              <Mic className="mr-1 h-4 w-4" />
                              Aufnehmen
                            </>
                          )}
                        </Button>
                        
                        <Button
                          type="button"
                          onClick={handleSubmitResponse}
                          disabled={!recognizedText.trim()}
                          className="flex items-center"
                        >
                          <Send className="mr-1 h-4 w-4" />
                          Senden
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={closeScenario}>
                  Schließen
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Practice;
