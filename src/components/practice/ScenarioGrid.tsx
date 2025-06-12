
import React from "react";
import { useNavigate } from "react-router-dom";
import ScenarioCard from "@/components/ui/ScenarioCard";
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
  selectedTopic: string;
}

const ScenarioGrid: React.FC<ScenarioGridProps> = ({
  scenarios,
  searchQuery,
  selectedTopic
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  console.log('ScenarioGrid render:', {
    scenarioCount: scenarios.length,
    searchQuery,
    selectedTopic
  });

  // Map topics to categories for filtering
  const topicToCategoryMap = {
    'Alle': 'all',
    'Patientenversorgung': 'patient-care',
    'Teamarbeit': 'teamwork',
    'Notfall': 'emergency',
    'Beratung': 'consultation',
    'Übergabe': 'handover',
    'Altenpflege': 'elderly-care',
    'Behindertenbetreuung': 'disability-care'
  };

  // Filter scenarios based on search and topic
  const filteredScenarios = scenarios.filter((scenario) => {
    console.log('Filtering scenario:', scenario.title, 'category:', scenario.category);
    
    // Search filter
    if (searchQuery && 
        !scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !scenario.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Topic filter
    const mappedCategory = topicToCategoryMap[selectedTopic];
    if (selectedTopic !== 'Alle' && mappedCategory && scenario.category !== mappedCategory) {
      return false;
    }

    return true;
  });

  console.log('Filtered scenarios:', filteredScenarios.length);

  const handleScenarioClick = (scenarioId: string) => {
    console.log('Navigating to scenario:', scenarioId);
    navigate(`/scenario/${scenarioId}`);
  };

  if (scenarios.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Keine Szenarien verfügbar</p>
        <p className="text-gray-400">
          Szenarien werden geladen...
        </p>
      </div>
    );
  }

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
          <div className="space-y-4 pb-4">
            {filteredScenarios.map((scenario) => (
              <ScenarioCard 
                key={scenario.id}
                scenario={scenario} 
                onClick={() => handleScenarioClick(scenario.id)}
                className="h-auto"
              />
            ))}
          </div>
          
          <div className="text-center text-sm text-medical-600 mt-4 border-t pt-4">
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
