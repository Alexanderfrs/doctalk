import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, Volume2, CheckCircle, RefreshCw, Type, BookOpen, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import scenarios from "@/data/scenarios";
import useTextToSpeech from "@/hooks/useTextToSpeech";
import useVoiceRecognition from "@/hooks/useVoiceRecognition";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VocabularyCard from "@/components/ui/VocabularyCard";
import vocabularyCategories, { VocabularyWord } from "@/data/vocabulary";

const ScenarioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState(null);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [userResponse, setUserResponse] = useState("");
  const [typedResponse, setTypedResponse] = useState("");
  const [inputMethod, setInputMethod] = useState<"voice" | "text">("voice");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [relevantVocabulary, setRelevantVocabulary] = useState<VocabularyWord[]>([]);
  const [usedVocabulary, setUsedVocabulary] = useState<string[]>([]);
  const [suggestedVocabulary, setSuggestedVocabulary] = useState<VocabularyWord[]>([]);
  
  const userResponseRef = useRef<HTMLInputElement>(null);
  const recordingPromptShown = useRef(false);

  const { speak, isSpeaking } = useTextToSpeech();
  const { 
    text, 
    isListening, 
    startListening, 
    stopListening, 
    resetText,
    hasRecognitionSupport,
    error: recognitionError
  } = useVoiceRecognition({
    language: 'de-DE',
    continuous: true,
    onResult: (result, isFinal) => {
      console.log("Speech recognition result:", result, "isFinal:", isFinal);
    },
    onError: (error) => {
      console.error("Speech recognition error:", error);
      if (!error.includes("not supported")) {
        toast.error("Fehler bei der Spracherkennung. Bitte versuchen Sie es erneut.");
      } else {
        toast.error("Ihr Browser unterstützt keine Spracherkennung. Bitte verwenden Sie die Texteingabe.");
        setInputMethod("text");
      }
    }
  });

  useEffect(() => {
    if (recognitionError && recognitionError.includes("not supported") && !recordingPromptShown.current) {
      toast.error("Ihr Browser unterstützt keine Spracherkennung. Bitte verwenden Sie die Texteingabe.");
      setInputMethod("text");
      recordingPromptShown.current = true;
    }
  }, [recognitionError]);

  useEffect(() => {
    const foundScenario = scenarios.find(s => s.id === id);
    if (foundScenario) {
      setScenario(foundScenario);
      
      // Find relevant vocabulary for this scenario
      if (foundScenario.vocabularyIds && foundScenario.vocabularyIds.length > 0) {
        const vocabWords: VocabularyWord[] = [];
        foundScenario.vocabularyIds.forEach(categoryId => {
          const category = vocabularyCategories.find(cat => cat.id === categoryId);
          if (category) {
            vocabWords.push(...category.words.slice(0, 5)); // Limit to 5 words per category
          }
        });
        setRelevantVocabulary(vocabWords.slice(0, 10)); // Limit to 10 words total
        
        // Randomly select 3 words to suggest for each dialogue
        updateSuggestedVocabulary(vocabWords);
      }
    } else {
      navigate("/practice");
      toast.error("Szenario nicht gefunden");
    }
    
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [id, navigate]);

  useEffect(() => {
    setUserResponse(text);
  }, [text]);

  const updateSuggestedVocabulary = (allVocab) => {
    if (allVocab && allVocab.length > 0) {
      // Shuffle array and take first 3 elements
      const shuffled = [...allVocab].sort(() => 0.5 - Math.random());
      setSuggestedVocabulary(shuffled.slice(0, 3));
    }
  };

  // Update suggested vocabulary when moving to the next dialogue
  useEffect(() => {
    if (relevantVocabulary.length > 0) {
      updateSuggestedVocabulary(relevantVocabulary);
    }
  }, [currentDialogueIndex, relevantVocabulary]);

  const playCurrentLine = () => {
    if (!scenario || !scenario.dialogue[currentDialogueIndex]) return;
    
    const line = scenario.dialogue[currentDialogueIndex];
    if (line.speaker !== 'user') {
      speak(line.text);
    }
  };

  const handleRecordAnswer = async () => {
    if (!hasRecognitionSupport) {
      toast.error("Spracherkennung wird von Ihrem Browser nicht unterstützt. Bitte verwenden Sie die Texteingabe.");
      setInputMethod("text");
      return;
    }
    
    if (isListening) {
      stopListening();
    } else {
      try {
        // Ask for microphone permissions
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          // Stop tracks to avoid keeping microphone active
          stream.getTracks().forEach(track => track.stop());
          
          resetText();
          await startListening();
          toast.success("Spracherkennung aktiviert. Sprechen Sie jetzt.");
        } catch (permissionError) {
          console.error("Microphone permission denied:", permissionError);
          toast.error("Bitte erlauben Sie den Zugriff auf das Mikrofon, um die Spracherkennung zu nutzen.");
        }
      } catch (error) {
        console.error("Failed to start recording:", error);
        toast.error("Konnte die Aufnahme nicht starten. Bitte erlauben Sie den Zugriff auf das Mikrofon.");
      }
    }
  };

  const handleUseVocabulary = (word) => {
    const wordText = word.german;
    if (inputMethod === "voice") {
      setUserResponse(prev => prev ? `${prev} ${wordText}` : wordText);
    } else {
      setTypedResponse(prev => prev ? `${prev} ${wordText}` : wordText);
    }
  };

  const handleSubmitAnswer = () => {
    let response = inputMethod === "voice" ? userResponse : typedResponse;
    
    if (!response || !response.trim()) {
      toast.error(inputMethod === "voice" ? "Bitte sprechen Sie eine Antwort ein" : "Bitte geben Sie eine Antwort ein");
      return;
    }

    if (isListening) {
      stopListening();
    }

    // Enhanced evaluation logic - looks for key concepts rather than exact matches
    const correctAnswer = scenario.dialogue[currentDialogueIndex].text;
    const userWords = response.toLowerCase().split(/\s+/);
    
    // Extract keywords from the correct answer
    const keywordsFromCorrect = extractKeywords(correctAnswer.toLowerCase());
    
    // Count keywords that match
    const matchingKeywords = keywordsFromCorrect.filter(keyword => 
      userWords.some(word => word.includes(keyword) || keyword.includes(word))
    );
    
    const percentageMatch = (matchingKeywords.length / Math.max(1, keywordsFromCorrect.length)) * 100;
    
    // Check for any irrelevant words that shouldn't be there
    const irrelevantWords = ["um", "der", "die", "das", "ein", "eine", "und", "oder", "aber"];
    const hasIrrelevantOnly = userWords.every(word => 
      irrelevantWords.includes(word) || word.length < 2
    );
    
    // Check if any vocabulary words were used
    const newUsedVocabulary = [...usedVocabulary];
    relevantVocabulary.forEach(vocabWord => {
      const germanWord = vocabWord.german.toLowerCase();
      if (response.toLowerCase().includes(germanWord) && !newUsedVocabulary.includes(vocabWord.id)) {
        newUsedVocabulary.push(vocabWord.id);
        toast.success(`Gut! Du hast das Vokabel "${vocabWord.german}" verwendet.`);
      }
    });
    
    if (newUsedVocabulary.length !== usedVocabulary.length) {
      setUsedVocabulary(newUsedVocabulary);
    }
    
    if (hasIrrelevantOnly) {
      setFeedbackMessage("Deine Antwort enthält keine relevanten Wörter. Versuche es noch einmal mit einer vollständigen Antwort.");
    } else if (percentageMatch > 70) {
      setFeedbackMessage("Sehr gut! Deine Antwort enthält die wichtigsten Elemente und ist angemessen für diese Situation.");
    } else if (percentageMatch > 40) {
      setFeedbackMessage("Nicht schlecht, aber deine Antwort könnte verbessert werden. Versuche, spezifischere medizinische Begriffe zu verwenden.");
    } else {
      setFeedbackMessage("Deine Antwort passt nicht ganz zur Situation. Eine passendere Antwort wäre: " + correctAnswer);
    }
    
    setShowFeedback(true);
  };

  // Helper function to extract keywords from text
  const extractKeywords = (text) => {
    const words = text.split(/\s+/);
    // Filter out common words and short words
    return words.filter(word => 
      word.length > 3 && 
      !["und", "oder", "aber", "der", "die", "das", "ein", "eine", "mit", "für", "von", "zum"].includes(word)
    );
  };

  const moveToNextLine = () => {
    if (!scenario) return;
    
    if (currentDialogueIndex < scenario.dialogue.length - 1) {
      setCurrentDialogueIndex(prevIndex => prevIndex + 1);
      setUserResponse("");
      setTypedResponse("");
      setShowFeedback(false);
      resetText();
    } else {
      setExerciseCompleted(true);
      toast.success("Übung abgeschlossen!");
    }
  };

  const restartExercise = () => {
    setCurrentDialogueIndex(0);
    setUserResponse("");
    setTypedResponse("");
    setShowFeedback(false);
    setExerciseCompleted(false);
    resetText();
  };

  if (!scenario) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 px-4 flex items-center justify-center">
          <p>Laden...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${loadingPage ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <Header />
      
      <main className="flex-grow pt-24 px-4 md:px-8 pb-12">
        <div className="container mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center"
            onClick={() => navigate("/practice")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zu allen Übungen
          </Button>
          
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-neutral-100 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-neutral-800">
              {scenario.title}
            </h1>
            <p className="text-neutral-600 mb-6">
              {scenario.description}
            </p>
            
            {!exerciseCompleted ? (
              <div>
                <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center shrink-0 mt-1">
                      {scenario.dialogue[currentDialogueIndex].speaker === 'user' ? 'Du' : scenario.dialogue[currentDialogueIndex].speaker.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">
                        {scenario.dialogue[currentDialogueIndex].speaker === 'user' ? 'Du' : scenario.dialogue[currentDialogueIndex].speaker}
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm border border-neutral-100">
                        <p className="text-neutral-800">
                          {scenario.dialogue[currentDialogueIndex].text}
                        </p>
                        {scenario.dialogue[currentDialogueIndex].translation && (
                          <p className="text-neutral-500 text-sm mt-2 border-t border-neutral-100 pt-2">
                            {scenario.dialogue[currentDialogueIndex].translation}
                          </p>
                        )}
                      </div>
                      
                      {scenario.dialogue[currentDialogueIndex].speaker !== 'user' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-neutral-500 mt-2"
                          onClick={playCurrentLine}
                          disabled={isSpeaking}
                        >
                          <Volume2 className="h-4 w-4 mr-1" />
                          Anhören
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {scenario.dialogue[currentDialogueIndex].speaker === 'user' && (
                    <div className="mt-6">
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Deine Antwort:</h3>
                          
                          {suggestedVocabulary.length > 0 && (
                            <div className="flex items-center gap-1 text-sm text-medical-600">
                              <Lightbulb className="h-4 w-4" />
                              <span>Vorgeschlagene Vokabeln:</span>
                            </div>
                          )}
                        </div>
                        
                        {suggestedVocabulary.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {suggestedVocabulary.map(word => (
                              <VocabularyCard 
                                key={word.id} 
                                word={word}
                                isSuggested={true}
                                onUse={() => handleUseVocabulary(word)}
                                className="h-[150px] w-[150px] sm:w-[180px]"
                              />
                            ))}
                          </div>
                        )}
                        
                        <Tabs defaultValue="voice" className="w-full mb-4" 
                          onValueChange={(value) => setInputMethod(value as "voice" | "text")}>
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="voice" className="flex items-center gap-1">
                              <Mic className="h-4 w-4" />
                              <span>Einsprechen</span>
                            </TabsTrigger>
                            <TabsTrigger value="text" className="flex items-center gap-1">
                              <Type className="h-4 w-4" />
                              <span>Eintippen</span>
                            </TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="voice">
                            <div className="bg-white rounded-lg p-3 min-h-[100px] shadow-sm border border-neutral-100">
                              {userResponse || (isListening ? "Zuhören..." : "Klicke unten auf den Mikrofonknopf, um deine Antwort einzusprechen.")}
                            </div>
                            
                            <div className="text-xs text-neutral-500 mt-2">
                              <p>Hinweis: Reagiere frei und natürlich auf die Situation. Du musst nicht exakt wiederholen, was vorgegeben ist.</p>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="text">
                            <div className="bg-white rounded-lg p-3 min-h-[100px] shadow-sm border border-neutral-100">
                              <Input 
                                ref={userResponseRef}
                                className="w-full border-none shadow-none focus-visible:ring-0 px-0 h-auto min-h-[80px]"
                                placeholder="Gib deine Antwort hier ein..."
                                value={typedResponse}
                                onChange={(e) => setTypedResponse(e.target.value)} 
                                multiline
                              />
                            </div>
                            
                            <div className="text-xs text-neutral-500 mt-2">
                              <p>Hinweis: Reagiere frei und natürlich auf die Situation. Du musst nicht exakt wiederholen, was vorgegeben ist.</p>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                      
                      {!showFeedback ? (
                        <div className="flex gap-3">
                          {inputMethod === "voice" && (
                            <Button 
                              className={`flex items-center ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-medical-500 hover:bg-medical-600'}`}
                              onClick={handleRecordAnswer}
                            >
                              <Mic className="h-4 w-4 mr-2" />
                              {isListening ? 'Aufnahme beenden' : 'Antwort einsprechen'}
                            </Button>
                          )}
                          
                          <Button 
                            variant={inputMethod === "voice" ? "outline" : "default"}
                            onClick={handleSubmitAnswer}
                            disabled={(inputMethod === "voice" && !userResponse) || 
                                     (inputMethod === "text" && !typedResponse)}
                          >
                            Antwort überprüfen
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <div className={`p-4 rounded-lg mb-4 ${feedbackMessage.includes('Sehr gut') ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
                            {feedbackMessage}
                          </div>
                          <Button onClick={moveToNextLine}>
                            Weiter
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {scenario.dialogue[currentDialogueIndex].speaker !== 'user' && (
                    <div className="mt-4">
                      <Button onClick={moveToNextLine}>
                        Weiter
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-neutral-500">
                    Dialog {currentDialogueIndex + 1} von {scenario.dialogue.length}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Übung abgeschlossen!</h2>
                <p className="text-neutral-600 mb-6">
                  Du hast diese Übung erfolgreich absolviert. Möchtest du sie wiederholen oder zu anderen Übungen zurückkehren?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={restartExercise} variant="outline" className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Übung wiederholen
                  </Button>
                  <Button onClick={() => navigate("/practice")} className="flex items-center">
                    Weitere Übungen
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-medical-500" />
              <h2 className="text-xl font-semibold">Relevante Vokabeln</h2>
            </div>
            
            {relevantVocabulary.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relevantVocabulary.map(word => (
                  <VocabularyCard 
                    key={word.id} 
                    word={{...word, mastered: usedVocabulary.includes(word.id)}}
                    onPractice={() => speak(word.german)} 
                    className="h-[180px]"
                  />
                ))}
              </div>
            ) : (
              <p className="text-neutral-600 italic">
                Keine spezifischen Vokabeln für dieses Szenario verfügbar.
              </p>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScenarioDetail;
