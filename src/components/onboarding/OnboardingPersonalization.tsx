
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSwipeable } from "react-swipeable";

interface OnboardingPersonalizationProps {
  onComplete: (data: any) => void;
}

const OnboardingPersonalization: React.FC<OnboardingPersonalizationProps> = ({
  onComplete,
}) => {
  const { userLanguage } = useLanguage();
  const [name, setName] = useState("");
  const [dailyGoal, setDailyGoal] = useState(20);
  const [notifications, setNotifications] = useState(true);
  const [nameError, setNameError] = useState("");

  const handleComplete = () => {
    if (!name.trim()) {
      setNameError(userLanguage === 'de' ? "Bitte geben Sie Ihren Namen ein" : "Please enter your name");
      return;
    }
    
    onComplete({
      name,
      preferences: {
        dailyGoal,
        notifications,
      },
    });
  };

  // Add swipe gesture for slider
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setDailyGoal(Math.max(5, dailyGoal - 5)),
    onSwipedRight: () => setDailyGoal(Math.min(60, dailyGoal + 5)),
    trackTouch: true,
    trackMouse: true
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          {userLanguage === 'de' ? "Ihr Name" : "Your Name"}
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError("");
          }}
          placeholder={userLanguage === 'de' ? "Name eingeben" : "Enter your name"}
          className={nameError ? "border-red-300" : ""}
        />
        {nameError && <p className="text-sm text-red-500">{nameError}</p>}
      </div>

      <div className="space-y-3">
        <Label>
          {userLanguage === 'de' ? "Tägliches Lernziel (Minuten)" : "Daily Learning Goal (minutes)"}
        </Label>
        <div className="flex items-center gap-2" {...swipeHandlers}>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setDailyGoal(Math.max(5, dailyGoal - 5))}
            className="w-10 h-10 rounded-full p-0 flex items-center justify-center text-lg"
          >
            -
          </Button>
          <div className="flex-grow bg-neutral-100 h-2 rounded-full relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="h-4 w-4 bg-medical-500 rounded-full absolute" 
                style={{ left: `${(dailyGoal - 5) / 55 * 100}%` }}
              />
              <div 
                className="bg-medical-500 h-2 rounded-full" 
                style={{ width: `${(dailyGoal - 5) / 55 * 100}%` }}
              />
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setDailyGoal(Math.min(60, dailyGoal + 5))}
            className="w-10 h-10 rounded-full p-0 flex items-center justify-center text-lg"
          >
            +
          </Button>
          <span className="min-w-[40px] text-center font-medium">{dailyGoal}</span>
        </div>
      </div>
      
      <div className="pt-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications" className="cursor-pointer">
            {userLanguage === 'de' ? "Lern-Erinnerungen" : "Learning Reminders"}
          </Label>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {userLanguage === 'de'
            ? "Wir senden Ihnen Erinnerungen, um Ihre Lernziele zu erreichen"
            : "We'll send you reminders to help you reach your learning goals"}
        </p>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={handleComplete} 
          className="w-full md:w-auto"
        >
          {userLanguage === 'de' ? "Fertigstellen" : "Complete"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPersonalization;
