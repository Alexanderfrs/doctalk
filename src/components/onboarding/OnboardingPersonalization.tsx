
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronRight, Target } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface OnboardingPersonalizationProps {
  onComplete: () => void;
}

const OnboardingPersonalization: React.FC<OnboardingPersonalizationProps> = ({ onComplete }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [practiceMinutes, setPracticeMinutes] = useState(15);
  const [studyDays, setStudyDays] = useState<string[]>(["monday", "wednesday", "friday"]);
  
  const goals = [
    { id: "fsp-prep", label: "Vorbereitung auf die Fachsprachenprüfung" },
    { id: "daily-comms", label: "Alltägliche Kommunikation mit Patienten" },
    { id: "documentation", label: "Medizinische Dokumentation" },
    { id: "team-comms", label: "Kommunikation im medizinischen Team" },
    { id: "emergency", label: "Notfallsituationen" },
  ];
  
  const weekdays = [
    { id: "monday", label: "Mo" },
    { id: "tuesday", label: "Di" },
    { id: "wednesday", label: "Mi" },
    { id: "thursday", label: "Do" },
    { id: "friday", label: "Fr" },
    { id: "saturday", label: "Sa" },
    { id: "sunday", label: "So" },
  ];
  
  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };
  
  const toggleDay = (dayId: string) => {
    setStudyDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };
  
  const handleComplete = () => {
    // Save personalization settings to localStorage
    localStorage.setItem("userGoals", JSON.stringify(selectedGoals));
    localStorage.setItem("practiceDuration", practiceMinutes.toString());
    localStorage.setItem("studyDays", JSON.stringify(studyDays));
    
    onComplete();
  };
  
  return (
    <div className="space-y-6">
      <div className="p-5 bg-purple-50 border border-purple-100 rounded-lg flex items-start space-x-4">
        <Target className="h-6 w-6 text-purple-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-purple-900 mb-1">Personalisieren Sie Ihren Lernplan</h4>
          <p className="text-purple-700 text-sm">
            Wählen Sie Ihre Lernziele und erstellen Sie einen Zeitplan, 
            der zu Ihrem Alltag als medizinische Fachkraft passt.
          </p>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-3">Lernziele (Mindestens 1 auswählen)</h4>
        <div className="space-y-3">
          {goals.map(goal => (
            <div key={goal.id} className="flex items-start space-x-3">
              <Checkbox 
                id={goal.id} 
                checked={selectedGoals.includes(goal.id)}
                onCheckedChange={() => toggleGoal(goal.id)}
              />
              <Label 
                htmlFor={goal.id} 
                className="text-sm leading-tight cursor-pointer"
              >
                {goal.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-3">Tägliche Übungszeit: {practiceMinutes} Minuten</h4>
        <Slider
          value={[practiceMinutes]}
          min={5}
          max={60}
          step={5}
          onValueChange={([value]) => setPracticeMinutes(value)}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>5 Min</span>
          <span>15 Min</span>
          <span>30 Min</span>
          <span>45 Min</span>
          <span>60 Min</span>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-3">An welchen Tagen möchten Sie üben?</h4>
        <div className="flex gap-2">
          {weekdays.map(day => (
            <button
              key={day.id}
              type="button"
              onClick={() => toggleDay(day.id)}
              className={`flex-1 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                studyDays.includes(day.id)
                  ? "bg-medical-100 text-medical-800"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>
      
      <Button
        onClick={handleComplete}
        disabled={selectedGoals.length === 0 || studyDays.length === 0}
        className="w-full bg-medical-500 hover:bg-medical-600"
      >
        Einrichtung abschließen
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default OnboardingPersonalization;
