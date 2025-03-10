
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScenarioCard from "@/components/ui/ScenarioCard";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import { useIsMobile } from "@/hooks/use-mobile";

interface RecentScenariosProps {
  activeScenarios: Array<{
    id: string;
    title: string;
    description: string;
    difficulty: string;
    category: string;
    tags: string[];
    completed?: boolean;
    progress?: number;
  }>;
}

const RecentScenarios: React.FC<RecentScenariosProps> = ({ activeScenarios }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const isMobile = useIsMobile();

  const handleSwipe = (index: number) => {
    setCurrentScenarioIndex(index);
  };

  return (
    <section className="container mx-auto mb-12 animate-fade-in" style={{ animationDelay: '700ms' }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <Stethoscope className="mr-2 h-5 w-5 text-medical-600" />
          Empfohlene Übungen
        </h2>
        <Button asChild variant="ghost" className="text-medical-600 hover:text-medical-700 hover:bg-medical-50">
          <Link to="/practice" className="flex items-center">
            Alle anzeigen
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      {isMobile ? (
        <div className="px-4 py-2">
          <SwipeableContainer
            onSwipe={handleSwipe}
            showIndicators={true}
            className="h-[350px] mb-4"
          >
            {activeScenarios.map((scenario) => (
              <div key={scenario.id} className="px-2 w-full h-full">
                <ScenarioCard 
                  scenario={scenario} 
                  onClick={() => console.log(`Navigate to scenario: ${scenario.id}`)}
                  className="h-full"
                />
              </div>
            ))}
          </SwipeableContainer>
          
          <div className="text-center text-sm text-medical-600 mt-2">
            <span className="inline-flex items-center">
              Swipen Sie, um mehr zu sehen
              <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeScenarios.map((scenario) => (
            <ScenarioCard 
              key={scenario.id} 
              scenario={scenario} 
              onClick={() => console.log(`Navigate to scenario: ${scenario.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentScenarios;
