
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Lightbulb, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { useLanguageAssessment } from "@/hooks/languageAssessment/useLanguageAssessment";
import { toast } from "sonner";

interface OnboardingAssessmentProps {
  onComplete: (data: any) => void;
}

const OnboardingAssessment: React.FC<OnboardingAssessmentProps> = ({ onComplete }) => {
  const {
    currentQuestion,
    handleSelectAnswer,
    isComplete,
    result,
    progress,
    assessmentStarted,
    startAssessment,
    resetAssessment,
    isLoading,
  } = useLanguageAssessment();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showContinueOption, setShowContinueOption] = useState(false);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      toast.warning("Bitte wählen Sie eine Antwort aus");
      return;
    }
    
    handleSelectAnswer(selectedAnswer);
    setSelectedAnswer(null);
  };

  const handleStartAssessment = () => {
    startAssessment();
  };

  const handleFinish = () => {
    if (result) {
      const meetsMinimumRequirement = ['B1', 'B2', 'C1', 'C2'].includes(result.level);
      
      onComplete({ 
        level: result.level,
        meetsMinimumRequirement,
        percentage: result.percentage,
        strengths: result.strengths || [],
        recommendedContent: result.recommendedContent || []
      });
    }
  };

  const handleContinueAnyway = () => {
    if (result) {
      onComplete({ 
        level: result.level,
        meetsMinimumRequirement: false,
        percentage: result.percentage,
        strengths: result.strengths || [],
        recommendedContent: result.recommendedContent || [],
        acknowledgedLimitations: true
      });
    }
  };

  if (!assessmentStarted) {
    return (
      <div className="space-y-6">
        <div className="p-5 bg-blue-50 border border-blue-100 rounded-lg flex items-start space-x-4">
          <Lightbulb className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Deutschtest</h4>
            <p className="text-blue-700 text-sm">
              Dieser Test ermittelt Ihr aktuelles Deutschniveau, damit wir Ihren 
              Lernplan für medizinisches Deutsch optimal anpassen können.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-lg">Wie funktioniert der Test?</h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-medical-100 text-medical-700 mr-3 text-xs font-medium flex-shrink-0">1</span>
              <span>Sie beantworten 8-12 Fragen zu allgemeinem Deutsch</span>
            </li>
            <li className="flex items-start">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-medical-100 text-medical-700 mr-3 text-xs font-medium flex-shrink-0">2</span>
              <span>Der Test passt sich an Ihre Antworten an</span>
            </li>
            <li className="flex items-start">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-medical-100 text-medical-700 mr-3 text-xs font-medium flex-shrink-0">3</span>
              <span>Das Ergebnis bestimmt Ihr Deutschniveau (A1-C2)</span>
            </li>
            <li className="flex items-start">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-medical-100 text-medical-700 mr-3 text-xs font-medium flex-shrink-0">4</span>
              <span>Basierend darauf erstellen wir Ihren Lernplan</span>
            </li>
          </ul>
        </div>
        
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5 mr-3" />
            <div className="text-sm">
              <p className="text-amber-800 mb-1 font-medium">Wichtiger Hinweis:</p>
              <p className="text-amber-700">
                DocTalk ist für Lernende mit mindestens B1-Deutschniveau konzipiert. 
                Bei niedrigerem Niveau bieten wir angepasste Lernpfade an, aber empfehlen 
                zunächst die Verbesserung der allgemeinen Deutschkenntnisse.
              </p>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleStartAssessment} 
          className="w-full bg-medical-500 hover:bg-medical-600"
        >
          Deutschtest starten
        </Button>
      </div>
    );
  }

  if (isComplete && result) {
    const meetsMinimumRequirement = ['B1', 'B2', 'C1', 'C2'].includes(result.level);
    
    return (
      <div className="space-y-6">
        <div className="text-center py-4">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            meetsMinimumRequirement 
              ? 'bg-green-100 text-green-600' 
              : 'bg-amber-100 text-amber-600'
          }`}>
            {meetsMinimumRequirement ? (
              <CheckCircle className="w-8 h-8" />
            ) : (
              <AlertCircle className="w-8 h-8" />
            )}
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Test abgeschlossen!</h3>
          <p className="text-gray-600 mb-4">
            Basierend auf Ihren Antworten haben wir Ihr Deutschniveau eingeschätzt.
          </p>
          
          <div className="bg-medical-50 border border-medical-100 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-medical-800 mb-1">Ihr Deutschniveau:</h4>
            <div className="text-3xl font-bold text-medical-600 mb-2">{result.level}</div>
            <p className="text-sm text-medical-700">{result.description}</p>
          </div>
          
          <div className="text-sm text-gray-500 mb-6">
            <div className="mb-2">
              <span className="font-medium">Korrekt beantwortet:</span> {result.correctCount} von {result.totalQuestions} ({Math.round(result.percentage)}%)
            </div>
            {result.strengths && result.strengths.length > 0 && (
              <div className="mb-2">
                <span className="font-medium">Ihre Stärken:</span> {result.strengths.join(', ')}
              </div>
            )}
          </div>

          {!meetsMinimumRequirement && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5 mr-3" />
                <div className="text-sm text-left">
                  <p className="text-amber-800 mb-2 font-medium">Empfehlung:</p>
                  <p className="text-amber-700 mb-3">
                    Ihr Deutschniveau liegt unter B1. Für optimale Lernerfolge empfehlen wir, 
                    zunächst Ihre allgemeinen Deutschkenntnisse zu verbessern.
                  </p>
                  <p className="text-amber-700 mb-3">
                    Sie können DocTalk trotzdem nutzen, aber die medizinischen Inhalte werden 
                    sehr herausfordernd sein. Wir stellen Ihnen angepasste Lernpfade zur Verfügung.
                  </p>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      onClick={handleContinueAnyway}
                      variant="outline"
                      size="sm"
                      className="text-amber-700 border-amber-300 hover:bg-amber-100"
                    >
                      Trotzdem fortfahren
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {meetsMinimumRequirement && (
          <Button 
            onClick={handleFinish} 
            className="w-full bg-medical-500 hover:bg-medical-600"
          >
            Weiter zur Einrichtung
          </Button>
        )}

        <Button 
          onClick={resetAssessment}
          variant="outline"
          className="w-full border-gray-200"
        >
          Test wiederholen
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-500 mb-4"></div>
        <p className="text-medical-600">Test wird vorbereitet...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-500">Fortschritt</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {currentQuestion && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{currentQuestion.question || currentQuestion.text}</h3>
          
          <div className="space-y-3">
            {Array.isArray(currentQuestion.options) && currentQuestion.options.map((option, index) => {
              const optionId = typeof option === 'string' ? option : option.id;
              const optionText = typeof option === 'string' ? option : option.text;
              
              return (
                <div
                  key={index}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedAnswer === optionId
                      ? "border-medical-500 bg-medical-50"
                      : "border-gray-200 hover:border-medical-200 hover:bg-gray-50"
                  }`}
                  onClick={() => handleAnswerSelect(optionId)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        selectedAnswer === optionId
                          ? "border-medical-500 bg-medical-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedAnswer === optionId && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span>{optionText}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={resetAssessment}
          className="border-gray-200"
        >
          Neustart
        </Button>
        
        <Button
          onClick={handleSubmitAnswer}
          disabled={!selectedAnswer}
          className="bg-medical-500 hover:bg-medical-600"
        >
          Weiter
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingAssessment;
