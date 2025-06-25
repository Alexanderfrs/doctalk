
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

interface BestPracticesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  scenarioId: string;
}

const BestPracticesDialog: React.FC<BestPracticesDialogProps> = ({
  isOpen,
  onClose,
  scenarioId
}) => {
  const getBestPracticesContent = () => {
    switch (scenarioId) {
      case 'handover':
        return {
          title: "Best Practices für Schichtübergaben",
          description: "Wichtige Prinzipien für eine sichere und effektive Patientenübergabe",
          practices: [
            "SBAR-Methode verwenden (Situation, Background, Assessment, Recommendation)",
            "Alle kritischen Informationen strukturiert übermitteln",
            "Rückfragen stellen und Verständnis sicherstellen",
            "Medikationsänderungen und Besonderheiten hervorheben",
            "Dokumentation zeitnah vervollständigen"
          ]
        };
      case 'admission':
        return {
          title: "Best Practices für Patientenaufnahme",
          description: "Grundlagen für eine professionelle Patientenaufnahme",
          practices: [
            "Warme und professionelle Begrüßung",
            "Vollständige Anamnese erheben",
            "Datenschutz und Einverständniserklärungen beachten",
            "Orientierung über Abläufe und Ansprechpartner geben",
            "Individuelle Bedürfnisse und Ängste erfragen"
          ]
        };
      case 'medication':
        return {
          title: "Best Practices für Medikamentenverabreichung",
          description: "Sicherheitsstandards bei der Arzneimittelgabe",
          practices: [
            "5-R-Regel beachten (Richtiger Patient, Richtiges Medikament, etc.)",
            "Patientenidentifikation zweifach prüfen",
            "Über Wirkung und Nebenwirkungen aufklären",
            "Einnahme überwachen und dokumentieren",
            "Allergien und Unverträglichkeiten erfragen"
          ]
        };
      default:
        return {
          title: "Allgemeine Best Practices",
          description: "Grundprinzipien der professionellen Patientenkommunikation",
          practices: [
            "Respektvolle und empathische Kommunikation",
            "Aktives Zuhören praktizieren",
            "Verständliche Sprache verwenden",
            "Kulturelle Sensibilität zeigen",
            "Patientenautonomie respektieren"
          ]
        };
    }
  };

  const content = getBestPracticesContent();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-medical-800">{content.title}</DialogTitle>
          <DialogDescription className="text-medical-600">
            {content.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {content.practices.map((practice, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-medical-700">{practice}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose} className="bg-medical-600 hover:bg-medical-700">
            <ArrowRight className="h-4 w-4 mr-2" />
            Zur Übung
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BestPracticesDialog;
