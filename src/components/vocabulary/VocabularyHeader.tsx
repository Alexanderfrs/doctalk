
import React from "react";
import { Button } from "@/components/ui/button";
import { List, Mic, Award, BookOpen } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface VocabularyHeaderProps {
  className?: string;
}

const VocabularyHeader: React.FC<VocabularyHeaderProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold mb-1 text-neutral-800">
            <span className="text-gradient">MedLingua</span> Vokabeln
          </h1>
          <div className="hidden md:flex bg-medical-50 text-medical-700 text-xs font-semibold px-2 py-1 rounded-full items-center">
            <Award className="h-3 w-3 mr-1" />
            Fachspezifisch
          </div>
        </div>
        <p className="text-neutral-600">
          Medizinisches Fachvokabular für deinen Erfolg im Gesundheitswesen
        </p>
        <div className="flex gap-2 mt-2">
          <span className="inline-flex items-center bg-medical-50 px-2 py-1 rounded-full text-xs font-medium text-medical-700">
            <BookOpen className="h-3 w-3 mr-1" />
            Pflegedeutsch
          </span>
          <span className="inline-flex items-center bg-medical-50 px-2 py-1 rounded-full text-xs font-medium text-medical-700">
            <BookOpen className="h-3 w-3 mr-1" />
            Medizinische Diagnostik
          </span>
        </div>
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
