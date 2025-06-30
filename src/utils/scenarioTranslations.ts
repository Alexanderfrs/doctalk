
import { useTranslation } from "@/hooks/useTranslation";

export const useScenarioTranslations = () => {
  const { t } = useTranslation();

  const getScenarioTitle = (scenarioId: string): string => {
    return t(`scenario_${scenarioId}_title`);
  };

  const getScenarioDescription = (scenarioId: string): string => {
    return t(`scenario_${scenarioId}_description`);
  };

  const getLearningObjectives = (): string[] => {
    return [
      t('objective_establish_professional_contact'),
      t('objective_assess_needs'),
      t('objective_provide_information'),
      t('objective_respond_empathetically'),
      t('objective_successfully_conclude')
    ];
  };

  const getScenarioContext = (scenarioId: string) => {
    switch (scenarioId) {
      case 'admission':
        return {
          setting: t('context_admission_setting'),
          environment: t('context_admission_environment'),
          objective: t('context_admission_objective'),
          culturalNotes: t('context_admission_cultural_notes')
        };
      case 'medication':
        return {
          setting: t('context_medication_setting'),
          environment: t('context_medication_environment'),
          objective: t('context_medication_objective'),
          culturalNotes: t('context_medication_cultural_notes')
        };
      case 'emergency':
        return {
          setting: t('context_emergency_setting'),
          environment: t('context_emergency_environment'),
          objective: t('context_emergency_objective'),
          culturalNotes: t('context_emergency_cultural_notes')
        };
      case 'handover':
        return {
          setting: t('context_handover_setting'),
          environment: t('context_handover_environment'),
          objective: t('context_handover_objective'),
          culturalNotes: t('context_handover_cultural_notes')
        };
      case 'dementia-care':
        return {
          setting: t('context_dementia_care_setting'),
          environment: t('context_dementia_care_environment'),
          objective: t('context_dementia_care_objective'),
          culturalNotes: t('context_dementia_care_cultural_notes')
        };
      case 'mobility-assistance':
        return {
          setting: t('context_mobility_assistance_setting'),
          environment: t('context_mobility_assistance_environment'),
          objective: t('context_mobility_assistance_objective'),
          culturalNotes: t('context_mobility_assistance_cultural_notes')
        };
      case 'communication-disability':
        return {
          setting: t('context_communication_disability_setting'),
          environment: t('context_communication_disability_environment'),
          objective: t('context_communication_disability_objective'),
          culturalNotes: t('context_communication_disability_cultural_notes')
        };
      default:
        return {
          setting: t('context_default_setting'),
          environment: t('context_default_environment'),
          objective: t('context_default_objective'),
          culturalNotes: t('context_default_cultural_notes')
        };
    }
  };

  return {
    getScenarioTitle,
    getScenarioDescription,
    getLearningObjectives,
    getScenarioContext
  };
};
