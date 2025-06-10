
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
  const getQuickReplies = (type: string): string[] => {
    const replies = {
      'patient-care': [
        "Wie fühlen Sie sich heute?",
        "Können Sie mir Ihre Schmerzen beschreiben?",
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
    
    return replies[type] || replies['patient-care'];
  };

  const quickReplies = getQuickReplies(scenarioType);

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-3">
        <div className="flex items-start gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="text-sm font-medium text-blue-800 mb-1">Suggestion</h5>
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
