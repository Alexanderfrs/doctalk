
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Target } from "lucide-react";

interface GoalsTabProps {
  onSaveGoals: () => void;
}

const GoalsTab: React.FC<GoalsTabProps> = ({ 
  onSaveGoals
}) => {
  const [localDailyGoal, setLocalDailyGoal] = useState(20);
  const [weeklyTarget, setWeeklyTarget] = useState(5);

  return (
    <div className="space-y-6">
      {/* Daily Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Tägliche Lernziele
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="daily-goal">Tägliches Lernziel (Minuten)</Label>
            <div className="space-y-4">
              <Slider
                id="daily-goal"
                min={5}
                max={120}
                step={5}
                value={[localDailyGoal]}
                onValueChange={(value) => setLocalDailyGoal(value[0])}
                className="w-full"
              />
              <div className="text-center">
                <span className="text-2xl font-bold text-medical-600">{localDailyGoal}</span>
                <span className="text-gray-500 ml-1">Minuten pro Tag</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weekly-target">Wöchentliche Lerntage</Label>
            <div className="space-y-4">
              <Slider
                id="weekly-target"
                min={1}
                max={7}
                step={1}
                value={[weeklyTarget]}
                onValueChange={(value) => setWeeklyTarget(value[0])}
                className="w-full"
              />
              <div className="text-center">
                <span className="text-2xl font-bold text-medical-600">{weeklyTarget}</span>
                <span className="text-gray-500 ml-1">Tage pro Woche</span>
              </div>
            </div>
          </div>

          <Button onClick={onSaveGoals} className="w-full">
            Ziele speichern
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsTab;
