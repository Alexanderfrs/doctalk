
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Mic, 
  BookOpen, 
  CheckCircle, 
  Info, 
  HelpCircle,
  MessageCircle,
  User,
  ChevronRight,
  Lightbulb,
  Repeat,
  X,
  Globe,
  AlertTriangle,
  Clipboard,
  Users2
} from "lucide-react";
import scenarios from "@/data/scenarios";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import vocabularyCategories from "@/data/vocabulary";

const ScenarioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { translate, getGermanContent, userLanguage } = useLanguage();
  const { t, getLocalizedContent } = useTranslation();
  const { toast } = useToast();
  
  const [scenario, setScenario] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dialog");
  const [currentDialogStep, setCurrentDialogStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingFeedback, setRecordingFeedback] = useState<null | { score: number; feedback: string }>(null);
  const [showHint, setShowHint] = useState(false);
  const [scenarioVocabulary, setScenarioVocabulary] = useState<any[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dialogContainerRef = useRef<HTMLDivElement | null>(null);

  // Use the voice recognition hook
  const { startListening, stopListening, transcript, isListening, error: recognitionError } = useVoiceRecognition();
  
  // Use the text-to-speech hook
  const { speak, speaking, cancel } = useTextToSpeech();
  
  useEffect(() => {
    // Find the scenario by ID
    const foundScenario = scenarios.find(s => s.id === id);
    
    if (foundScenario) {
      setScenario(foundScenario);
      
      // Load vocabulary for this scenario
      if (foundScenario.vocabularyIds) {
        const vocabWords = [];
        foundScenario.vocabularyIds.forEach(categoryId => {
          const category = vocabularyCategories.find(cat => cat.id === categoryId);
          if (category) {
            vocabWords.push(...category.words);
          }
        });
        setScenarioVocabulary(vocabWords);
      }
      
      // Simulate loading delay for animation
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } else {
      // Scenario not found, redirect to practice page
      toast({
        title: t("scenarioNotFound"),
        description: t("redirectingToPractice"),
        variant: "destructive"
      });
      navigate("/practice");
    }
  }, [id, navigate, t, toast]);
  
  useEffect(() => {
    // Auto-scroll to current dialog step
    if (dialogContainerRef.current && !loading && scenario?.dialogue) {
      const activeElement = document.getElementById(`dialog-step-${currentDialogStep}`);
      if (activeElement) {
        dialogContainerRef.current.scrollTo({
          top: activeElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
  }, [currentDialogStep, loading, scenario]);
  
  useEffect(() => {
    // Play current dialogue audio when isPlaying is true
    if (isPlaying && scenario?.dialogue && currentDialogStep < scenario.dialogue.length) {
      speak(scenario.dialogue[currentDialogStep].text);
    } else if (!isPlaying) {
      cancel();
    }
  }, [isPlaying, currentDialogStep, scenario, speak, cancel]);

  // Update isPlaying state based on text-to-speech status
  useEffect(() => {
    setIsPlaying(speaking);
  }, [speaking]);
  
  const handlePlayPause = () => {
    if (isPlaying) {
      cancel();
    } else if (scenario?.dialogue) {
      speak(scenario.dialogue[currentDialogStep].text);
    }
  };
  
  const handleNext = () => {
    if (scenario?.dialogue && currentDialogStep < scenario.dialogue.length - 1) {
      setCurrentDialogStep(currentDialogStep + 1);
      setIsPlaying(false);
      cancel();
    }
  };
  
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // If we have audio playing, update its muted state
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };
  
  const handleRecordingStart = () => {
    if (isRecording) return;
    
    setIsRecording(true);
    startListening();
    
    // Stop recording after 5 seconds
    setTimeout(() => {
      handleRecordingStop();
    }, 5000);
  };
  
  const handleRecordingStop = () => {
    if (!isRecording) return;
    
    stopListening();
    setIsRecording(false);
    
    if (transcript && scenario?.dialogue) {
      const currentText = scenario.dialogue[currentDialogStep].text;
      // Simple similarity check (in a real app, you'd use a more sophisticated approach)
      const similarity = compareTexts(transcript.toLowerCase(), currentText.toLowerCase());
      
      setRecordingFeedback({
        score: similarity,
        feedback: getFeedbackMessage(similarity)
      });
    } else {
      setRecordingFeedback({
        score: 0,
        feedback: t("noSpeechDetected")
      });
    }
  };
  
  const compareTexts = (text1: string, text2: string) => {
    // A simple function to compare two texts and return a similarity score (0-100)
    // In a real app, you would use a more sophisticated algorithm
    const words1 = text1.split(/\s+/);
    const words2 = text2.split(/\s+/);
    
    let matchCount = 0;
    for (const word of words1) {
      if (words2.includes(word)) {
        matchCount++;
      }
    }
    
    return Math.round((matchCount / Math.max(words1.length, words2.length)) * 100);
  };
  
  const getFeedbackMessage = (score: number) => {
    if (score > 90) {
      return t("excellentPronunciation");
    } else if (score > 70) {
      return t("goodPronunciation");
    } else if (score > 50) {
      return t("understandablePronunciation");
    } else {
      return t("practiceMorePronunciation");
    }
  };
  
  const handleDismissFeedback = () => {
    setRecordingFeedback(null);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-48 bg-neutral-200 rounded-md mb-4"></div>
          <div className="h-4 w-64 bg-neutral-100 rounded-md"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 px-4 md:px-8 pb-24">
        <div className="container mx-auto">
          {/* Back button and title */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="mb-2 -ml-3 text-neutral-600 hover:text-neutral-800"
              onClick={() => navigate("/practice")}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              {t("backToExercises")}
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">{scenario.title}</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-neutral-50">
                    {t(scenario.category)}
                  </Badge>
                  <Badge variant="outline" className="bg-neutral-50">
                    {t(scenario.difficulty)}
                  </Badge>
                  {scenario.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="bg-neutral-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 mt-2 md:mt-0">
                <Button variant="outline" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  {t("vocabulary")}
                </Button>
                <Button className="flex items-center bg-medical-500 hover:bg-medical-600">
                  <Mic className="mr-2 h-4 w-4" />
                  {t("practicePronunciation")}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Dialog and vocabulary */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="dialog" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="dialog" className="flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t("dialog")}
                  </TabsTrigger>
                  <TabsTrigger value="vocabulary" className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    {t("vocabulary")}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="dialog" className="mt-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mr-2"
                          onClick={handlePlayPause}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mr-2"
                          onClick={handleNext}
                        >
                          <SkipForward className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mr-4"
                          onClick={handleToggleMute}
                        >
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </Button>
                        <Progress 
                          value={scenario?.dialogue ? ((currentDialogStep / (scenario.dialogue.length - 1)) * 100) : 0} 
                          className="w-24 md:w-40"
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={cn(
                            "text-xs",
                            showTranslation ? "bg-medical-50 text-medical-700" : "text-neutral-600"
                          )}
                          onClick={() => setShowTranslation(!showTranslation)}
                        >
                          <Globe className="h-3.5 w-3.5 mr-1" />
                          {showTranslation ? t("hideTranslation") : t("showTranslation")}
                        </Button>
                      </div>
                    </div>
                    
                    <ScrollArea className="h-[calc(100vh-400px)]" ref={dialogContainerRef}>
                      <div className="space-y-6 pr-4">
                        {scenario?.dialogue?.map((item: any, index: number) => {
                          const translatedLine = userLanguage !== 'en' ? item.translation || '' : '';
                          return (
                            <div 
                              key={index}
                              id={`dialog-step-${index}`}
                              className={cn(
                                "transition-all duration-300",
                                index === currentDialogStep ? "opacity-100" : "opacity-50"
                              )}
                            >
                              <div className="flex items-start gap-3 mb-2">
                                <Avatar className={cn(
                                  "h-8 w-8",
                                  item.speaker === "doctor" ? "bg-medical-100" : 
                                  item.speaker === "patient" ? "bg-blue-100" : 
                                  item.speaker === "nurse" ? "bg-green-100" : "bg-neutral-100"
                                )}>
                                  <AvatarFallback>
                                    {item.speaker === "doctor" ? "A" : 
                                     item.speaker === "patient" ? "P" : 
                                     item.speaker === "nurse" ? "P" : "?"}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center">
                                    <p className="font-medium text-sm">
                                      {t(item.speaker)}
                                    </p>
                                    {index === currentDialogStep && (
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="ml-2 h-6 px-2 text-xs text-medical-600 hover:text-medical-700 hover:bg-medical-50"
                                        onClick={handleRecordingStart}
                                        disabled={isRecording}
                                      >
                                        {isRecording ? (
                                          <span className="flex items-center">
                                            <span className="animate-pulse mr-1">●</span> {t("recording")}
                                          </span>
                                        ) : (
                                          <span className="flex items-center">
                                            <Mic className="h-3 w-3 mr-1" /> {t("repeatAfterMe")}
                                          </span>
                                        )}
                                      </Button>
                                    )}
                                  </div>
                                  <p className="text-neutral-800">{getGermanContent(item.text)}</p>
                                  {(showTranslation && translatedLine) && (
                                    <p className="text-neutral-500 text-sm mt-1 italic">{translatedLine}</p>
                                  )}
                                </div>
                              </div>
                              
                              {recordingFeedback && index === currentDialogStep && (
                                <div className="ml-11 mt-2 bg-medical-50 p-3 rounded-md relative">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="absolute top-1 right-1 h-6 w-6 p-0"
                                    onClick={handleDismissFeedback}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                  <div className="flex items-center mb-2">
                                    <div className="font-medium text-medical-700 mr-2">{t("pronunciationFeedback")}:</div>
                                    <div className="text-sm font-medium">
                                      {recordingFeedback.score}%
                                    </div>
                                    <div className="ml-2 w-24 bg-white rounded-full h-2">
                                      <div 
                                        className={cn(
                                          "h-full rounded-full",
                                          recordingFeedback.score > 90 ? "bg-green-500" :
                                          recordingFeedback.score > 80 ? "bg-yellow-500" : "bg-orange-500"
                                        )}
                                        style={{ width: `${recordingFeedback.score}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                  <p className="text-sm text-medical-700">{recordingFeedback.feedback}</p>
                                </div>
                              )}
                              
                              {index === currentDialogStep && (
                                <div className="ml-11 mt-2 flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-xs h-7"
                                    onClick={() => setShowHint(!showHint)}
                                  >
                                    <HelpCircle className="h-3 w-3 mr-1" />
                                    {t("hint")}
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-xs h-7"
                                    onClick={() => speak(scenario.dialogue[currentDialogStep].text)}
                                  >
                                    <Repeat className="h-3 w-3 mr-1" />
                                    {t("repeat")}
                                  </Button>
                                </div>
                              )}
                              
                              {showHint && index === currentDialogStep && (
                                <div className="ml-11 mt-2 bg-blue-50 p-3 rounded-md">
                                  <div className="flex items-start">
                                    <Lightbulb className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                                    <div>
                                      <p className="text-sm font-medium text-blue-700 mb-1">{t("languageHint")}:</p>
                                      <p className="text-sm text-blue-700">
                                        {item.hint || t("defaultLanguageHint")}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </Card>
                </TabsContent>
                
                <TabsContent value="vocabulary" className="mt-4">
                  <Card className="p-4">
                    <h3 className="text-lg font-medium mb-4">{t("importantVocabularyInScenario")}</h3>
                    
                    <ScrollArea className="h-[calc(100vh-400px)]">
                      <div className="space-y-4 pr-4">
                        {scenarioVocabulary.length > 0 ? (
                          scenarioVocabulary.map((item, index) => {
                            const localizedContent = getLocalizedContent(item.id, item.english);
                            return (
                              <div key={index} className="border-b border-neutral-100 pb-3 last:border-0">
                                <div className="flex justify-between">
                                  <div>
                                    <p className="font-medium">{getGermanContent(item.german)}</p>
                                    <p className="text-neutral-500 text-sm">
                                      {typeof localizedContent === 'object' 
                                        ? localizedContent.translation 
                                        : localizedContent || item.english}
                                    </p>
                                  </div>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button 
                                          variant="ghost" 
                                          size="sm" 
                                          className="h-8 w-8 p-0"
                                          onClick={() => speak(item.german)}
                                        >
                                          <Volume2 className="h-4 w-4 text-neutral-500" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{t("listenToPronunciation")}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                                {item.example && (
                                  <div className="mt-2 text-sm">
                                    <p className="text-neutral-700">{getGermanContent(item.example)}</p>
                                    {userLanguage !== 'en' && (
                                      <p className="text-neutral-500 italic">
                                        {getLocalizedContent(`${item.id}-example`, '')}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center py-6 text-neutral-500">
                            {t("noVocabularyForScenario")}
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right column - Context and info */}
            <div>
              <Card className="p-4 mb-6">
                <h3 className="text-lg font-medium mb-3">{t("aboutThisScenario")}</h3>
                <p className="text-neutral-600 mb-4">{scenario.description}</p>
                
                <Separator className="my-4" />
                
                <h4 className="font-medium mb-2">{t("context")}:</h4>
                <p className="text-neutral-600 text-sm mb-4">{scenario.context}</p>
                
                <h4 className="font-medium mb-2">{t("learningObjectives")}:</h4>
                <ul className="space-y-2 mb-4">
                  {scenario.learningObjectives?.map((objective: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm text-neutral-600">{objective}</span>
                    </li>
                  ))}
                </ul>
                
                <Separator className="my-4" />
                
                <h4 className="font-medium mb-2">{t("involvedPersons")}:</h4>
                <div className="space-y-3">
                  {scenario.characters?.map((character: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <Avatar className={cn(
                        "h-8 w-8 mr-3",
                        character.role === "doctor" ? "bg-medical-100" : 
                        character.role === "patient" ? "bg-blue-100" : 
                        character.role === "nurse" ? "bg-green-100" : "bg-neutral-100"
                      )}>
                        <AvatarFallback>
                          {character.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{character.name}</p>
                        <p className="text-neutral-500 text-xs">
                          {t(character.role)}
                          {character.description && ` - ${character.description}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-3">{t("similarScenarios")}</h3>
                <div className="space-y-3">
                  {scenarios
                    .filter(s => s.id !== scenario.id && s.category === scenario.category)
                    .slice(0, 3)
                    .map(s => (
                      <div 
                        key={s.id} 
                        className="flex items-center p-2 hover:bg-neutral-50 rounded-md cursor-pointer"
                        onClick={() => navigate(`/scenario/${s.id}`)}
                      >
                        <div className="w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center mr-3">
                          {s.category === "patient-care" ? <User className="h-5 w-5 text-medical-600" /> : 
                           s.category === "emergency" ? <AlertTriangle className="h-5 w-5 text-medical-600" /> :
                           s.category === "documentation" ? <Clipboard className="h-5 w-5 text-medical-600" /> :
                           <Users2 className="h-5 w-5 text-medical-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{s.title}</p>
                          <p className="text-neutral-500 text-xs">{t(s.difficulty)}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-neutral-400" />
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/audio/sample-dialog.mp3" />
    </div>
  );
};

export default ScenarioDetail;
