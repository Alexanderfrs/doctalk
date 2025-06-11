
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

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
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate scenarios based on user's German level
  const generateScenarios = (userLevel: string = 'B1') => {
    const baseScenarios: Scenario[] = [
      {
        id: "patient-intake-basic",
        title: "Patientenaufnahme Grundlagen",
        description: "Lernen Sie die Grundlagen der Patientenaufnahme und wichtige Fragen für neue Patienten.",
        difficulty: userLevel === 'A1' || userLevel === 'A2' ? 'A2' : 'B1',
        category: "patient-care",
        tags: ["Aufnahme", "Grundlagen", "Patientengespräch"],
        progress: Math.floor(Math.random() * 100),
        completed: Math.random() > 0.7
      },
      {
        id: "medical-history",
        title: "Anamnese führen",
        description: "Effektive Anamnesegespräche mit Patienten führen und wichtige Informationen sammeln.",
        difficulty: userLevel === 'A1' ? 'A2' : userLevel === 'A2' ? 'B1' : 'B2',
        category: "patient-care", 
        tags: ["Anamnese", "Patientengespräch", "Diagnose"],
        progress: Math.floor(Math.random() * 100),
        completed: Math.random() > 0.6
      },
      {
        id: "team-communication",
        title: "Kommunikation im Team",
        description: "Professionelle Kommunikation mit Kollegen und Vorgesetzten im Krankenhaus.",
        difficulty: userLevel === 'A1' || userLevel === 'A2' ? 'B1' : 'B2',
        category: "teamwork",
        tags: ["Team", "Kommunikation", "Kollegen"],
        progress: Math.floor(Math.random() * 100),
        completed: Math.random() > 0.8
      },
      {
        id: "emergency-basic",
        title: "Notfallsituationen - Grundlagen",
        description: "Grundlegende Kommunikation in Notfallsituationen und erste Hilfe.",
        difficulty: userLevel === 'A1' || userLevel === 'A2' ? 'B1' : 'B2',
        category: "emergency",
        tags: ["Notfall", "Kommunikation", "Erste Hilfe"],
        progress: Math.floor(Math.random() * 100),
        completed: Math.random() > 0.9
      },
      {
        id: "medication-consultation",
        title: "Medikamentenberatung",
        description: "Patienten über Medikamente informieren und Anweisungen geben.",
        difficulty: userLevel === 'A1' ? 'B1' : userLevel === 'A2' ? 'B1' : 'B2',
        category: "consultation",
        tags: ["Medikamente", "Beratung", "Aufklärung"],
        progress: Math.floor(Math.random() * 100),
        completed: Math.random() > 0.5
      },
      {
        id: "handover-shift",
        title: "Schichtübergabe",
        description: "Professionelle Übergabe von Patienteninformationen zwischen Schichten.",
        difficulty: userLevel === 'A1' || userLevel === 'A2' ? 'B2' : 'C1',
        category: "handover",
        tags: ["Übergabe", "Team", "Dokumentation"],
        progress: Math.floor(Math.random() * 100),
        completed: Math.random() > 0.7
      }
    ];

    // Add more advanced scenarios for higher levels
    if (['B2', 'C1', 'C2'].includes(userLevel)) {
      baseScenarios.push(
        {
          id: "complex-diagnosis",
          title: "Komplexe Diagnosegespräche",
          description: "Schwierige Diagnosen erklären und Patientenfragen beantworten.",
          difficulty: 'C1',
          category: "consultation",
          tags: ["Diagnose", "Aufklärung", "Kommunikation"],
          progress: Math.floor(Math.random() * 100),
          completed: Math.random() > 0.8
        },
        {
          id: "elderly-care",
          title: "Seniorenbetreuung",
          description: "Besondere Kommunikation mit älteren Patienten und deren Angehörigen.",
          difficulty: 'B2',
          category: "patient-care",
          tags: ["Senioren", "Kommunikation", "Empathie"],
          progress: Math.floor(Math.random() * 100),
          completed: Math.random() > 0.6
        }
      );
    }

    return baseScenarios;
  };

  const fetchScenarios = async () => {
    setIsLoading(true);
    try {
      const userLevel = profile?.german_level || 'B1';
      const generatedScenarios = generateScenarios(userLevel);
      setScenarios(generatedScenarios);
    } catch (error) {
      console.error('Error generating scenarios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScenarios();
  }, [profile?.german_level]);

  return {
    scenarios,
    isLoading,
    fetchScenarios
  };
};
