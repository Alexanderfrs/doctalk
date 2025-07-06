
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
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
  
  const getBestPracticesContent = () => {
    const scenarioKey = scenarioId || 'default';
    return {
      title: t(`bestPractices.${scenarioKey}.title`) || t('bestPractices.default.title'),
      description: t(`bestPractices.${scenarioKey}.description`) || t('bestPractices.default.description'),
      practices: [
        t(`bestPractices.${scenarioKey}.practice1`) || t('bestPractices.default.practice1'),
        t(`bestPractices.${scenarioKey}.practice2`) || t('bestPractices.default.practice2'),
        t(`bestPractices.${scenarioKey}.practice3`) || t('bestPractices.default.practice3'),
        t(`bestPractices.${scenarioKey}.practice4`) || t('bestPractices.default.practice4'),
        t(`bestPractices.${scenarioKey}.practice5`) || t('bestPractices.default.practice5')
      ]
    };
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
            {t('toExercise')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BestPracticesDialog;
