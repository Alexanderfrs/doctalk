import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ThumbsUp, Meh, ThumbsDown, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ConfidenceRatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
}

const ConfidenceRatingDialog: React.FC<ConfidenceRatingDialogProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { translate } = useLanguage();

  const confidenceOptions = [
    { 
      value: 5, 
      label: translate("veryConfident"), 
      icon: Star, 
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200"
    },
    { 
      value: 4, 
      label: translate("confident"), 
      icon: ThumbsUp, 
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200"
    },
    { 
      value: 3, 
      label: translate("neutral"), 
      icon: Meh, 
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200"
    },
    { 
      value: 2, 
      label: translate("lessConfident"), 
      icon: ThumbsDown, 
      color: "text-orange-600",
      bgColor: "bg-orange-50 border-orange-200"
    },
    { 
      value: 1, 
      label: translate("notConfident"), 
      icon: X, 
      color: "text-red-600",
      bgColor: "bg-red-50 border-red-200"
    }
  ];

  const handleSubmit = () => {
    if (selectedRating !== null) {
      onSubmit(selectedRating);
      setIsSubmitted(true);
      
      // Close dialog after showing confirmation
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedRating(null);
        onClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setSelectedRating(null);
    onClose();
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <ThumbsUp className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-medical-800 mb-2">
              {translate("thankYouForRating")}
            </h3>
            <p className="text-medical-600">
              {translate("confidenceRatingSubmitted")}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-medical-800">
            {translate("yourConfidenceRating")}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-medical-600 text-center">
            {translate("howConfidentAreYou")}
          </p>
          
          <div className="grid gap-3">
            {confidenceOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = selectedRating === option.value;
              
              return (
                <Card
                  key={option.value}
                  className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected 
                      ? `${option.bgColor} ring-2 ring-medical-400` 
                      : 'bg-white border-neutral-200 hover:bg-neutral-50'
                  }`}
                  onClick={() => setSelectedRating(option.value)}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent 
                      className={`h-6 w-6 ${
                        isSelected ? option.color : 'text-neutral-500'
                      }`} 
                    />
                    <span className={`font-medium ${
                      isSelected ? 'text-medical-800' : 'text-neutral-700'
                    }`}>
                      {option.label}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              {translate("cancel")}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={selectedRating === null}
              className="flex-1 bg-medical-600 hover:bg-medical-700 text-white"
            >
              {translate("submitRating")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfidenceRatingDialog;