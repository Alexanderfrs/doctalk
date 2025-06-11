
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface LearningObjective {
  id: string;
  title: string;
  description: string;
  category: 'vocabulary' | 'scenarios' | 'grammar' | 'communication';
  difficulty: string;
  estimatedTime: number; // in minutes
  completed: boolean;
  scenarioIds?: string[];
  vocabularyTopics?: string[];
}

export interface LearningRoadmap {
  userLevel: string;
  currentPhase: string;
  objectives: LearningObjective[];
  weeklyGoals: LearningObjective[];
  nextRecommendations: LearningObjective[];
  progressPercentage: number;
}

export function useLearningRoadmap() {
  const { user } = useAuth();
  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateRoadmapForLevel = (level: string, userStrengths: string[] = []): LearningRoadmap => {
    const roadmaps: Record<string, LearningRoadmap> = {
      'A1': {
        userLevel: 'A1',
        currentPhase: 'Vorbereitung',
        objectives: [
          {
            id: 'a1_basics',
            title: 'Deutsche Grundlagen stärken',
            description: 'Verbessern Sie Ihre allgemeinen Deutschkenntnisse, bevor Sie medizinisches Deutsch lernen.',
            category: 'grammar',
            difficulty: 'A1',
            estimatedTime: 120,
            completed: false
          },
          {
            id: 'a1_medical_intro',
            title: 'Erste medizinische Begriffe',
            description: 'Lernen Sie die wichtigsten Körperteile und Grundbegriffe.',
            category: 'vocabulary',
            difficulty: 'A1',
            estimatedTime: 60,
            completed: false,
            vocabularyTopics: ['body_parts', 'basic_medical']
          }
        ],
        weeklyGoals: [],
        nextRecommendations: [],
        progressPercentage: 0
      },
      'A2': {
        userLevel: 'A2',
        currentPhase: 'Grundlagen',
        objectives: [
          {
            id: 'a2_strengthen',
            title: 'Deutschkenntnisse festigen',
            description: 'Erreichen Sie B1-Niveau für effektives medizinisches Deutsch-Lernen.',
            category: 'grammar',
            difficulty: 'A2',
            estimatedTime: 180,
            completed: false
          },
          {
            id: 'a2_medical_vocab',
            title: 'Medizinische Grundbegriffe',
            description: 'Lernen Sie wichtige medizinische Vokabeln und einfache Ausdrücke.',
            category: 'vocabulary',
            difficulty: 'A2',
            estimatedTime: 90,
            completed: false,
            vocabularyTopics: ['symptoms', 'body_systems', 'basic_procedures']
          }
        ],
        weeklyGoals: [],
        nextRecommendations: [],
        progressPercentage: 10
      },
      'B1': {
        userLevel: 'B1',
        currentPhase: 'Medizinische Grundlagen',
        objectives: [
          {
            id: 'b1_patient_communication',
            title: 'Grundlegende Patientenkommunikation',
            description: 'Lernen Sie einfache Patientengespräche zu führen.',
            category: 'communication',
            difficulty: 'B1',
            estimatedTime: 120,
            completed: false,
            scenarioIds: ['patient-care-1', 'patient-care-2']
          },
          {
            id: 'b1_medical_terms',
            title: 'Medizinische Terminologie',
            description: 'Erweitern Sie Ihren medizinischen Wortschatz.',
            category: 'vocabulary',
            difficulty: 'B1',
            estimatedTime: 90,
            completed: false,
            vocabularyTopics: ['medical_instruments', 'procedures', 'medications']
          },
          {
            id: 'b1_anatomy',
            title: 'Anatomie-Grundlagen',
            description: 'Lernen Sie wichtige anatomische Begriffe.',
            category: 'vocabulary',
            difficulty: 'B1',
            estimatedTime: 75,
            completed: false,
            vocabularyTopics: ['anatomy', 'body_systems']
          }
        ],
        weeklyGoals: [],
        nextRecommendations: [],
        progressPercentage: 25
      },
      'B2': {
        userLevel: 'B2',
        currentPhase: 'Praktische Anwendung',
        objectives: [
          {
            id: 'b2_complex_communication',
            title: 'Komplexe Patientengespräche',
            description: 'Führen Sie ausführliche Anamnesegespräche und Aufklärungen.',
            category: 'communication',
            difficulty: 'B2',
            estimatedTime: 150,
            completed: false,
            scenarioIds: ['patient-care-3', 'patient-care-4', 'consultation-1']
          },
          {
            id: 'b2_emergency',
            title: 'Notfallsituationen',
            description: 'Meistern Sie die Kommunikation in Notfällen.',
            category: 'scenarios',
            difficulty: 'B2',
            estimatedTime: 120,
            completed: false,
            scenarioIds: ['emergency-1', 'emergency-2']
          },
          {
            id: 'b2_documentation',
            title: 'Medizinische Dokumentation',
            description: 'Lernen Sie medizinische Berichte zu verstehen und zu schreiben.',
            category: 'grammar',
            difficulty: 'B2',
            estimatedTime: 100,
            completed: false
          }
        ],
        weeklyGoals: [],
        nextRecommendations: [],
        progressPercentage: 50
      },
      'C1': {
        userLevel: 'C1',
        currentPhase: 'Spezialisierung',
        objectives: [
          {
            id: 'c1_specialist_communication',
            title: 'Fachspezifische Kommunikation',
            description: 'Kommunizieren Sie mit Kollegen und in spezialisierten Bereichen.',
            category: 'communication',
            difficulty: 'C1',
            estimatedTime: 180,
            completed: false,
            scenarioIds: ['handover-1', 'handover-2', 'consultation-2']
          },
          {
            id: 'c1_complex_cases',
            title: 'Komplexe Fälle',
            description: 'Bearbeiten Sie schwierige medizinische Situationen.',
            category: 'scenarios',
            difficulty: 'C1',
            estimatedTime: 160,
            completed: false,
            scenarioIds: ['emergency-3', 'elderly-care-1', 'disability-care-1']
          }
        ],
        weeklyGoals: [],
        nextRecommendations: [],
        progressPercentage: 75
      },
      'C2': {
        userLevel: 'C2',
        currentPhase: 'Exzellenz',
        objectives: [
          {
            id: 'c2_teaching',
            title: 'Lehren und Mentoring',
            description: 'Unterstützen Sie andere beim Lernen von medizinischem Deutsch.',
            category: 'communication',
            difficulty: 'C2',
            estimatedTime: 120,
            completed: false
          },
          {
            id: 'c2_research',
            title: 'Medizinische Fachliteratur',
            description: 'Verstehen und diskutieren Sie komplexe medizinische Texte.',
            category: 'grammar',
            difficulty: 'C2',
            estimatedTime: 100,
            completed: false
          }
        ],
        weeklyGoals: [],
        nextRecommendations: [],
        progressPercentage: 90
      }
    };

    const baseRoadmap = roadmaps[level] || roadmaps['B1'];
    
    // Set weekly goals (first 2-3 objectives)
    baseRoadmap.weeklyGoals = baseRoadmap.objectives.slice(0, 2);
    
    // Set next recommendations (different based on level)
    if (level === 'A1' || level === 'A2') {
      baseRoadmap.nextRecommendations = [
        {
          id: 'improve_general',
          title: 'Allgemeine Deutschkenntnisse verbessern',
          description: 'Wir empfehlen zunächst einen allgemeinen Deutschkurs.',
          category: 'grammar',
          difficulty: level,
          estimatedTime: 300,
          completed: false
        }
      ];
    } else {
      baseRoadmap.nextRecommendations = baseRoadmap.objectives.slice(0, 3);
    }

    return baseRoadmap;
  };

  const generateRoadmap = (userLevel: string, strengths: string[] = []) => {
    setIsLoading(true);
    
    try {
      const newRoadmap = generateRoadmapForLevel(userLevel, strengths);
      setRoadmap(newRoadmap);
    } catch (error) {
      console.error('Error generating roadmap:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateObjectiveProgress = (objectiveId: string, completed: boolean) => {
    if (!roadmap) return;

    const updatedObjectives = roadmap.objectives.map(obj =>
      obj.id === objectiveId ? { ...obj, completed } : obj
    );

    const completedCount = updatedObjectives.filter(obj => obj.completed).length;
    const progressPercentage = (completedCount / updatedObjectives.length) * 100;

    setRoadmap({
      ...roadmap,
      objectives: updatedObjectives,
      progressPercentage
    });
  };

  return {
    roadmap,
    isLoading,
    generateRoadmap,
    updateObjectiveProgress
  };
}
