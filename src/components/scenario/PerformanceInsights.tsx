
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PerformanceInsightsProps {
  insights: string;
  completedGoals: number;
  totalGoals: number;
  scenarioType: string;
  onClose: () => void;
  onRestart: () => void;
}

const PerformanceInsights: React.FC<PerformanceInsightsProps> = ({
  insights,
  completedGoals,
  totalGoals,
  scenarioType,
  onClose,
  onRestart
}) => {
  const getScenarioLabel = (type: string): string => {
    const labels = {
      'patient-care': 'Patient Care',
      'emergency': 'Emergency Response',
      'handover': 'Medical Handover',
      'elderly-care': 'Elderly Care',
      'disability-care': 'Disability Care'
    };
    return labels[type] || 'Medical Scenario';
  };

  const getPerformanceLevel = (completed: number, total: number): { level: string; color: string } => {
    const percentage = (completed / total) * 100;
    if (percentage >= 90) return { level: 'Excellent', color: 'bg-green-500' };
    if (percentage >= 70) return { level: 'Good', color: 'bg-blue-500' };
    if (percentage >= 50) return { level: 'Fair', color: 'bg-yellow-500' };
    return { level: 'Needs Practice', color: 'bg-orange-500' };
  };

  const performance = getPerformanceLevel(completedGoals, totalGoals);

  return (
    <Card className="border-2 border-medical-200 bg-gradient-to-br from-medical-50 to-blue-50">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <Trophy className="h-8 w-8 text-yellow-500" />
        </div>
        <CardTitle className="text-xl text-medical-800">
          Scenario Complete!
        </CardTitle>
        <Badge variant="secondary" className="mx-auto">
          {getScenarioLabel(scenarioType)}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${performance.color}`}>
            <CheckCircle2 className="h-4 w-4 mr-1" />
            {performance.level}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {completedGoals}/{totalGoals} objectives completed
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center mb-2">
            <Sparkles className="h-4 w-4 text-medical-600 mr-2" />
            <h4 className="font-medium text-medical-800">Performance Insights</h4>
          </div>
          <p className="text-sm text-neutral-700 leading-relaxed">
            {insights}
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
          <Button 
            onClick={onRestart}
            className="flex-1 bg-medical-600 hover:bg-medical-700 text-white"
          >
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceInsights;
