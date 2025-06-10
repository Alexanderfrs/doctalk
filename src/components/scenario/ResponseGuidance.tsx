
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, ArrowRight } from "lucide-react";

interface ResponseGuidanceProps {
  suggestion?: string;
  scenarioType: string;
  onQuickReply?: (text: string) => void;
}

const ResponseGuidance: React.FC<ResponseGuidanceProps> = ({
  suggestion,
  scenarioType,
  onQuickReply
}) => {
  const getContextualQuickReplies = (type: string, suggestionText?: string): string[] => {
    // Dynamic replies based on the current suggestion context
    if (suggestionText?.includes('Schmerz') || suggestionText?.includes('pain')) {
      return [
        "Können Sie mir zeigen, wo es weh tut?",
        "Wie stark sind die Schmerzen von 1 bis 10?",
        "Seit wann haben Sie diese Schmerzen?"
      ];
    }
    
    if (suggestionText?.includes('Beruhig') || suggestionText?.includes('calm')) {
      return [
        "Alles wird gut, ich bin hier um zu helfen.",
        "Bleiben Sie ruhig, wir kümmern uns um Sie.",
        "Atmen Sie tief ein und aus."
      ];
    }
    
    if (suggestionText?.includes('Begrüß') || suggestionText?.includes('greet')) {
      return [
        "Guten Tag, ich bin Ihre Pflegekraft.",
        "Hallo, wie geht es Ihnen heute?",
        "Schön Sie kennenzulernen."
      ];
    }

    // Default replies by scenario type
    const defaultReplies = {
      'patient-care': [
        "Wie fühlen Sie sich heute?",
        "Können Sie mir Ihre Beschwerden beschreiben?",
        "Haben Sie noch Fragen?"
      ],
      'emergency': [
        "Wo tut es weh?",
        "Können Sie mich hören?",
        "Bleiben Sie ruhig, ich helfe Ihnen."
      ],
      'handover': [
        "Wie ist der aktuelle Status?",
        "Welche Medikamente wurden gegeben?",
        "Gibt es Besonderheiten zu beachten?"
      ],
      'elderly-care': [
        "Brauchen Sie Hilfe?",
        "Wie geht es Ihnen denn?",
        "Möchten Sie sich hinsetzen?"
      ],
      'disability-care': [
        "Verstehen Sie das?",
        "Brauchen Sie Hilfe dabei?",
        "Soll ich das nochmal erklären?"
      ]
    };
    
    return defaultReplies[type] || defaultReplies['patient-care'];
  };

  const quickReplies = getContextualQuickReplies(scenarioType, suggestion);

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-3">
        <div className="flex items-start gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="text-sm font-medium text-blue-800 mb-1">Next Step</h5>
            <p className="text-xs text-blue-700">
              {suggestion || "Continue the conversation naturally"}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs text-blue-600 font-medium">Quick replies:</p>
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
