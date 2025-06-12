
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Play } from "lucide-react";

interface PracticeSetupDialogProps {
  availableCategories: string[];
  onStartPractice: (config: PracticeConfig) => void;
  totalWords: number;
}

export interface PracticeConfig {
  numberOfCards: number;
  category: string;
}

const PracticeSetupDialog: React.FC<PracticeSetupDialogProps> = ({
  availableCategories,
  onStartPractice,
  totalWords
}) => {
  const [numberOfCards, setNumberOfCards] = useState<number>(10);
  const [category, setCategory] = useState<string>("all");
  const [open, setOpen] = useState(false);

  const handleStartPractice = () => {
    onStartPractice({ numberOfCards, category });
    setOpen(false);
  };

  const cardOptions = [
    { value: 5, label: "5 Karten" },
    { value: 10, label: "10 Karten" },
    { value: 15, label: "15 Karten" },
    { value: 20, label: "20 Karten" },
    { value: -1, label: `Alle verfügbaren (${totalWords})` }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-medical-500 hover:bg-medical-600 touch-target">
          <Play className="h-4 w-4 mr-2" />
          Training starten
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Vokabeltraining konfigurieren</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">
              Anzahl der Vokabeln
            </Label>
            <RadioGroup 
              value={numberOfCards.toString()} 
              onValueChange={(value) => setNumberOfCards(parseInt(value))}
              className="space-y-2"
            >
              {cardOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={`cards-${option.value}`} />
                  <Label htmlFor={`cards-${option.value}`} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="category-select" className="text-base font-medium mb-3 block">
              Kategorie
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategorie wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Kategorien</SelectItem>
                {availableCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleStartPractice} className="w-full bg-medical-500 hover:bg-medical-600">
            Training starten
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PracticeSetupDialog;
