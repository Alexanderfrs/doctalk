
import React from "react";
import { Scenario } from "@/data/scenarios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Users, MapPin, Target, Play } from "lucide-react";
import { PatientProfile } from "@/utils/patientProfiles";

interface ScenarioBriefingScreenProps {
  scenario: Scenario;
  patientProfile: PatientProfile;
  onBeginInteraction: () => void;
}

const ScenarioBriefingScreen: React.FC<ScenarioBriefingScreenProps> = ({
  scenario,
  patientProfile,
  onBeginInteraction
}) => {
  // Get scenario context information
  const getScenarioContext = () => {
    switch (scenario.id) {
      case 'admission':
        return {
          setting: "Krankenstation - Patientenaufnahme",
          environment: "Ruhiger Nachmittag auf der Station",
          objective: "Vollständige Aufnahme des Patienten durchführen",
          culturalNotes: "Patient ist höflich aber nervös wegen des Krankenhausaufenthalts"
        };
      case 'medication':
        return {
          setting: "Patientenzimmer - Medikamentenverabreichung",
          environment: "Morgenschicht, Patient ist wach",
          objective: "Sichere Medikamentenverabreichung und Patientenaufklärung",
          culturalNotes: "Patient ist wissbegierig und stellt viele Fragen"
        };
      case 'emergency':
        return {
          setting: "Notfallsituation - Akute Brustschmerzen",
          environment: "Hochstress-Situation, Zeit ist kritisch",
          objective: "Schnelle Erstversorgung und Stabilisierung",
          culturalNotes: "Patient ist panisch und braucht Beruhigung"
        };
      case 'handover':
        return {
          setting: "Schichtübergabe - Patientenübergabe",
          environment: "Ende der Schicht, Kollegin wartet",
          objective: "Vollständige und sichere Patientenübergabe",
          culturalNotes: "Professionelle Kollegin, strukturierte Kommunikation erwartet"
        };
      case 'dementia-care':
        return {
          setting: "Pflegeheim - Demenzbetreuung",
          environment: "Ruhiger Vormittag im Wohnbereich",
          objective: "Einfühlsame Betreuung und Orientierungshilfe",
          culturalNotes: "Bewohnerin ist verwirrt aber grundsätzlich freundlich"
        };
      case 'mobility-assistance':
        return {
          setting: "Patientenzimmer - Mobilitätshilfe",
          environment: "Nachmittag, Patient möchte sich bewegen",
          objective: "Sichere Mobilisierung und Sturzprävention",
          culturalNotes: "Älterer Patient, stolz aber hilfsbedürftig"
        };
      case 'communication-disability':
        return {
          setting: "Wohngruppe - Behindertenbetreuung",
          environment: "Entspannte Atmosphäre in der Wohngruppe",
          objective: "Kommunikation und Selbstbestimmung fördern",
          culturalNotes: "Bewohner braucht Zeit und Geduld bei der Kommunikation"
        };
      default:
        return {
          setting: "Medizinische Einrichtung",
          environment: "Alltägliche Arbeitsumgebung",
          objective: "Professionelle medizinische Kommunikation",
          culturalNotes: "Standard professionelle Interaktion"
        };
    }
  };

  const context = getScenarioContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertCircle className="h-6 w-6 text-medical-600" />
            <h1 className="text-2xl font-bold text-medical-800">Szenario-Briefing</h1>
          </div>
          <h2 className="text-xl font-semibold text-medical-700">{scenario.title}</h2>
          <p className="text-medical-600">{scenario.description}</p>
        </div>

        {/* Patient Profile */}
        <Card className="p-6 bg-white border-medical-200">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-medical-600" />
            <h3 className="font-semibold text-medical-800">Patientenprofil</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-medical-700">Name:</p>
              <p className="text-medical-600">{patientProfile.name}</p>
            </div>
            <div>
              <p className="font-medium text-medical-700">Alter:</p>
              <p className="text-medical-600">{patientProfile.age} Jahre</p>
            </div>
            <div>
              <p className="font-medium text-medical-700">Zustand:</p>
              <p className="text-medical-600">{patientProfile.condition}</p>
            </div>
            <div>
              <p className="font-medium text-medical-700">Stimmung:</p>
              <p className="text-medical-600">{patientProfile.mood}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-medium text-medical-700 mb-1">Kulturelle Hinweise:</p>
            <p className="text-medical-600 text-sm">{context.culturalNotes}</p>
          </div>
        </Card>

        {/* Environment & Objective */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4 bg-white border-medical-200">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-medical-600" />
              <h4 className="font-medium text-medical-800">Umgebung</h4>
            </div>
            <p className="text-sm text-medical-600 mb-2">{context.setting}</p>
            <p className="text-xs text-medical-500">{context.environment}</p>
          </Card>

          <Card className="p-4 bg-white border-medical-200">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-medical-600" />
              <h4 className="font-medium text-medical-800">Ihr Ziel</h4>
            </div>
            <p className="text-sm text-medical-600">{context.objective}</p>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="text-center pt-4">
          <Button
            onClick={onBeginInteraction}
            size="lg"
            className="bg-medical-600 hover:bg-medical-700 text-white px-8 py-3"
          >
            <Play className="h-5 w-5 mr-2" />
            Interaktion beginnen
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ScenarioBriefingScreen;
