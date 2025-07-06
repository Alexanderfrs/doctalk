import React, { useState } from "react";
import { Scenario } from "@/data/scenarios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Users, MapPin, Target, Play, Info, X } from "lucide-react";
import { PatientProfile } from "@/utils/patientProfiles";
import BestPracticesDialog from "./BestPracticesDialog";
import ExitConfirmationDialog from "./ExitConfirmationDialog";
import UILanguageSelector from "@/components/language/UILanguageSelector";
import { useTranslation } from "@/hooks/useTranslation";

interface ScenarioBriefingScreenProps {
  scenario: Scenario;
  patientProfile: PatientProfile;
  onBeginInteraction: () => void;
  onExit: () => void;
}

const ScenarioBriefingScreen: React.FC<ScenarioBriefingScreenProps> = ({
  scenario,
  patientProfile,
  onBeginInteraction,
  onExit
}) => {
  const [showBestPractices, setShowBestPractices] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const { t } = useTranslation();

  // Get scenario context information with translations
  const getScenarioContext = () => {
    const scenarioKey = scenario.id;
    return {
      setting: t(`scenario.${scenarioKey}.setting`) || t('scenario.default.setting'),
      environment: t(`scenario.${scenarioKey}.environment`) || t('scenario.default.environment'),
      objective: t(`scenario.${scenarioKey}.objective`) || t('scenario.default.objective'),
      culturalNotes: t(`scenario.${scenarioKey}.culturalNotes`) || t('scenario.default.culturalNotes')
    };
  };

  const context = getScenarioContext();

  const handleExit = () => {
    setShowExitConfirmation(false);
    onExit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 space-y-8 relative">
        {/* Language Selector */}
        <div className="absolute top-4 left-4">
          <UILanguageSelector />
        </div>
        
        {/* Exit Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowExitConfirmation(true)}
          className="absolute top-4 right-4 text-medical-600 hover:text-medical-800"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertCircle className="h-6 w-6 text-medical-600" />
            <h1 className="text-2xl font-bold text-medical-800">{t('scenarioBriefing')}</h1>
          </div>
          <h2 className="text-xl font-semibold text-medical-700">{scenario.title}</h2>
          <p className="text-medical-600">{scenario.description}</p>
        </div>

        {/* Patient Profile */}
        <Card className="p-6 bg-white border-medical-200">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-medical-600" />
            <h3 className="font-semibold text-medical-800">{t('patientProfile')}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-medical-700">{t('name')}:</p>
              <p className="text-medical-600">{patientProfile.name}</p>
            </div>
            <div>
              <p className="font-medium text-medical-700">{t('age')}:</p>
              <p className="text-medical-600">{patientProfile.age} {t('years')}</p>
            </div>
            <div>
              <p className="font-medium text-medical-700">{t('condition')}:</p>
              <p className="text-medical-600">{patientProfile.condition}</p>
            </div>
            <div>
              <p className="font-medium text-medical-700">{t('mood')}:</p>
              <p className="text-medical-600">{patientProfile.mood}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-medium text-medical-700 mb-1">{t('culturalNotes')}:</p>
            <p className="text-medical-600 text-sm">{context.culturalNotes}</p>
          </div>
        </Card>

        {/* Environment & Objective */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4 bg-white border-medical-200">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-medical-600" />
              <h4 className="font-medium text-medical-800">{t('environment')}</h4>
            </div>
            <p className="text-sm text-medical-600 mb-2">{context.setting}</p>
            <p className="text-xs text-medical-500">{context.environment}</p>
          </Card>

          <Card className="p-4 bg-white border-medical-200">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-medical-600" />
              <h4 className="font-medium text-medical-800">{t('yourGoal')}</h4>
            </div>
            <p className="text-sm text-medical-600">{context.objective}</p>
          </Card>
        </div>

        {/* Best Practices CTA */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-800">{t('learnMore')}</h4>
                <p className="text-sm text-blue-600">{t('bestPracticesForScenario')}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBestPractices(true)}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Info className="h-4 w-4 mr-1" />
              {t('learnMore')}
            </Button>
          </div>
        </Card>

        {/* CTA Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={onBeginInteraction}
            size="lg"
            className="bg-medical-600 hover:bg-medical-700 text-white px-8 py-3 flex-1"
          >
            <Play className="h-5 w-5 mr-2" />
            {t('beginInteraction')}
          </Button>
        </div>
      </Card>

      <BestPracticesDialog
        isOpen={showBestPractices}
        onClose={() => setShowBestPractices(false)}
        scenarioId={scenario.id}
      />

      <ExitConfirmationDialog
        isOpen={showExitConfirmation}
        onClose={() => setShowExitConfirmation(false)}
        onConfirm={handleExit}
      />
    </div>
  );
};

export default ScenarioBriefingScreen;
