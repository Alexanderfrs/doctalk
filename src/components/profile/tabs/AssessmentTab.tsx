
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Lightbulb, AlertCircle, BarChart3 } from "lucide-react";
import { useLanguageAssessment } from "@/hooks/languageAssessment/useLanguageAssessment";
import { toast } from "sonner";

const AssessmentTab: React.FC = () => {
  const {
    currentQuestion,
    handleSelectAnswer,
    isComplete,
    result,
    progress,
    assessmentStarted,
    startAssessment,
    resetAssessment,
    userAnswers,
    currentQuestionIndex,
    totalQuestions,
    isTimedTest,
    setTimedTest,
    timeLimitMinutes,
    setTimeLimitMinutes,
    timeRemaining,
    showAnswerExplanations,
    toggleAnswerExplanations
  } = useLanguageAssessment();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

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
    setSelectedAnswer(null);
    startAssessment();
  };

  if (!assessmentStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Deutschtest
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-5 bg-blue-50 border border-blue-100 rounded-lg flex items-start space-x-4">
            <Lightbulb className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Deutschtest</h4>
              <p className="text-blue-700 text-sm">
                Dieser Test ermittelt Ihr aktuelles Deutschniveau (allgemeines Deutsch), 
                um Ihren Lernplan für medizinisches Deutsch optimal anzupassen.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Wie funktioniert der Test?</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-medical-100 text-medical-700 mr-3 text-xs font-medium flex-shrink-0">1</span>
                <span>Sie beantworten 8-10 Fragen zu allgemeinem Deutsch</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-medical-100 text-medical-700 mr-3 text-xs font-medium flex-shrink-0">2</span>
                <span>Der Test dauert ca. 5-8 Minuten</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-medical-100 text-medical-700 mr-3 text-xs font-medium flex-shrink-0">3</span>
                <span>Das Ergebnis bestimmt Ihr Deutschniveau (A1-C2)</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-medical-100 text-medical-700 mr-3 text-xs font-medium flex-shrink-0">4</span>
                <span>Basierend darauf passen wir die medizinischen Inhalte an</span>
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
                  Falls Ihr Niveau darunter liegt, empfehlen wir zunächst einen allgemeinen Deutschkurs.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="timed-test"
                checked={isTimedTest}
                onChange={(e) => setTimedTest(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="timed-test" className="text-sm">
                Zeitbegrenzter Test ({timeLimitMinutes} Minuten)
              </label>
            </div>
            
            {isTimedTest && (
              <div className="flex items-center space-x-2">
                <label htmlFor="time-limit" className="text-sm">
                  Zeitlimit:
                </label>
                <select
                  id="time-limit"
                  value={timeLimitMinutes}
                  onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value={5}>5 Minuten</option>
                  <option value={10}>10 Minuten</option>
                  <option value={15}>15 Minuten</option>
                </select>
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleStartAssessment} 
            className="w-full bg-medical-500 hover:bg-medical-600"
          >
            Deutschtest starten
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isComplete) {
    return (
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Test abgeschlossen!</h3>
            <p className="text-gray-600 mb-4">
              Basierend auf Ihren Antworten haben wir Ihr Deutschniveau eingeschätzt.
            </p>
            
            <div className="bg-medical-50 border border-medical-100 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-medical-800 mb-1">Ihr Deutschniveau:</h4>
              <div className="text-3xl font-bold text-medical-600 mb-2">{result?.level}</div>
              <p className="text-sm text-medical-700">{result?.description}</p>
            </div>
            
            <div className="text-sm text-gray-500 mb-6">
              <div className="mb-2">
                <span className="font-medium">Korrekt beantwortet:</span> {result?.correctCount} von {result?.totalQuestions} ({Math.round(result?.percentage || 0)}%)
              </div>
            </div>

            {result?.level && ['A1', 'A2'].includes(result.level) && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5 mr-3" />
                  <div className="text-sm">
                    <p className="text-amber-800 mb-1 font-medium">Empfehlung:</p>
                    <p className="text-amber-700">
                      Ihr Deutschniveau liegt unter B1. Wir empfehlen, zunächst Ihre allgemeinen 
                      Deutschkenntnisse zu verbessern, bevor Sie mit medizinischem Fachvokabular beginnen.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Button 
            onClick={resetAssessment} 
            className="w-full bg-medical-500 hover:bg-medical-600"
          >
            Test wiederholen
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-500">Fortschritt</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {isTimedTest && (
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Frage {currentQuestionIndex + 1} von {totalQuestions}</span>
              <span>Verbleibende Zeit: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
            </div>
          )}
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
      </CardContent>
    </Card>
  );
};

export default AssessmentTab;
