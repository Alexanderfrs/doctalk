
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, Volume2, CheckCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import scenarios from "@/data/scenarios";
import useTextToSpeech from "@/hooks/useTextToSpeech";
import useVoiceRecognition from "@/hooks/useVoiceRecognition";

const ScenarioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState(null);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [userResponse, setUserResponse] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const { speak, isSpeaking } = useTextToSpeech();
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    resetTranscript 
  } = useVoiceRecognition();

  useEffect(() => {
    const foundScenario = scenarios.find(s => s.id === id);
    if (foundScenario) {
      setScenario(foundScenario);
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
    setUserResponse(transcript);
  }, [transcript]);

  const playCurrentLine = () => {
    if (!scenario || !scenario.dialogue[currentDialogueIndex]) return;
    
    const line = scenario.dialogue[currentDialogueIndex];
    if (line.speaker !== 'user') {
      speak(line.text);
    }
  };

  const handleRecordAnswer = async () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  const handleSubmitAnswer = () => {
    if (!userResponse.trim()) {
      toast.error("Bitte sprich eine Antwort ein");
      return;
    }

    // Simple evaluation logic - can be enhanced with more sophisticated comparison
    const correctAnswer = scenario.dialogue[currentDialogueIndex].text;
    const userWords = userResponse.toLowerCase().split(' ');
    const correctWords = correctAnswer.toLowerCase().split(' ');
    
    // Count words that match
    const matchingWords = userWords.filter(word => 
      correctWords.some(correctWord => correctWord.includes(word) || word.includes(correctWord))
    ).length;
    
    const percentageMatch = (matchingWords / correctWords.length) * 100;
    
    if (percentageMatch > 70) {
      setFeedbackMessage("Sehr gut! Deine Antwort war korrekt.");
    } else if (percentageMatch > 40) {
      setFeedbackMessage("Nicht schlecht, aber versuche es noch einmal. Die korrekte Antwort ist: " + correctAnswer);
    } else {
      setFeedbackMessage("Versuche es noch einmal. Die korrekte Antwort ist: " + correctAnswer);
    }
    
    setShowFeedback(true);
  };

  const moveToNextLine = () => {
    if (!scenario) return;
    
    if (currentDialogueIndex < scenario.dialogue.length - 1) {
      setCurrentDialogueIndex(prevIndex => prevIndex + 1);
      setUserResponse("");
      setShowFeedback(false);
      resetTranscript();
    } else {
      setExerciseCompleted(true);
      toast.success("Übung abgeschlossen!");
    }
  };

  const restartExercise = () => {
    setCurrentDialogueIndex(0);
    setUserResponse("");
    setShowFeedback(false);
    setExerciseCompleted(false);
    resetTranscript();
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
                        <h3 className="text-lg font-medium mb-2">Deine Antwort:</h3>
                        <div className="bg-white rounded-lg p-3 min-h-[100px] shadow-sm border border-neutral-100">
                          {userResponse || (isListening ? "Zuhören..." : "Klicke unten auf den Mikrofonknopf, um deine Antwort einzusprechen.")}
                        </div>
                      </div>
                      
                      {!showFeedback ? (
                        <div className="flex gap-3">
                          <Button 
                            className={`flex items-center ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-medical-500 hover:bg-medical-600'}`}
                            onClick={handleRecordAnswer}
                          >
                            <Mic className="h-4 w-4 mr-2" />
                            {isListening ? 'Aufnahme beenden' : 'Antwort einsprechen'}
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            onClick={handleSubmitAnswer}
                            disabled={!userResponse.trim()}
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
            <h2 className="text-xl font-semibold mb-4">Relevante Vokabeln</h2>
            <div className="space-y-3">
              {/* Here we could display vocabulary items related to the scenario */}
              <p className="text-neutral-600 italic">
                Vokabelübungen für dieses Szenario werden bald verfügbar sein.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScenarioDetail;
