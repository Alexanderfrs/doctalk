
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LearningRoadmap from "./LearningRoadmap";
import { LearningRoadmap as LearningRoadmapType, LearningObjective } from "@/hooks/useLearningRoadmap";

interface DashboardTabsProps {
  roadmap: LearningRoadmapType | null;
  roadmapLoading: boolean;
  onObjectiveClick: (objective: LearningObjective) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  roadmap,
  roadmapLoading,
  onObjectiveClick
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default DashboardTabs;
