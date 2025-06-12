
import React from "react";
import { useNavigate } from "react-router-dom";
import ScenarioCard from "@/components/ui/ScenarioCard";
import SwipeableContainer from "@/components/ui/SwipeableContainer";
import { useIsMobile } from "@/hooks/use-mobile";

interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  tags: string[];
  progress?: number;
  completed?: boolean;
}

interface ScenarioGridProps {
  scenarios: Scenario[];
  searchQuery: string;
  selectedCategory: string;
  selectedTags: string[];
}

const ScenarioGrid: React.FC<ScenarioGridProps> = ({
  scenarios,
  searchQuery,
  selectedCategory,
  selectedTags
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Filter scenarios based on search and filters
  const filteredScenarios = scenarios.filter((scenario) => {
    // Search filter
    if (searchQuery && !scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !scenario.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'Alle' && scenario.category !== selectedCategory) {
      return false;
    }

    // Tags filter
    if (selectedTags.length > 0 && !selectedTags.some(tag => scenario.tags.includes(tag))) {
      return false;
    }

    return true;
  });

  const handleScenarioClick = (scenarioId: string) => {
    navigate(`/scenario/${scenarioId}`);
  };

  if (filteredScenarios.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Keine Szenarien gefunden</p>
        <p className="text-gray-400">
          Versuchen Sie andere Suchbegriffe oder Filter
        </p>
      </div>
    );
  }

  return (
    <div>
      {isMobile ? (
        <div className="px-2">
          <div className="grid grid-cols-1 gap-4 max-h-[60vh] overflow-y-auto">
            {filteredScenarios.map((scenario) => (
              <ScenarioCard 
                key={scenario.id}
                scenario={scenario} 
                onClick={() => handleScenarioClick(scenario.id)}
                className="h-auto"
              />
            ))}
          </div>
          
          <div className="text-center text-sm text-medical-600 mt-4">
            {filteredScenarios.length} Szenarien gefunden
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((scenario) => (
            <ScenarioCard 
              key={scenario.id} 
              scenario={scenario} 
              onClick={() => handleScenarioClick(scenario.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScenarioGrid;
