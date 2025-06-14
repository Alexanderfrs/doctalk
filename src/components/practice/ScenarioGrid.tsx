
import React from "react";
import { useNavigate } from "react-router-dom";
import ScenarioCard from "@/components/ui/ScenarioCard"; // Ensure this is used
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

let scenarioGridRenderCount = 0;

const ScenarioGrid: React.FC<ScenarioGridProps> = ({
  scenarios,
  searchQuery,
  selectedTopic
}) => {
  scenarioGridRenderCount++;
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  console.log(`[ScenarioGrid] Render #${scenarioGridRenderCount}. Props: scenarios_count=${scenarios.length}, searchQuery="${searchQuery}", selectedTopic="${selectedTopic}"`);

  const topicToCategoryMap: Record<string, string> = {
    'Alle': 'all',
    'Patientenversorgung': 'patient-care',
    'Notfall': 'emergency',
    'Dokumentation': 'documentation',
    'Teamarbeit': 'teamwork',
    'Beratung': 'consultation', // This was missing from map, added from filter component
    'Übergabe': 'handover',
    'Altenpflege': 'elderly-care',
    'Behindertenbetreuung': 'disability-care'
  };

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
      .includes(selectedTopic.toLowerCase()); // Direct match German topic to tags
    
    const keep = matchesSearch && (categoryMatch || tagMatch);
    return keep;
  });

  console.log(`[ScenarioGrid] Filtering complete. Filtered scenarios_count=${filteredScenarios.length}. Titles: ${filteredScenarios.slice(0,3).map(s=>s.title).join(', ')}`);

  const handleScenarioClick = (scenarioId: string) => {
    console.log('[ScenarioGrid] Navigating to scenario:', scenarioId);
    navigate(`/scenario/${scenarioId}`);
  };

  if (scenarios.length === 0) {
    console.log('[ScenarioGrid] Rendering: No scenarios available (raw data empty)');
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Keine Szenarien verfügbar</p>
        <p className="text-gray-400">
          Szenarien werden geladen oder sind nicht vorhanden.
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
          Versuchen Sie andere Suchbegriffe oder Filter.
        </p>
      </div>
    );
  }

  console.log(`[ScenarioGrid] About to render grid. isMobile=${isMobile}, filteredScenarios_count=${filteredScenarios.length}`);

  return (
    <div>
      {isMobile ? (
        <div className="px-2">
          <div className="space-y-4 pb-4">
            {filteredScenarios.map((scenario, index) => {
              if (index === 0) console.log(`[ScenarioGrid] Mobile: Rendering first scenario card: ${scenario.title}`);
              return (
                <ScenarioCard 
                  key={scenario.id}
                  scenario={scenario} 
                  onClick={() => handleScenarioClick(scenario.id)}
                  className="h-auto"
                />
              );
            })}
          </div>
          <div className="text-center text-sm text-medical-600 mt-4 border-t pt-4">
            {filteredScenarios.length} Szenarien gefunden
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((scenario, index) => {
            if (index === 0) console.log(`[ScenarioGrid] Desktop: Rendering first scenario card: ${scenario.title}`);
            return (
              <ScenarioCard 
                key={scenario.id} 
                scenario={scenario} 
                onClick={() => handleScenarioClick(scenario.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScenarioGrid;
