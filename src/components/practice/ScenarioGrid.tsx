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

  // Mapping of German topic filters to scenario.category values (English)
  const topicToCategoryMap: Record<string, string> = {
    'Alle': 'all',
    'Patientenversorgung': 'patient-care',
    'Notfall': 'emergency',
    'Dokumentation': 'documentation',
    'Teamarbeit': 'teamwork',
    'Beratung': 'consultation',
    'Übergabe': 'handover',
    'Altenpflege': 'elderly-care',
    'Behindertenbetreuung': 'disability-care'
  };

  // Filtering logic to match category OR tags
  const filteredScenarios = scenarios.filter((scenario) => {
    const mappedCategory = topicToCategoryMap[selectedTopic];
    const matchesSearch = !searchQuery ||
      scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scenario.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTopic === 'Alle') {
      return matchesSearch;
    }

    const categoryMatch = mappedCategory && scenario.category === mappedCategory;
    const tagMatch = scenario.tags
      .map(tag => tag.toLowerCase())
      .includes(selectedTopic.toLowerCase());
    const keep = matchesSearch && (categoryMatch || tagMatch);

    // console.log('[ScenarioGrid] Filtering scenario:', { // Reduced repetitive logging
    //   scenarioTitle: scenario.title,
    //   category: scenario.category,
    //   tags: scenario.tags,
    //   selectedTopic,
    //   mappedCategory,
    //   matchesSearch,
    //   categoryMatch,
    //   tagMatch,
    //   keep
    // });

    return keep;
  });

  // More detailed logging before rendering decision
  console.log('[ScenarioGrid] PRE-RENDER DECISION:', {
    propsScenariosCount: scenarios.length,
    searchQuery,
    selectedTopic,
    filteredScenariosCount: filteredScenarios.length,
    isMobile,
    // Log first few titles to see what's being filtered (if any)
    filteredTitlesPreview: filteredScenarios.slice(0,3).map(s => s.title),
  });

  const handleScenarioClick = (scenarioId: string) => {
    console.log('Navigating to scenario:', scenarioId);
    navigate(`/scenario/${scenarioId}`);
  };

  if (scenarios.length === 0) {
    console.log('[ScenarioGrid] Rendering: No scenarios available (raw data empty)');
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
    console.log('[ScenarioGrid] Rendering: No scenarios found (after filtering)');
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Keine Szenarien gefunden</p>
        <p className="text-gray-400">
          Versuchen Sie andere Suchbegriffe oder Filter
        </p>
      </div>
    );
  }

  // If we reach here, filteredScenarios.length > 0
  console.log(`[ScenarioGrid] Rendering: Grid with ${filteredScenarios.length} scenarios. IsMobile: ${isMobile}`);

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
