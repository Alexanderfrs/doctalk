
import React from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, Target } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useVocabularyProgress } from "@/hooks/useVocabularyProgress";
import LearningRoadmap from "./LearningRoadmap";
import RecentScenarios from "@/components/home/RecentScenarios";
import { LearningRoadmap as LearningRoadmapType, LearningObjective } from "@/hooks/useLearningRoadmap";

interface DashboardTabsProps {
  roadmap: LearningRoadmapType | null;
  roadmapLoading: boolean;
  germanLevel?: string;
  onObjectiveClick: (objective: LearningObjective) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  roadmap,
  roadmapLoading,
  germanLevel,
  onObjectiveClick
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { getMasteryStats } = useVocabularyProgress();

  const masteryStats = getMasteryStats();

  // Sample scenarios data based on user's German level
  const getSampleScenarios = () => {
    const level = germanLevel || 'A1';
    
    const scenarios = [
      {
        id: "patient-intake-basic",
        title: "Patientenaufnahme Grundlagen",
        description: "Lernen Sie die Grundlagen der Patientenaufnahme und wichtige Fragen",
        difficulty: level === 'A1' || level === 'A2' ? 'beginner' : level === 'B1' || level === 'B2' ? 'intermediate' : 'advanced',
        category: "patient-care",
        tags: ["Aufnahme", "Grundlagen", "Patientengespräch"],
        progress: Math.floor(Math.random() * 100)
      },
      {
        id: "medical-history",
        title: "Anamnese führen",
        description: "Effektive Anamnesegespräche mit Patienten führen",
        difficulty: level === 'A1' ? 'beginner' : level === 'A2' || level === 'B1' ? 'intermediate' : 'advanced',
        category: "patient-care", 
        tags: ["Anamnese", "Patientengespräch", "Diagnose"],
        progress: Math.floor(Math.random() * 100)
      },
      {
        id: "team-communication",
        title: "Kommunikation im Team",
        description: "Professionelle Kommunikation mit Kollegen und Vorgesetzten",
        difficulty: level === 'A1' || level === 'A2' ? 'beginner' : 'intermediate',
        category: "teamwork",
        tags: ["Team", "Kommunikation", "Kollegen"],
        progress: Math.floor(Math.random() * 100)
      }
    ];

    return scenarios;
  };

  return (
    <Tabs defaultValue="roadmap" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="roadmap" className="flex items-center gap-2" data-tutorial-target="roadmap-tab">
          <Target className="h-4 w-4" />
          {!isMobile && "Lernpfad"}
        </TabsTrigger>
        <TabsTrigger value="scenarios" className="flex items-center gap-2" data-tutorial-target="scenarios-tab">
          <MessageCircle className="h-4 w-4" />
          {!isMobile && "Szenarien"}
        </TabsTrigger>
        <TabsTrigger value="vocabulary" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          {!isMobile && "Vokabeln"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="roadmap" className="space-y-6">
        {roadmap ? (
          <LearningRoadmap 
            roadmap={roadmap} 
            onObjectiveClick={onObjectiveClick}
          />
        ) : roadmapLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p>Generiere personalisierten Lernpfad...</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="mb-4">
                Führen Sie zunächst das Sprach-Assessment durch, um einen personalisierten Lernpfad zu erhalten.
              </p>
              <Button onClick={() => navigate('/profile')}>
                Assessment starten
              </Button>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="scenarios">
        <RecentScenarios activeScenarios={getSampleScenarios()} />
      </TabsContent>

      <TabsContent value="vocabulary">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Vokabel-Fortschritt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{masteryStats.totalWords}</div>
                <div className="text-sm text-gray-500">Gesamt</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{masteryStats.masteredWords}</div>
                <div className="text-sm text-gray-500">Gemeistert</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{masteryStats.intermediateWords}</div>
                <div className="text-sm text-gray-500">In Bearbeitung</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-medical-600">{masteryStats.masteryPercentage}%</div>
                <div className="text-sm text-gray-500">Fortschritt</div>
              </div>
            </div>
            <Button 
              className="w-full"
              onClick={() => navigate('/vocabulary')}
            >
              Vokabeln üben
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
