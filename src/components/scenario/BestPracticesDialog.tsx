
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
                title: "Best Practices for Shift Handover",
                description: "Key principles for safe and effective patient handover",
                practices: [
                  "Use the SBAR method (Situation, Background, Assessment, Recommendation)",
                  "Communicate all critical information in a structured way",
                  "Ask clarifying questions and ensure understanding",
                  "Highlight medication changes and special considerations",
                  "Complete documentation promptly"
                ]
              };
          case 'admission':
              return {
                title: "Best Practices for Patient Admission",
                description: "Foundations for a professional patient intake",
                practices: [
                  "Warm and professional greeting",
                  "Conduct a complete medical history",
                  "Respect data privacy and obtain informed consent",
                  "Provide orientation on procedures and contacts",
                  "Ask about individual needs and fears"
                ]
              };
          case 'medication':
              return {
                title: "Best Practices for Medication Administration",
                description: "Safety standards for administering medication",
                practices: [
                  "Follow the 5 Rights (Right patient, Right drug, etc.)",
                  "Double-check patient identification",
                  "Explain effects and possible side effects",
                  "Monitor intake and document properly",
                  "Ask about allergies and intolerances"
                ]
              };
          default:
              return {
                title: "General Best Practices",
                description: "Core principles of professional patient communication",
                practices: [
                  "Communicate respectfully and empathetically",
                  "Practice active listening",
                  "Use clear and simple language",
                  "Show cultural sensitivity",
                  "Respect patient autonomy"
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
