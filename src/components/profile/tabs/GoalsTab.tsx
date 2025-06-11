
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Target, Trophy, Calendar, Award } from "lucide-react";

interface GoalsTabProps {
  dailyGoal: number;
  onSaveGoals: () => void;
  onTakeCertificateTest: (certId: string) => void;
}

const GoalsTab: React.FC<GoalsTabProps> = ({ 
  dailyGoal, 
  onSaveGoals,
  onTakeCertificateTest 
}) => {
  const [localDailyGoal, setLocalDailyGoal] = useState(dailyGoal);
  const [weeklyTarget, setWeeklyTarget] = useState(5);

  const certificates = [
    {
      id: "fsp",
      name: "Fachsprachenprüfung (FSP)",
      description: "Medizinische Fachsprachenprüfung für Ärzte",
      difficulty: "B2-C1",
      status: "available"
    },
    {
      id: "telc-medizin",
      name: "telc Deutsch B2-C1 Medizin",
      description: "Fachsprachenprüfung für Gesundheitsberufe", 
      difficulty: "B2-C1",
      status: "available"
    },
    {
      id: "oet",
      name: "OET (Occupational English Test)",
      description: "Englischtest für Gesundheitsberufe",
      difficulty: "B1-C1", 
      status: "coming_soon"
    }
  ];

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

      {/* Certificate Preparation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Zertifikatsvorbereitung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Bereiten Sie sich auf anerkannte Sprachzertifikate vor:
            </p>
            
            {certificates.map((cert) => (
              <div 
                key={cert.id}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{cert.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{cert.difficulty}</Badge>
                      <Badge 
                        variant={cert.status === 'available' ? 'default' : 'secondary'}
                      >
                        {cert.status === 'available' ? 'Verfügbar' : 'Bald verfügbar'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => onTakeCertificateTest(cert.id)}
                  disabled={cert.status !== 'available'}
                  className="w-full"
                  variant={cert.status === 'available' ? 'default' : 'outline'}
                >
                  {cert.status === 'available' ? 'Test starten' : 'Bald verfügbar'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsTab;
