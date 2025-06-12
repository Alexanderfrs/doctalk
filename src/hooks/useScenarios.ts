
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import scenarios from '@/data/scenarios';

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

  // Convert the imported scenarios to the expected format - show all scenarios
  const processScenarios = () => {
    console.log('Processing scenarios, total count:', scenarios.length);
    return scenarios.map(scenario => ({
      id: scenario.id,
      title: scenario.title,
      description: scenario.description,
      difficulty: scenario.difficulty,
      category: scenario.category,
      tags: scenario.tags,
      progress: Math.floor(Math.random() * 100),
      completed: Math.random() > 0.7
    }));
  };

  const fetchScenarios = async () => {
    console.log('Fetching scenarios...');
    setIsLoading(true);
    try {
      const processedScenarios = processScenarios();
      console.log('Processed scenarios:', processedScenarios.length, 'scenarios');
      setScenarioList(processedScenarios);
    } catch (error) {
      console.error('Error processing scenarios:', error);
      setScenarioList([]); // Ensure we have a fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('useScenarios effect triggered');
    fetchScenarios();
  }, []);

  console.log('useScenarios hook returning:', {
    scenarios: scenarioList.length,
    isLoading
  });

  return {
    scenarios: scenarioList,
    isLoading,
    fetchScenarios
  };
};
