
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, X } from "lucide-react";

interface GuidanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGoal: string;
  scenarioId: string;
  checkpointIndex: number;
}

const GuidanceModal: React.FC<GuidanceModalProps> = ({
  isOpen,
  onClose,
  currentGoal,
  scenarioId,
  checkpointIndex
}) => {
  const getGuidanceText = (scenarioId: string, checkpointIndex: number): string => {
    const guidanceMap = {
      'admission': [
        'Stellen Sie sich freundlich vor und begrüßen Sie den Patienten. Sagen Sie Ihren Namen und Ihre Rolle.',
        'Fragen Sie nach den persönlichen Daten des Patienten wie Name, Geburtsdatum und Adresse.',
        'Erfragen Sie die medizinische Vorgeschichte, aktuelle Beschwerden und Medikamente.',
        'Erklären Sie dem Patienten die Abläufe auf der Station und die Besuchszeiten.',
        'Gehen Sie auf Sorgen ein und versichern Sie dem Patienten Ihre Unterstützung.'
      ],
      'handover': [
        'Beginnen Sie mit der Patientenidentifikation - Name, Alter und Zimmer.',
        'Verwenden Sie die SBAR-Methode: Situation, Background, Assessment, Recommendation.',
        'Informieren Sie über alle aktuellen Medikamente und deren Dosierungen.',
        'Erwähnen Sie alle besonderen Vorkommnisse der letzten Schicht.',
        'Stellen Sie sicher, dass alle Fragen beantwortet wurden.'
      ],
      'medication': [
        'Überprüfen Sie zunächst die Identität des Patienten.',
        'Erklären Sie dem Patienten das Medikament und dessen Zweck.',
        'Fragen Sie gezielt nach Allergien und Unverträglichkeiten.',
        'Informieren Sie über Wirkung, Nebenwirkungen und Einnahmehinweise.',
        'Überwachen Sie die Einnahme und dokumentieren Sie diese.'
      ],
      'dementia-care': [
        'Begrüßen Sie den Patienten ruhig und respektvoll mit seinem Namen.',
        'Sprechen Sie langsam, deutlich und verwenden Sie einfache Wörter.',
        'Zeigen Sie Verständnis und Geduld, auch bei Wiederholungen.',
        'Sorgen Sie für eine sichere und beruhigende Umgebung.',
        'Respektieren Sie die Würde und Autonomie des Patienten.'
      ]
    };
    
    return guidanceMap[scenarioId]?.[checkpointIndex] || 'Konzentrieren Sie sich auf eine empathische und professionelle Kommunikation.';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            Lernhilfe
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Aktuelles Lernziel:</h4>
            <p className="text-sm text-blue-700">{currentGoal}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 mb-2">Hinweis:</h4>
            <p className="text-sm text-amber-700">
              {getGuidanceText(scenarioId, checkpointIndex)}
            </p>
          </div>
          <Button onClick={onClose} className="w-full">
            Verstanden, weiter versuchen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuidanceModal;
