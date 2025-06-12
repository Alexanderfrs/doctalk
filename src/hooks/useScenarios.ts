
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
    setIsLoading(true);
    try {
      const processedScenarios = processScenarios();
      console.log('Processed scenarios:', processedScenarios);
      setScenarioList(processedScenarios);
    } catch (error) {
      console.error('Error processing scenarios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScenarios();
  }, []);

  return {
    scenarios: scenarioList,
    isLoading,
    fetchScenarios
  };
};
