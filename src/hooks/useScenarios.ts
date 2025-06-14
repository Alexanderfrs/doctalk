
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import scenariosData from '@/data/scenarios'; // Renamed to avoid conflict with the state variable

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

export const useScenarios = () => {
  const { profile } = useAuth();
  const [scenarioList, setScenarioList] = useState<Scenario[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Wrapper for setIsLoading to add logging
  const customSetIsLoading = (value: boolean) => {
    console.log(`[useScenarios] customSetIsLoading called with: ${value}. Previous isLoading state: ${isLoading}`);
    setIsLoading(value);
  };

  // Convert the imported scenarios to the expected format - show all scenarios
  const processScenarios = () => {
    console.log('[useScenarios] Processing scenarios, total count from data:', scenariosData.length);
    return scenariosData.map(scenario => ({
      id: scenario.id,
      title: scenario.title,
      description: scenario.description,
      difficulty: scenario.difficulty,
      category: scenario.category,
      tags: scenario.tags,
      // Retain existing progress/completion logic or simplify for debugging if needed
      progress: scenario.progress !== undefined ? scenario.progress : Math.floor(Math.random() * 100),
      completed: scenario.completed !== undefined ? scenario.completed : Math.random() > 0.7
    }));
  };

  const fetchScenarios = async () => {
    console.log('[useScenarios] fetchScenarios started.');
    customSetIsLoading(true); // Use wrapper
    try {
      // Simulate a small delay if needed to catch rapid state changes
      // await new Promise(resolve => setTimeout(resolve, 50)); 
      const processedScenarios = processScenarios();
      console.log('[useScenarios] Processed scenarios count:', processedScenarios.length);
      setScenarioList(processedScenarios);
    } catch (error) {
      console.error('[useScenarios] Error processing scenarios:', error);
      setScenarioList([]); // Ensure we have a fallback
    } finally {
      console.log('[useScenarios] fetchScenarios finished, setting isLoading to false.');
      customSetIsLoading(false); // Use wrapper
    }
  };

  useEffect(() => {
    console.log('[useScenarios] useEffect triggered. Calling fetchScenarios.');
    fetchScenarios();
  }, []); // Empty dependency array ensures this runs once on mount

  console.log(`[useScenarios] Hook returning: isLoading: ${isLoading}, scenarios count: ${scenarioList.length}`);

  return {
    scenarios: scenarioList,
    isLoading,
    fetchScenarios // Exporting, though should not be called externally without good reason
  };
};
