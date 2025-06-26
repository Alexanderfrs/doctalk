
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
        'Denken Sie daran: Ein professioneller erste Eindruck ist wichtig. Stellen Sie sich mit Namen und Rolle vor. Verwenden Sie eine warme, freundliche Begrüßung und zeigen Sie, dass Sie für den Patienten da sind.',
        'Jetzt müssen Sie systematisch die Patientendaten erfassen. Fragen Sie gezielt nach dem vollständigen Namen, Geburtsdatum und wichtigen Kontaktdaten. Seien Sie dabei strukturiert und freundlich.',
        'Die Anamnese ist entscheidend für die weitere Behandlung. Erfragen Sie aktuelle Beschwerden, Vorerkrankungen, Medikamente und Allergien. Hören Sie aktiv zu und stellen Sie Nachfragen.',
        'Patienten brauchen Orientierung im Krankenhaus. Erklären Sie die wichtigsten Abläufe, Besuchszeiten und wie sie Hilfe rufen können. Seien Sie dabei geduldig und verständlich.',
        'Zeigen Sie Empathie und Verständnis. Gehen Sie auf Sorgen ein, beruhigen Sie und versichern Sie Ihre Unterstützung. Ein offenes Ohr ist oft das Wichtigste.'
      ],
      'handover': [
        'Beginnen Sie mit der eindeutigen Patientenidentifikation. Nennen Sie den vollständigen Namen, das Alter und die Zimmernummer. Das verhindert Verwechslungen.',
        'Verwenden Sie die bewährte SBAR-Methode: Situation (was ist los?), Background (Vorgeschichte), Assessment (Bewertung), Recommendation (Empfehlung). So strukturieren Sie die Übergabe professionell.',
        'Alle Medikamente müssen präzise kommuniziert werden. Nennen Sie Name, Dosierung und Zeitpunkt der letzten Gabe. Das ist für die Patientensicherheit essentiell.',
        'Besondere Ereignisse können für die nächste Schicht wichtig sein. Berichten Sie über Auffälligkeiten, Patientenreaktionen oder besondere Vorkommnisse.',
        'Fragen Sie aktiv nach, ob alles verstanden wurde. Eine gute Übergabe ist ein Dialog, kein Monolog. Klären Sie Unklarheiten sofort.'
      ],
      'medication': [
        'Die Patientenidentifikation ist der erste Schritt jeder Medikamentengabe. Prüfen Sie Name und Geburtsdatum - nie nur den Namen allein. Das verhindert gefährliche Verwechslungen.',
        'Erklären Sie dem Patienten, was er bekommt und warum. Patienten haben das Recht zu wissen, welche Medikamente sie erhalten. Das schafft Vertrauen und Sicherheit.',
        'Allergien können lebensbedrohlich sein. Fragen Sie immer nach bekannten Unverträglichkeiten, bevor Sie ein Medikament geben. Dokumentieren Sie die Antwort.',
        'Informieren Sie über Wirkung und mögliche Nebenwirkungen. Der Patient soll wissen, was er erwarten kann und worauf er achten muss.',
        'Überwachen Sie die Einnahme und dokumentieren Sie diese korrekt. Die Dokumentation ist rechtlich wichtig und für die weitere Behandlung essentiell.'
      ],
      'dementia-care': [
        'Patienten mit Demenz brauchen besondere Aufmerksamkeit. Nähern Sie sich langsam, sprechen Sie ruhig und verwenden Sie den Namen. Schaffen Sie eine vertrauensvolle Atmosphäre.',
        'Ihre Sprache muss einfach und klar sein. Vermeiden Sie komplizierte Sätze, sprechen Sie langsam und deutlich. Wiederholen Sie wichtige Informationen geduldig.',
        'Geduld und Empathie sind hier besonders wichtig. Werden Sie nicht ungeduldig bei Wiederholungen oder Verwirrung. Zeigen Sie Verständnis für die Situation des Patienten.',
        'Sorgen Sie für eine sichere, beruhigende Umgebung. Entfernen Sie Gefahrenquellen, sorgen Sie für gute Beleuchtung und eine ruhige Atmosphäre.',
        'Respektieren Sie die Würde des Patienten. Auch Menschen mit Demenz haben Gefühle und Bedürfnisse. Behandeln Sie sie mit derselben Wertschätzung wie jeden anderen Patienten.'
      ]
    };
    
    return guidanceMap[scenarioId]?.[checkpointIndex] || 'Konzentrieren Sie sich auf eine empathische und professionelle Kommunikation. Denken Sie daran, was in dieser Situation am wichtigsten für den Patienten ist.';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            Lernhilfe - Erster Versuch
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
            <h4 className="font-medium text-amber-800 mb-2">Strategischer Hinweis:</h4>
            <p className="text-sm text-amber-700 leading-relaxed">
              {getGuidanceText(scenarioId, checkpointIndex)}
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-xs text-green-700">
              💡 <strong>Tipp:</strong> Nach Ihrem nächsten Versuch erhalten Sie konkrete Formulierungsvorschläge, falls Sie das Lernziel noch nicht erreichen.
            </p>
          </div>
          <Button onClick={onClose} className="w-full">
            Verstanden, ich versuche es erneut
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuidanceModal;
