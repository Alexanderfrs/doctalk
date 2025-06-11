
import React from "react";
import { Scenario } from "@/data/scenarios";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ScenarioContainer from "./ScenarioContainer";

interface ScenarioContentProps {
  scenario: Scenario | null;
  loading: boolean;
}

export const ScenarioContent: React.FC<ScenarioContentProps> = ({
  scenario,
  loading,
}) => {
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Szenario nicht gefunden.</p>
        </Card>
      </div>
    );
  }

  return <ScenarioContainer scenario={scenario} />;
};

export default ScenarioContent;
