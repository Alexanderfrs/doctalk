
import React from "react";
import { Button } from "@/components/ui/button";
import { List, Mic } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface VocabularyHeaderProps {
  className?: string;
}

const VocabularyHeader: React.FC<VocabularyHeaderProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-neutral-800">Vokabeln</h1>
        <p className="text-neutral-600">
          Lerne und übe medizinisches Fachvokabular für deinen Berufsalltag
        </p>
      </div>
      
      <div className="flex gap-3">
        <Button asChild variant="outline" className="flex items-center">
          <a href="/practice">
            <List className="h-4 w-4 mr-2" />
            Übungen
          </a>
        </Button>
        
        <Button className="flex items-center bg-medical-500 hover:bg-medical-600">
          <Mic className="h-4 w-4 mr-2" />
          Aussprache üben
        </Button>
      </div>
    </div>
  );
};

export default VocabularyHeader;
