
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, ArrowRight } from "lucide-react";

interface ResponseGuidanceProps {
  suggestion?: string;
  scenarioType: string;
  conversationHistory: any[];
  onQuickReply?: (text: string) => void;
}

const ResponseGuidance: React.FC<ResponseGuidanceProps> = ({
  suggestion,
  scenarioType,
  conversationHistory = [],
  onQuickReply
}) => {
  const getContextualQuickReplies = (type: string, history: any[]): string[] => {
    const turnCount = history.length;
    const lastMessages = history.slice(-2);
    const lastPatientMessage = lastMessages.find(msg => msg.speaker === 'patient' || msg.speaker === 'doctor')?.text || '';
    
    // Context-aware suggestions based on conversation flow and content
    if (turnCount === 0) {
      // Opening suggestions by scenario
      const openingReplies = {
        'patient-care': [
          "Guten Tag, ich bin Ihre Pflegekraft.",
          "Hallo, wie kann ich Ihnen heute helfen?",
          "Mein Name ist... Wie geht es Ihnen?"
        ],
        'emergency': [
          "Können Sie mich hören?",
          "Bleiben Sie ruhig, ich helfe Ihnen.",
          "Was ist passiert?"
        ],
        'handover': [
          "Guten Tag, hier ist die Übergabe für...",
          "Wie ist der aktuelle Status?",
          "Welche Besonderheiten gibt es heute?"
        ],
        'elderly-care': [
          "Guten Morgen, wie haben Sie geschlafen?",
          "Hallo, ich bin da um Ihnen zu helfen.",
          "Wie fühlen Sie sich heute?"
        ],
        'disability-care': [
          "Hallo, ich möchte Ihnen gerne helfen.",
          "Verstehen Sie was ich sage?",
          "Können wir zusammen sprechen?"
        ]
      };
      return openingReplies[type] || openingReplies['patient-care'];
    }

    // Content-based suggestions
    if (lastPatientMessage.includes('Schmerz') || lastPatientMessage.includes('weh') || lastPatientMessage.includes('hurt')) {
      return [
        "Wo genau tut es weh?",
        "Wie stark sind die Schmerzen von 1 bis 10?",
        "Seit wann haben Sie diese Schmerzen?"
      ];
    }
    
    if (lastPatientMessage.includes('Angst') || lastPatientMessage.includes('Sorge') || lastPatientMessage.includes('afraid')) {
      return [
        "Ich verstehe Ihre Sorgen.",
        "Was bereitet Ihnen Angst?",
        "Möchten Sie darüber sprechen?"
      ];
    }
    
    if (lastPatientMessage.includes('Medikament') || lastPatientMessage.includes('Tablette') || lastPatientMessage.includes('medication')) {
      return [
        "Welche Medikamente nehmen Sie?",
        "Haben Sie Nebenwirkungen bemerkt?",
        "Wann nehmen Sie Ihre Medikamente?"
      ];
    }

    if (lastPatientMessage.includes('müde') || lastPatientMessage.includes('schlafen') || lastPatientMessage.includes('tired')) {
      return [
        "Wie haben Sie letzte Nacht geschlafen?",
        "Fühlen Sie sich oft müde?",
        "Möchten Sie sich ausruhen?"
      ];
    }

    // Phase-based suggestions
    if (turnCount <= 4) {
      // Early conversation
      const earlyReplies = {
        'patient-care': [
          "Erzählen Sie mir von Ihren Beschwerden.",
          "Wie lange haben Sie diese Probleme schon?",
          "Haben Sie heute Schmerzen?"
        ],
        'emergency': [
          "Wo tut es am meisten weh?",
          "Haben Sie Allergien?",
          "Können Sie sich bewegen?"
        ],
        'handover': [
          "Welche Medikamente wurden gegeben?",
          "Gab es besondere Ereignisse?",
          "Wie war die Nacht?"
        ],
        'elderly-care': [
          "Brauchen Sie Hilfe beim Aufstehen?",
          "Haben Sie gut gegessen?",
          "Möchten Sie spazieren gehen?"
        ],
        'disability-care': [
          "Können Sie mir das zeigen?",
          "Brauchen Sie Hilfe dabei?",
          "Verstehen Sie was ich meine?"
        ]
      };
      return earlyReplies[type] || earlyReplies['patient-care'];
    } else if (turnCount <= 8) {
      // Middle conversation
      const middleReplies = {
        'patient-care': [
          "Wie ist Ihr Appetit?",
          "Schlafen Sie gut?",
          "Brauchen Sie noch etwas?"
        ],
        'emergency': [
          "Ich rufe den Arzt.",
          "Bleiben Sie bei mir.",
          "Wir bringen Sie ins Krankenhaus."
        ],
        'handover': [
          "Sind alle Aufgaben erledigt?",
          "Gibt es noch offene Punkte?",
          "Welche Prioritäten hat die nächste Schicht?"
        ],
        'elderly-care': [
          "Möchten Sie Ihre Familie anrufen?",
          "Soll ich das Radio anmachen?",
          "Haben Sie Schmerzen?"
        ],
        'disability-care': [
          "Das machen Sie sehr gut!",
          "Soll ich Ihnen helfen?",
          "Möchten Sie eine Pause machen?"
        ]
      };
      return middleReplies[type] || middleReplies['patient-care'];
    } else {
      // Closing conversation
      const closingReplies = {
        'patient-care': [
          "Haben Sie noch Fragen?",
          "Rufen Sie mich wenn Sie Hilfe brauchen.",
          "Ich komme später wieder vorbei."
        ],
        'emergency': [
          "Der Arzt ist unterwegs.",
          "Sie sind jetzt in Sicherheit.",
          "Wir kümmern uns um alles Weitere."
        ],
        'handover': [
          "Vielen Dank für die Übergabe.",
          "Ich habe alles notiert.",
          "Schönen Feierabend!"
        ],
        'elderly-care': [
          "Ich wünsche Ihnen einen schönen Tag.",
          "Bis später!",
          "Rufen Sie wenn Sie mich brauchen."
        ],
        'disability-care': [
          "Das haben Sie toll gemacht!",
          "Bis zum nächsten Mal!",
          "Sie können stolz auf sich sein."
        ]
      };
      return closingReplies[type] || closingReplies['patient-care'];
    }
  };

  const quickReplies = getContextualQuickReplies(scenarioType, conversationHistory);

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-3">
        <div className="flex items-start gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="text-sm font-medium text-blue-800 mb-1">Suggested Response</h5>
            <p className="text-xs text-blue-700">
              {suggestion || "Choose a response or type your own"}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-7 px-2 border-blue-300 text-blue-700 hover:bg-blue-100"
                onClick={() => onQuickReply?.(reply)}
              >
                {reply}
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseGuidance;
