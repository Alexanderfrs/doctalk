
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Lightbulb, RefreshCw } from "lucide-react";
import { useLanguageAssessment } from "@/hooks/useLanguageAssessment";

const AssessmentTab: React.FC = () => {
  const {
    assessmentStarted,
    assessmentStep,
    currentQuestion,
    totalQuestions,
    userAnswers,
    isComplete,
    result,
    startAssessment,
    handleAnswer,
    handleNextStep,
    resetAssessment
  } = useLanguageAssessment();

  const renderQuestionOptions = () => {
    if (!currentQuestion) return null;
    const isOptionsObjects = currentQuestion.options.length > 0 && typeof currentQuestion.options[0] !== 'string';
    
    if (isOptionsObjects) {
      return (currentQuestion.options as Array<{
        id: string;
        text: string;
      }>).map(option => (
        <div 
          key={option.id} 
          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
            userAnswers.some(a => a.questionId === currentQuestion.id && a.selectedAnswer === option.id) 
              ? "border-medical-500 bg-medical-50 dark:border-medical-400 dark:bg-medical-900/30" 
              : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
          }`} 
          onClick={() => handleAnswer(currentQuestion.id, option.id)}
        >
          {option.text}
        </div>
      ));
    } else {
      return (currentQuestion.options as string[]).map((option, index) => (
        <div 
          key={index} 
          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
            userAnswers.some(a => a.questionId === currentQuestion.id && a.selectedAnswer === option) 
              ? "border-medical-500 bg-medical-50 dark:border-medical-400 dark:bg-medical-900/30" 
              : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
          }`}
          onClick={() => handleAnswer(currentQuestion.id, option)}
        >
          {option}
        </div>
      ));
    }
  };

  if (!assessmentStarted) {
    return (
      <Card className="dark:bg-neutral-800 dark:border-neutral-700">
        <CardHeader>
          <CardTitle>Sprachtest</CardTitle>
          <CardDescription className="dark:text-neutral-400">
            Bestimmen Sie Ihr aktuelles Sprachniveau und erhalten Sie personalisierte Lernempfehlungen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Warum ein Sprachtest?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-2">
              Unser adaptiver Sprachtest hilft uns dabei, Ihr aktuelles Sprachniveau zu ermitteln und den Lernplan 
              entsprechend anzupassen. Der Test dauert etwa 5 Minuten und passt sich Ihrem Sprachniveau an.
            </p>
            <ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-1 mb-2">
              <li className="flex items-start gap-2">
                <div className="rounded-full h-5 w-5 bg-medical-100 dark:bg-medical-800 text-medical-700 dark:text-medical-300 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <span>Bestimmung Ihres aktuellen Sprachniveaus (A1-C1)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full h-5 w-5 bg-medical-100 dark:bg-medical-800 text-medical-700 dark:text-medical-300 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <span>Identifizierung von Stärken und Schwächen</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full h-5 w-5 bg-medical-100 dark:bg-medical-800 text-medical-700 dark:text-medical-300 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <span>Personalisierung Ihres Lernplans</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={startAssessment} className="w-full md:w-auto">
            Test starten
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  if (isComplete && result) {
    return (
      <Card className="dark:bg-neutral-800 dark:border-neutral-700">
        <CardHeader>
          <CardTitle>Testergebnis</CardTitle>
          <CardDescription className="dark:text-neutral-400">
            Ihre Sprachkenntnisse und Empfehlungen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex justify-center mb-2">
            <div className="w-32 h-32 bg-medical-100 dark:bg-medical-900/50 rounded-full flex items-center justify-center">
              <div className="text-center">
                <span className="block text-3xl font-bold text-medical-700 dark:text-medical-300">{result.level}</span>
                <span className="text-sm text-medical-600 dark:text-medical-400">{Math.round(result.percentage)}%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-medical-600 dark:text-medical-400">{result.correctCount}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">Richtig</div>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-medical-600 dark:text-medical-400">{result.totalQuestions - result.correctCount}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">Falsch</div>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-medical-600 dark:text-medical-400">{result.totalQuestions}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">Gesamt</div>
            </div>
          </div>
          
          <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Ihr Sprachniveau: {result.level}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">{result.description}</p>
            <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg border border-neutral-200 dark:border-neutral-600">
              <h4 className="font-medium mb-1">Empfehlungen:</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-start gap-2">
                  <div className="rounded-full h-5 w-5 bg-medical-100 dark:bg-medical-800 text-medical-700 dark:text-medical-300 flex items-center justify-center flex-shrink-0">→</div>
                  <span>Üben Sie medizinische Fachbegriffe auf Niveau {result.level}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full h-5 w-5 bg-medical-100 dark:bg-medical-800 text-medical-700 dark:text-medical-300 flex items-center justify-center flex-shrink-0">→</div>
                  <span>Fokussieren Sie sich auf {result.level === 'A1' || result.level === 'A2' ? 'grundlegende Patientengespräche' : 'komplexe Arzt-Patienten-Kommunikation'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full h-5 w-5 bg-medical-100 dark:bg-medical-800 text-medical-700 dark:text-medical-300 flex items-center justify-center flex-shrink-0">→</div>
                  <span>Absolvieren Sie unsere {result.level}-Szenarien für den medizinischen Bereich</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={resetAssessment} variant="outline" className="w-full md:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Test neu starten
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="dark:bg-neutral-800 dark:border-neutral-700">
      <CardHeader>
        <CardTitle>Sprachtest</CardTitle>
        <CardDescription className="dark:text-neutral-400">
          Frage {assessmentStep} von {totalQuestions}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mb-2">
          <Badge className="mb-2">{currentQuestion?.level || "A1"}</Badge>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-4">
            <div 
              className="bg-medical-500 h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${(assessmentStep / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-lg">
            {currentQuestion?.question || currentQuestion?.text}
          </h3>
          
          {currentQuestion?.image && (
            <div className="rounded-lg overflow-hidden mb-4">
              <img 
                src={currentQuestion.image} 
                alt="Question illustration" 
                className="w-full h-auto" 
              />
            </div>
          )}
          
          <div className="space-y-2">
            {renderQuestionOptions()}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleNextStep} 
          disabled={!userAnswers.some(a => a.questionId === currentQuestion?.id)}
        >
          {assessmentStep === totalQuestions ? "Test abschließen" : "Weiter"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssessmentTab;
