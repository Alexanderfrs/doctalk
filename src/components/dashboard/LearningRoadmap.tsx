import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, BookOpen, MessageCircle, FileText, Users } from "lucide-react";
import { LearningRoadmap as LearningRoadmapType, LearningObjective } from "@/hooks/useLearningRoadmap";

interface LearningRoadmapProps {
  roadmap: LearningRoadmapType;
  onObjectiveClick?: (objective: LearningObjective) => void;
}

const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ roadmap, onObjectiveClick }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vocabulary':
        return <BookOpen className="h-4 w-4" />;
      case 'scenarios':
        return <Users className="h-4 w-4" />;
      case 'communication':
        return <MessageCircle className="h-4 w-4" />;
      case 'grammar':
        return <FileText className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vocabulary':
        return 'bg-blue-500';
      case 'scenarios':
        return 'bg-green-500';
      case 'communication':
        return 'bg-purple-500';
      case 'grammar':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const roadmapText = [roadmap.userLevel, roadmap.currentPhase].filter(Boolean).join(' • ');

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Ihr Lernpfad</span>
            {roadmapText && (
              <Badge variant="outline" className="text-sm">
                {roadmapText}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Gesamtfortschritt</span>
              <span>{Math.round(roadmap.progressPercentage)}%</span>
            </div>
            <Progress value={roadmap.progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Diese Woche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {roadmap.weeklyGoals.map((objective) => (
              <div
                key={objective.id}
                className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onObjectiveClick?.(objective)}
              >
                <div className={`p-2 rounded-lg ${getCategoryColor(objective.category)} text-white`}>
                  {getCategoryIcon(objective.category)}
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-sm">{objective.title}</h4>
                  <p className="text-xs text-gray-600">{objective.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{objective.estimatedTime} Min</span>
                  </div>
                </div>
                {objective.completed && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Alle Lernziele</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {roadmap.objectives.map((objective) => (
              <div
                key={objective.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  objective.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onObjectiveClick?.(objective)}
              >
                <div className={`p-2 rounded-lg ${getCategoryColor(objective.category)} text-white`}>
                  {getCategoryIcon(objective.category)}
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-sm">{objective.title}</h4>
                  <p className="text-xs text-gray-600">{objective.description}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{objective.estimatedTime} Min</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {objective.difficulty}
                    </Badge>
                  </div>
                </div>
                {objective.completed && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Recommendations */}
      {roadmap.nextRecommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Empfohlene nächste Schritte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {roadmap.nextRecommendations.map((objective) => (
                <div
                  key={objective.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-medical-200 bg-medical-50 cursor-pointer hover:bg-medical-100 transition-colors"
                  onClick={() => onObjectiveClick?.(objective)}
                >
                  <div className={`p-2 rounded-lg ${getCategoryColor(objective.category)} text-white`}>
                    {getCategoryIcon(objective.category)}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-sm">{objective.title}</h4>
                    <p className="text-xs text-gray-600">{objective.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{objective.estimatedTime} Min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LearningRoadmap;
