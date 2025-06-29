
import { useTranslation } from "@/hooks/useTranslation";

export const getScenarioTranslations = () => {
  const { t } = useTranslation();
  
  return {
    // Scenario titles
    'admission': t('admissionScenario') || 'Patient Admission',
    'medication': t('medicationScenario') || 'Medication Administration',
    'emergency': t('emergencyScenario') || 'Emergency Situation',
    'handover': t('handoverScenario') || 'Shift Handover',
    'dementia-care': t('dementiaCareScenario') || 'Dementia Care',
    'mobility-assistance': t('mobilityAssistanceScenario') || 'Mobility Assistance',
    'communication-disability': t('communicationDisabilityScenario') || 'Communication with Disability',
    
    // Scenario descriptions
    'admission-desc': t('admissionScenarioDesc') || 'Admission of a new patient to the ward',
    'medication-desc': t('medicationScenarioDesc') || 'Safe medication administration and patient education',
    'emergency-desc': t('emergencyScenarioDesc') || 'Emergency response to acute chest pain',
    'handover-desc': t('handoverScenarioDesc') || 'Professional shift handover communication',
    'dementia-care-desc': t('dementiaCareDesc') || 'Compassionate care for dementia patients',
    'mobility-assistance-desc': t('mobilityAssistanceDesc') || 'Safe mobility support and fall prevention',
    'communication-disability-desc': t('communicationDisabilityDesc') || 'Effective communication with disabled residents',
    
    // Learning objectives
    'friendly-greeting': t('friendlyGreeting') || 'Friendly greeting and introduction',
    'personal-data': t('personalDataCollection') || 'Collect personal information',
    'medical-history': t('medicalHistoryTaking') || 'Take medical history',
    'procedures-explanation': t('proceduresExplanation') || 'Explain procedures and rules',
    'questions-concerns': t('questionsAndConcerns') || 'Answer questions and address concerns'
  };
};

export const translateScenarioContent = (key: string, fallback: string): string => {
  const translations = getScenarioTranslations();
  return translations[key as keyof typeof translations] || fallback;
};
