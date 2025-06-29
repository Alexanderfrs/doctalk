
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

  return {
    getScenarioTitle,
    getScenarioDescription,
    getLearningObjectives
  };
};
