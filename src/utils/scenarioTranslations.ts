
import { useTranslation } from "@/hooks/useTranslation";

// Learning objectives mapping for each scenario
export const getScenarioLearningObjectives = (scenarioId: string, t: (key: string) => string) => {
  const objectives: Record<string, string[]> = {
    'admission': [
      t('friendlyGreetingIntroduction'),
      t('personalDataCollection'), 
      t('medicalHistoryTaking'),
      t('proceduresRulesExplanation'),
      t('questionsAnsweringReassuring')
    ],
    'medication': [
      t('medicationExplanation'),
      t('dosageInstructions'),
      t('sideEffectsDiscussion'),
      t('patientEducation')
    ],
    'emergency': [
      t('rapidAssessment'),
      t('emergencyProtocol'),
      t('vitalSignsMonitoring'),
      t('teamCommunication')
    ],
    'handover': [
      'Structured information transfer',
      'Complete patient status update',
      'Clear communication protocols',
      'Documentation accuracy'
    ],
    'dementia-care': [
      'Empathetic communication',
      'Orientation support',
      'Behavioral management',
      'Family involvement'
    ],
    'mobility-assistance': [
      'Safe transfer techniques',
      'Fall prevention',
      'Patient encouragement',
      'Equipment usage'
    ],
    'communication-disability': [
      'Alternative communication methods',
      'Patient autonomy respect',
      'Adaptive techniques',
      'Inclusive interaction'
    ]
  };

  return objectives[scenarioId] || [];
};

export const getScenarioTitle = (scenarioId: string, t: (key: string) => string) => {
  return t(scenarioId);
};
